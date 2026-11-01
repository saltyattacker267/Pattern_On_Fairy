// 3x3 노드 좌표 배치 및 히트 테스트
// 노드 번호:
//   1 2 3
//   4 5 6
//   7 8 9
// x/y 배열은 인덱스 1~9를 사용한다 (0번은 미사용).
(function (POF) {
  'use strict';

  function PatternGrid(cx, cy, spacing, hitRadius) {
    this.x = new Float32Array(10);
    this.y = new Float32Array(10);
    this.cx = 0;
    this.cy = 0;
    this.spacing = 0;
    this.hitRadius = hitRadius;
    // 세그먼트 히트 결과 버퍼 (프레임 내 할당 방지)
    this.hitNodes = new Int8Array(9);
    this._hitT = new Float32Array(9);
    this.setLayout(cx, cy, spacing);
  }

  PatternGrid.prototype.setLayout = function (cx, cy, spacing) {
    this.cx = cx;
    this.cy = cy;
    this.spacing = spacing;
    for (var n = 1; n <= 9; n++) {
      var col = (n - 1) % 3;
      var row = ((n - 1) / 3) | 0;
      this.x[n] = cx + (col - 1) * spacing;
      this.y[n] = cy + (row - 1) * spacing;
    }
  };

  // 선분 (x0,y0)-(x1,y1)이 지나간 노드를 진행 순서(t)대로 hitNodes에 기록하고 개수를 반환한다.
  // 빠른 드래그로 pointermove 사이에 노드를 건너뛰는 경우를 보정한다.
  PatternGrid.prototype.collectSegmentHits = function (x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    var len2 = dx * dx + dy * dy;
    var r2 = this.hitRadius * this.hitRadius;
    var count = 0;

    for (var n = 1; n <= 9; n++) {
      var t = 0;
      if (len2 > 0) {
        t = ((this.x[n] - x0) * dx + (this.y[n] - y0) * dy) / len2;
        if (t < 0) t = 0;
        else if (t > 1) t = 1;
      }
      var px = x0 + dx * t - this.x[n];
      var py = y0 + dy * t - this.y[n];
      if (px * px + py * py > r2) continue;

      // t 오름차순 삽입 정렬
      var j = count;
      while (j > 0 && this._hitT[j - 1] > t) {
        this._hitT[j] = this._hitT[j - 1];
        this.hitNodes[j] = this.hitNodes[j - 1];
        j--;
      }
      this._hitT[j] = t;
      this.hitNodes[j] = n;
      count++;
    }
    return count;
  };

  // 두 노드 사이 직선 위에 정확히 놓인 중간 노드 번호를 반환한다. 없으면 0.
  // 예: 1-3 -> 2, 1-9 -> 5, 4-8 -> 0 (외곽 대각 도약), 1-6 -> 0
  PatternGrid.middleOf = function (a, b) {
    if (a === b) return 0;
    var ca = (a - 1) % 3, ra = ((a - 1) / 3) | 0;
    var cb = (b - 1) % 3, rb = ((b - 1) / 3) | 0;
    if (((ca + cb) & 1) !== 0 || ((ra + rb) & 1) !== 0) return 0;
    var mc = (ca + cb) >> 1;
    var mr = (ra + rb) >> 1;
    var m = mr * 3 + mc + 1;
    if (m === a || m === b) return 0;
    return m;
  };

  POF.PatternGrid = PatternGrid;
})(window.POF = window.POF || {});
