// 하단 3x3 드로잉 그리드 및 상단 실시간 미러링 궤적 렌더링
// 모델(PatternPath, 드래그 상태, 전투 홀딩 상태)은 읽기 전용으로만 참조한다.
(function (POF) {
  'use strict';

  var PATH_COLOR = '#7FE7FF';
  var HOLD_COLOR = '#FFE600';
  var HOLD_WARN_COLOR = '#FF2A2A';
  var HOLD_RADIUS = 34;

  function GridRenderer(inputGrid, mirrorGrid, path, drag, combat) {
    this.inputGrid = inputGrid;
    this.mirrorGrid = mirrorGrid;
    this.path = path;
    this.drag = drag; // { active, x, y }
    this.combat = combat;
  }

  GridRenderer.prototype._strokePath = function (ctx, grid, lineWidth) {
    var path = this.path;
    if (path.length < 2) return;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(grid.x[path.nodes[0]], grid.y[path.nodes[0]]);
    for (var i = 1; i < path.length; i++) {
      ctx.lineTo(grid.x[path.nodes[i]], grid.y[path.nodes[i]]);
    }
    ctx.stroke();
  };

  GridRenderer.prototype.render = function (ctx) {
    var g = this.inputGrid;
    var path = this.path;
    var drag = this.drag;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = PATH_COLOR;
    ctx.shadowColor = PATH_COLOR;
    ctx.shadowBlur = 12;

    // 하단 궤적
    this._strokePath(ctx, g, 8);

    // 마지막 노드 -> 현재 손가락 위치 (고무줄 선, 판정 완료 후 홀딩 중에는 표시 안 함)
    if (drag.active && path.length > 0 && !path.closed && !this.combat.isHolding()) {
      var last = path.lastNode();
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(g.x[last], g.y[last]);
      ctx.lineTo(drag.x, drag.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // 상단 미러링 궤적
    ctx.globalAlpha = 0.9;
    this._strokePath(ctx, this.mirrorGrid, 6);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // 하단 노드
    for (var n = 1; n <= 9; n++) {
      var visited = path.isVisited(n);
      ctx.fillStyle = visited ? PATH_COLOR : 'rgba(255,255,255,0.25)';
      ctx.beginPath();
      ctx.arc(g.x[n], g.y[n], visited ? 18 : 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(g.x[n], g.y[n], 26, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 홀딩 연타 차징 게이지 (패턴 변경 시 붉은 경고)
    if (this.combat.isHolding() && path.length > 0) {
      var hn = path.lastNode();
      var start = -Math.PI / 2;
      var color = this.combat.holdWarning() ? HOLD_WARN_COLOR : HOLD_COLOR;
      ctx.lineWidth = 6;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(g.x[hn], g.y[hn], HOLD_RADIUS, start, start + Math.PI * 2 * this.combat.holdRatio());
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  };

  POF.GridRenderer = GridRenderer;
})(window.POF = window.POF || {});
