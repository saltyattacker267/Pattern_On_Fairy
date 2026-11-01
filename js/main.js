// 초기화 및 모듈 연결
(function (POF) {
  'use strict';

  var B = POF.Balance;
  var V = B.view;

  var viewport = document.getElementById('viewport');
  var frame = document.getElementById('frame');
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  var debugBar = document.getElementById('debugBar');

  var topH = V.height * V.topRatio;
  var midH = V.height * V.midRatio;
  var botTop = topH + midH;
  var botCy = botTop + (V.height - botTop) / 2;

  // 모델
  var bus = new POF.EventBus();
  var inputGrid = new POF.PatternGrid(V.width / 2, botCy, V.gridSpacing, V.nodeHitRadius);
  var mirrorGrid = new POF.PatternGrid(V.width / 2, V.mirrorCenterY, V.mirrorSpacing, 0);
  var path = new POF.PatternPath(B.pattern.closeMinNodes);
  var combat = new POF.TestCombat(B, POF.Patterns.bosses, bus);
  var drag = { active: false, x: 0, y: 0 };

  // 뷰 (이벤트 구독을 위해 전투 시작 전에 생성)
  var fieldRenderer = new POF.FieldRenderer(V, combat, mirrorGrid, bus);
  var gridRenderer = new POF.GridRenderer(inputGrid, mirrorGrid, path, drag);

  var renderScale = 1;

  var loop = new POF.GameLoop(
    function update(scaledDt) {
      combat.update(scaledDt);
    },
    function render(realDt) {
      ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
      fieldRenderer.render(ctx, realDt);
      gridRenderer.render(ctx);
    },
    B.time.maxDeltaSec
  );

  // 드래그 구간 동안 지나간 노드를 궤적에 반영
  function feedSegment(x0, y0, x1, y1) {
    var count = inputGrid.collectSegmentHits(x0, y0, x1, y1);
    for (var i = 0; i < count; i++) {
      path.tryAdd(inputGrid.hitNodes[i]);
    }
  }

  function endDrag() {
    drag.active = false;
    loop.timeScale = B.time.normalScale;
  }

  var input = new POF.PointerInput(canvas, {
    onDown: function (x, y) {
      if (y < botTop) return false; // 컨트롤 존에서만 드로잉 시작
      path.reset();
      drag.active = true;
      drag.x = x;
      drag.y = y;
      feedSegment(x, y, x, y);
      loop.timeScale = B.time.dragSlowScale;
      return true;
    },
    onMove: function (x, y) {
      if (!drag.active) return;
      feedSegment(drag.x, drag.y, x, y);
      drag.x = x;
      drag.y = y;
    },
    onUp: function (x, y) {
      if (!drag.active) return;
      feedSegment(drag.x, drag.y, x, y);
      endDrag();
      // 최소 노드 수 미만은 판정하지 않고 무시
      if (path.distinctCount() >= B.pattern.minNodes) {
        combat.submit(path.nodes, path.length);
      }
      path.reset();
    },
    onCancel: function () {
      endDrag();
      path.reset();
    }
  }, B.input.ghostTouchGuardMs);

  // 9:16 레터박스 맞춤 (Safe Area 패딩은 CSS에서 처리)
  function resize() {
    var aw = viewport.clientWidth;
    var ah = viewport.clientHeight;
    var cssW = Math.min(aw, ah * V.width / V.height);
    var cssH = cssW * V.height / V.width;
    var dpr = window.devicePixelRatio || 1;

    frame.style.width = cssW + 'px';
    frame.style.height = cssH + 'px';
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    renderScale = canvas.width / V.width;

    var rect = canvas.getBoundingClientRect();
    input.setMapping(rect.left, rect.top, V.width / rect.width, V.height / rect.height);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', resize);

  // 디버그: 스테이지 선택 버튼 (데이터 기반 생성)
  var bosses = POF.Patterns.bosses;
  for (var i = 0; i < bosses.length; i++) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = bosses[i].stage;
    btn.setAttribute('data-stage', String(i));
    btn.addEventListener('click', function (e) {
      if (drag.active) return;
      combat.startStage(parseInt(e.currentTarget.getAttribute('data-stage'), 10));
    });
    debugBar.appendChild(btn);
  }

  resize();
  combat.startStage(0);
  loop.start();
})(window.POF = window.POF || {});
