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

  var PROGRESS = 0;  // 아직 목표 궤적의 유효한 앞부분
  var COMPLETE = 1;  // 마지막 노드 도달 (정타)
  var DEVIATE = 2;   // 정방향/역방향 어느 쪽과도 어긋남 (오입력)

  // 드로잉 진행 중 판정 (On-Reach / 즉시 Miss용)
  // 입력이 목표 궤적(열린 패턴: 정/역방향, 닫힌 패턴: 모든 시작점 x 양방향)의 앞부분과 일치하는지 검사한다.
  function progress(input, inLen, target) {
    var tLen = target.length;
    if (inLen === 0) return PROGRESS;
    if (inLen > tLen) return DEVIATE;

    var k;
    if (!isClosed(target, tLen)) {
      var fwd = true;
      var rev = true;
      for (k = 0; k < inLen; k++) {
        if (fwd && input[k] !== target[k]) fwd = false;
        if (rev && input[k] !== target[tLen - 1 - k]) rev = false;
        if (!fwd && !rev) return DEVIATE;
      }
      return inLen === tLen ? COMPLETE : PROGRESS;
    }

    // 닫힌 패턴: 고유 노드 n개 순환 고리. k = n 위치는 시작 노드 복귀가 된다.
    var n = tLen - 1;
    for (var off = 0; off < n; off++) {
      var okF = true;
      var okR = true;
      for (k = 0; k < inLen; k++) {
        if (okF && input[k] !== target[(off + k) % n]) okF = false;
        if (okR && input[k] !== target[((off - k) % n + n) % n]) okR = false;
        if (!okF && !okR) break;
      }
      if (okF || okR) return inLen === tLen ? COMPLETE : PROGRESS;
    }
    return DEVIATE;
  }

  POF.PatternMatcher = {
    PROGRESS: PROGRESS,
    COMPLETE: COMPLETE,
    DEVIATE: DEVIATE,
    isClosed: isClosed,
    matches: matches,
    progress: progress
  };
})(window.POF = window.POF || {});
