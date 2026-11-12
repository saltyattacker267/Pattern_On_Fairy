// 상단 몬스터 필드 / 중단 플레이어 필드 렌더링 (에셋 없이 Canvas 벡터 드로잉)
// - 진행 헤더 (STAGE / TARGET / TYPE), 3x3 점선 가이드 앵커, 몬스터 궤적(등급 색상), 공격 링, 몬스터 HP 바
// - 필드 그리드 위치에 따라 미러 그리드(mirrorGrid) 레이아웃을 갱신하고, 위치 변경은 미끄러지듯 보간한다
// - 플레이어 HP, 경과 시간, 주인공 플레이스홀더, 피격/정타 플래시
// 텍스트는 이벤트 수신 시점에만 문자열을 생성해 캐싱한다 (프레임 내 문자열 결합 금지).
(function (POF) {
  'use strict';

  var E = POF.Events;
  var StageCombat = POF.StageCombat;

  var DASH = [4, 6];
  var NO_DASH = [];
  var HUE_STEPS = 36;
  var MAX_TIME_TEXT = 1000;
  var FORM_LETTERS = 'ABCDEFGHI';

  // 등급별 마력 속성 색상 (기획서 1.2)
  var GRADE_COLORS = {
    normal: '#FFE600',
    armored: '#FF7A00',
    assassin: '#FF7A00',
    assault: '#FF2A2A'
  };

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function FieldRenderer(view, combat, mirrorGrid, bus, moveSec) {
    this.view = view;
    this.combat = combat;
    this.grid = mirrorGrid;
    this.moveSec = moveSec;

    this.topH = view.height * view.topRatio;
    this.midH = view.height * view.midRatio;

    // 보스 무지개 펄스용 색상 사전 생성
    this._hues = new Array(HUE_STEPS);
    for (var i = 0; i < HUE_STEPS; i++) {
      this._hues[i] = 'hsl(' + (i * 10) + ', 100%, 60%)';
    }
    // 경과 시간 표시 문자열 사전 생성 (초 단위)
    this._timeTexts = new Array(MAX_TIME_TEXT);
    for (i = 0; i < MAX_TIME_TEXT; i++) {
      this._timeTexts[i] = 'TIME ' + i + 's';
    }
    this._time = 0;

    this.stageText = '';
    this.targetText = '';
    this.warningText = '';
    this.typeText = '';
    this.patternText = '';
    this.hpText = '';
    this.playerHpText = '';
    this.resultText = '';
    this.resultSubText = '';
    this.hpRatio = 1;
    this.playerHpRatio = 1;
    this.patternColor = GRADE_COLORS.normal;

    // 몬스터 위치 보간 (필드 그리드 칸 단위)
    this._dispCol = 0;
    this._dispRow = 0;
    this._fromCol = 0;
    this._fromRow = 0;
    this._toCol = 0;
    this._toRow = 0;
    this._moveT = 1;

    this.flashTimer = 0;
    this.flashDuration = 0.15;
    this.flashColor = '#FFFFFF';

    var self = this;
    bus.on(E.STAGE_STARTED, function (index) {
      var stage = combat.stages[index];
      self.stageText = 'STAGE ' + stage.stage + '  ' + stage.region;
      self.resultText = '';
      self.resultSubText = '';
    });
    bus.on(E.MONSTER_SPAWNED, function (waveIndex) {
      self.targetText = 'TARGET: [ ' + pad2(waveIndex + 1) + ' / ' + pad2(combat.waveCount) + ' ]';
      self.warningText = combat.isBoss() ? 'WARNING: BOSS' : '';
      self.patternColor = combat.isBoss() ? '' : GRADE_COLORS[combat.def.grade];
      // 등장 위치는 보간 없이 즉시 배치
      self._dispCol = self._fromCol = self._toCol = combat.posCol;
      self._dispRow = self._fromRow = self._toRow = combat.posRow;
      self._moveT = 1;
    });
    bus.on(E.MONSTER_PATTERN, function (index) {
      var pattern = combat.currentPattern();
      self.typeText = 'TYPE: [' + combat.grade.label + '] ' + combat.def.name + ' (' + pattern.length + ' NODES)';
      if (combat.isBoss()) {
        self.patternText = 'Phase ' + (index + 1) + ' · ' + combat.currentPatternName();
      } else {
        self.patternText = 'Form ' + FORM_LETTERS.charAt(index) + ' · ' + combat.currentPatternName();
      }
    });
    bus.on(E.MONSTER_HP, function (hp, maxHp) {
      self.hpText = hp.toFixed(1) + ' / ' + maxHp.toFixed(1);
      self.hpRatio = maxHp > 0 ? hp / maxHp : 0;
    });
    bus.on(E.PLAYER_HP, function (hp, maxHp) {
      self.playerHpText = 'HP ' + hp.toFixed(1) + ' / ' + maxHp.toFixed(1);
      self.playerHpRatio = maxHp > 0 ? hp / maxHp : 0;
    });
    bus.on(E.PATTERN_HIT, function () {
      self._flash('#FFFFFF', 0.12);
    });
    bus.on(E.PATTERN_MISS, function () {
      self._flash('#FF2A2A', 0.25);
    });
    bus.on(E.MONSTER_ATTACK, function () {
      self._flash('#FF2A2A', 0.3);
    });
    bus.on(E.STAGE_CLEARED, function (index, clearTimeSec) {
      self.resultText = 'CLEAR!';
      self.resultSubText = 'TIME ' + clearTimeSec.toFixed(1) + 's';
    });
    bus.on(E.PLAYER_DEAD, function () {
      self.resultText = 'GAME OVER';
      self.resultSubText = '';
    });
  }

  FieldRenderer.prototype._flash = function (color, duration) {
    this.flashColor = color;
    this.flashDuration = duration;
    this.flashTimer = duration;
  };

  // 보스 위치 변경 감지 및 미끄러짐 보간
  FieldRenderer.prototype._updateMove = function (realDt) {
    var combat = this.combat;
    if (combat.posCol !== this._toCol || combat.posRow !== this._toRow) {
      this._fromCol = this._dispCol;
      this._fromRow = this._dispRow;
      this._toCol = combat.posCol;
      this._toRow = combat.posRow;
      this._moveT = 0;
    }
    if (this._moveT < 1) {
      this._moveT += this.moveSec > 0 ? realDt / this.moveSec : 1;
      if (this._moveT > 1) this._moveT = 1;
      var t = this._moveT;
      var e = t * (2 - t); // ease-out
      this._dispCol = this._fromCol + (this._toCol - this._fromCol) * e;
      this._dispRow = this._fromRow + (this._toRow - this._fromRow) * e;
    }
  };

  // 필드 그리드 칸 크기 및 몬스터 3x3 프레임 위치로 미러 그리드 레이아웃 갱신. 칸 크기 반환.
  FieldRenderer.prototype._layoutMirror = function () {
    var v = this.view;
    var g = this.combat.stage.grid;
    var fieldH = v.fieldBottom - v.fieldTop;
    var cell = Math.min(v.width / g.cols, fieldH / g.rows);
    var offX = (v.width - cell * g.cols) / 2;
    var offY = v.fieldTop + (fieldH - cell * g.rows) / 2;
    this.grid.setLayout(offX + (this._dispCol + 1.5) * cell, offY + (this._dispRow + 1.5) * cell, cell);
    return cell;
  };

  FieldRenderer.prototype.render = function (ctx, realDt) {
    this._time += realDt;
    if (this.flashTimer > 0) {
      this.flashTimer -= realDt;
      if (this.flashTimer < 0) this.flashTimer = 0;
    }

    var w = this.view.width;
    var h = this.view.height;
    var grid = this.grid;
    var combat = this.combat;
    if (!combat.stage) return;

    this._updateMove(realDt);
    var cell = this._layoutMirror();

    // 배경
    ctx.fillStyle = '#0B0B1A';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#10102A';
    ctx.fillRect(0, this.topH, w, this.midH);

    // 구역 구분선
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.topH);
    ctx.lineTo(w, this.topH);
    ctx.moveTo(0, this.topH + this.midH);
    ctx.lineTo(w, this.topH + this.midH);
    ctx.stroke();

    var battle = combat.state === StageCombat.STATE_BATTLE;

    if (battle) {
      // 3x3 점선 가이드 앵커
      ctx.setLineDash(DASH);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 2;
      for (var n = 1; n <= 9; n++) {
        ctx.beginPath();
        ctx.arc(grid.x[n], grid.y[n], cell * 0.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash(NO_DASH);

      // 몬스터 궤적 (보스는 무지개 HSL 순환, 그 외 등급 색상)
      var pattern = combat.currentPattern();
      var color = this.patternColor;
      if (combat.isBoss()) color = this._hues[((this._time * 12) | 0) % HUE_STEPS];
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.lineWidth = cell * 0.14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(grid.x[pattern[0]], grid.y[pattern[0]]);
      for (var i = 1; i < pattern.length; i++) {
        ctx.lineTo(grid.x[pattern[i]], grid.y[pattern[i]]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 공격 링 (잔여 시간 비율)
      var ringR = cell * this.view.ringCellRatio;
      var ratio = combat.ringRatio();
      var start = -Math.PI / 2;
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.arc(grid.cx, grid.cy, ringR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = ratio < 0.33 ? '#FF2A2A' : '#FFE600';
      ctx.beginPath();
      ctx.arc(grid.cx, grid.cy, ringR, start, start + Math.PI * 2 * ratio);
      ctx.stroke();
    }

    // 진행 헤더
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(this.stageText, 16, 20);
    ctx.font = '15px sans-serif';
    ctx.fillStyle = '#C8C8FF';
    ctx.fillText(this.typeText, 16, 44);
    ctx.textAlign = 'right';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = this.warningText.length > 0 ? '#FF2A2A' : '#FFFFFF';
    ctx.fillText(this.targetText, w - 16, 20);
    if (this.warningText.length > 0 && ((this._time * 4) | 0) % 2 === 0) {
      ctx.fillText(this.warningText, w - 16, 44);
    }

    // 몬스터 HP 바
    var barX = 70;
    var barW = w - 140;
    var barY = this.topH - 16;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(barX, barY, barW, 8);
    ctx.fillStyle = '#FF2A2A';
    ctx.fillRect(barX, barY, barW * this.hpRatio, 8);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '13px sans-serif';
    ctx.fillText(this.hpText, w / 2, barY - 9);

    // 중단: 현재 폼/페이즈, 경과 시간
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.patternText, w / 2, this.topH + 24);
    var sec = combat.elapsed | 0;
    if (sec >= MAX_TIME_TEXT) sec = MAX_TIME_TEXT - 1;
    ctx.font = '15px sans-serif';
    ctx.fillStyle = '#C8C8FF';
    ctx.fillText(this._timeTexts[sec], w / 2, this.topH + 50);

    // 주인공 플레이스홀더 (중단 플레이어 필드)
    var fy = this.topH + this.midH * 0.55;
    ctx.fillStyle = '#7FE7FF';
    ctx.shadowColor = '#7FE7FF';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(w / 2, fy + Math.sin(this._time * 2) * 4, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 플레이어 HP
    var hpY = this.topH + this.midH - 26;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(barX, hpY + 12, barW, 6);
    ctx.fillStyle = '#4CFF8A';
    ctx.fillRect(barX, hpY + 12, barW * this.playerHpRatio, 6);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(this.playerHpText, w / 2, hpY - 4);

    // 결과 텍스트
    if (this.resultText.length > 0) {
      var midY = (this.view.fieldTop + this.view.fieldBottom) / 2;
      ctx.font = 'bold 48px sans-serif';
      ctx.fillStyle = '#FFE600';
      ctx.shadowColor = '#FFE600';
      ctx.shadowBlur = 20;
      ctx.fillText(this.resultText, w / 2, midY);
      ctx.shadowBlur = 0;
      if (this.resultSubText.length > 0) {
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(this.resultSubText, w / 2, midY + 44);
      }
    }

    // 정타/피격 플래시
    if (this.flashTimer > 0) {
      ctx.globalAlpha = 0.35 * (this.flashTimer / this.flashDuration);
      ctx.fillStyle = this.flashColor;
      ctx.fillRect(0, 0, w, this.topH);
      ctx.globalAlpha = 1;
    }
  };

  POF.FieldRenderer = FieldRenderer;
})(window.POF = window.POF || {});
