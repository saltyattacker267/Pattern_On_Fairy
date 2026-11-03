// 자체 검증 스크립트 (CLAUDE.md 4. Self-Testing)
// 사용법: 프로젝트 루트에서 `node tests/run_tests.js`
// 1) js/ 하위 전체 JS 문법 검사 (node --check)
// 2) tests/pattern_test.html 로직 테스트를 브라우저 없이 Node에서 실행
// 하나라도 실패하면 종료 코드 1로 끝난다.
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
let failed = false;

// 1. 문법 검사
function collectJs(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectJs(full, out);
    else if (entry.name.endsWith('.js')) out.push(full);
  }
  return out;
}

const jsFiles = collectJs(path.join(ROOT, 'js'), []);
let syntaxFail = 0;
for (const file of jsFiles) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (e) {
    syntaxFail++;
    console.log('[SYNTAX FAIL] ' + path.relative(ROOT, file));
    console.log(String(e.stderr));
  }
}
console.log('[1/2] 문법 검사: ' + (jsFiles.length - syntaxFail) + '/' + jsFiles.length + ' 통과');
if (syntaxFail > 0) failed = true;

// 2. 로직 테스트 (pattern_test.html)
const testHtmlPath = path.join(ROOT, 'tests', 'pattern_test.html');
try {
  const html = fs.readFileSync(testHtmlPath, 'utf8');
  const ctx = { console: console };
  ctx.window = ctx;
  vm.createContext(ctx);

  // HTML에 선언된 순서대로 모듈 로드
  const srcRe = /<script src="\.\.\/(.+?)"><\/script>/g;
  let m;
  while ((m = srcRe.exec(html)) !== null) {
    const rel = m[1];
    vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
  }

  const inline = html.match(/<script id="testScript">([\s\S]*?)<\/script>/);
  if (!inline) throw new Error('testScript 블록을 찾을 수 없음');
  vm.runInContext(inline[1], ctx, { filename: 'pattern_test.html#testScript' });

  const r = ctx.POF.testResult;
  for (const line of r.lines) {
    if (!line.ok) console.log('[FAIL] ' + line.name);
  }
  console.log('[2/2] 로직 테스트: ' + r.summary);
  if (r.failed > 0) failed = true;
} catch (e) {
  console.log('[2/2] 로직 테스트 실행 오류: ' + e.message);
  failed = true;
}

console.log(failed ? 'RESULT: FAIL' : 'RESULT: ALL PASS');
process.exit(failed ? 1 : 0);
