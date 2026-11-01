// 패턴 일치 판정 (순수 함수, 할당 없음)
// - 열린 패턴: 정방향 또는 역방향이 정확히 일치해야 한다.
// - 닫힌 패턴(시작 = 끝): 입력도 닫혀 있어야 하며, 순환 고리상의 어느 노드에서 시작하든
//   정방향/역방향 모두 인정한다.
(function (POF) {
  'use strict';

  function isClosed(seq, len) {
    return len >= 4 && seq[0] === seq[len - 1];
  }

  // input: 입력 궤적 버퍼, inLen: 유효 길이, target: 목표 노드 배열
  function matches(input, inLen, target) {
    var tLen = target.length;
    if (inLen !== tLen) return false;

    var tClosed = isClosed(target, tLen);
    if (tClosed !== isClosed(input, inLen)) return false;

    var k;
    if (!tClosed) {
      var fwd = true;
      for (k = 0; k < tLen; k++) {
        if (input[k] !== target[k]) { fwd = false; break; }
      }
      if (fwd) return true;
      for (k = 0; k < tLen; k++) {
        if (input[k] !== target[tLen - 1 - k]) return false;
      }
      return true;
    }

    // 닫힌 패턴: 고유 노드 n개로 이루어진 순환 고리 비교
    var n = tLen - 1;
    for (var off = 0; off < n; off++) {
      var okF = true;
      var okR = true;
      for (k = 0; k < n; k++) {
        if (okF && input[k] !== target[(off + k) % n]) okF = false;
        if (okR && input[k] !== target[((off - k) % n + n) % n]) okR = false;
        if (!okF && !okR) break;
      }
      if (okF || okR) return true;
    }
    return false;
  }

  POF.PatternMatcher = {
    isClosed: isClosed,
    matches: matches
  };
})(window.POF = window.POF || {});
