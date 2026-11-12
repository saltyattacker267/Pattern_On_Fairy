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
  // 상단 미러 그리드 레이아웃은 FieldRenderer가 몬스터 위치에 맞춰 매 프레임 갱신한다
  var mirrorGrid = new POF.PatternGrid(V.width / 2, (V.fieldTop + V.fieldBottom) / 2, V.gridSpacing, 0);
  var path = new POF.PatternPath(B.pattern.closeMinNodes);
  var combat = new POF.StageCombat(B, POF.Monsters.stages, POF.Patterns.bosses, bus);
  var drag = { active: false, x: 0, y: 0 };
  var strokeLocked = false; // 정타/Miss 판정 후 릴리즈 전까지 추가 드로잉 차단

  // 뷰 (이벤트 구독을 위해 전투 시작 전에 생성)
  var fieldRenderer = new POF.FieldRenderer(V, combat, mirrorGrid, bus, B.stage.moveSec);
  var gridRenderer = new POF.GridRenderer(inputGrid, mirrorGrid, path, drag, combat);

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

  // 드래그 구간 동안 지나간 노드를 궤적에 반영하고, 궤적이 바뀔 때마다 즉시 판정한다
  function feedSegment(x0, y0, x1, y1) {
    if (strokeLocked) return;
    var count = inputGrid.collectSegmentHits(x0, y0, x1, y1);
    for (var i = 0; i < count; i++) {
      if (!path.tryAdd(inputGrid.hitNodes[i])) continue;
      var result = combat.judgeStroke(path.nodes, path.length);
      if (result === POF.StageCombat.STROKE_PROGRESS) continue;
      strokeLocked = true;
      // 정타는 홀딩 중 궤적을 유지해 보여주고, 그 외에는 즉시 지운다
      if (result !== POF.StageCombat.STROKE_HIT) path.reset();
      return;
    }
  }

  // 홀딩 중 손가락이 마지막 노드 판정 반경을 벗어나면 홀딩 취소 (페널티 없음)
  function checkHoldLeave(x, y) {
    if (!combat.isHolding()) return;
    var last = path.lastNode();
    var dx = x - inputGrid.x[last];
    var dy = y - inputGrid.y[last];
    var r = inputGrid.hitRadius;
    if (dx * dx + dy * dy > r * r) combat.cancelHold();
  }

  function endDrag() {
    drag.active = false;
    strokeLocked = false;
    combat.cancelHold();
    path.reset();
  }

  var input = new POF.PointerInput(canvas, {
    onDown: function (x, y) {
      if (y < botTop) return false; // 컨트롤 존에서만 드로잉 시작
      path.reset();
      strokeLocked = false;
      combat.cancelHold();
      drag.active = true;
      drag.x = x;
      drag.y = y;
      feedSegment(x, y, x, y);
      return true;
    },
    onMove: function (x, y) {
      if (!drag.active) return;
      feedSegment(drag.x, drag.y, x, y);
      checkHoldLeave(x, y);
      drag.x = x;
      drag.y = y;
    },
    onUp: function (x, y) {
      if (!drag.active) return;
      feedSegment(drag.x, drag.y, x, y);
      // 판정 전 릴리즈 = 중도 포기 (노드를 하나라도 거쳤으면 Miss)
      if (!strokeLocked) combat.releaseStroke(path.length);
      endDrag();
    },
    onCancel: function () {
      // 시스템 취소(pointercancel 등)는 유저 릴리즈가 아니므로 판정하지 않는다
      endDrag();
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
  var stages = POF.Monsters.stages;
  for (var i = 0; i < stages.length; i++) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = stages[i].stage;
    btn.setAttribute('data-stage', String(i));
    btn.addEventListener('click', function (e) {
      if (drag.active) return;
      combat.startStage(parseInt(e.currentTarget.getAttribute('data-stage'), 10));
    });
    debugBar.appendChild(btn);
  }

  // 디버그: 현재 스테이지 보스 웨이브로 건너뛰기
  var bossBtn = document.createElement('button');
  bossBtn.type = 'button';
  bossBtn.textContent = 'BOSS';
  bossBtn.addEventListener('click', function () {
    if (drag.active) return;
    combat.debugSkipToBoss();
  });
  debugBar.appendChild(bossBtn);

  resize();
  combat.startStage(0);
  loop.start();
})(window.POF = window.POF || {});
