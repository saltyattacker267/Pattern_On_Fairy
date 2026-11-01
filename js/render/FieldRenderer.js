// 상단 몬스터 필드 / 중단 플레이어 필드 렌더링 (에셋 없이 Canvas 벡터 드로잉)
// - 3x3 점선 가이드 앵커, 보스 패턴(네온 라인), 공격 링, 보스 HP 바
// - 플레이어 HP, 주인공 플레이스홀더, 피격/정타 플래시
// 텍스트는 이벤트 수신 시점에만 문자열을 생성해 캐싱한다 (프레임 내 문자열 결합 금지).
(function (POF) {
  'use strict';

  var E = POF.Events;
  var TestCombat = POF.TestCombat;

  var DASH = [4, 6];
  var NO_DASH = [];
  var HUE_STEPS = 36;

  function FieldRenderer(view, combat, mirrorGrid, bus) {
    this.view = view;
    this.combat = combat;
    this.grid = mirrorGrid;

    this.topH = view.height * view.topRatio;
    this.midH = view.height * view.midRatio;

    // 보스 무지개 펄스용 색상 사전 생성
    this._hues = new Array(HUE_STEPS);
    for (var i = 0; i < HUE_STEPS; i++) {
      this._hues[i] = 'hsl(' + (i * 10) + ', 100%, 60%)';
    }
    this._time = 0;

    this.stageText = '';
    this.phaseText = '';
    this.bossHpText = '';
    this.playerHpText = '';
    this.resultText = '';
    this.bossHpRatio = 1;
    this.playerHpRatio = 1;

    this.flashTimer = 0;
    this.flashDuration = 0.15;
    this.flashColor = '#FFFFFF';

    var self = this;
    bus.on(E.STAGE_STARTED, function (index) {
      var boss = combat.bosses[index];
      self.stageText = 'STAGE ' + boss.stage + '  ' + boss.name;
      self.resultText = '';
    });
    bus.on(E.BOSS_PHASE, function (phaseIndex) {
      var phase = combat.boss.phases[phaseIndex];
      self.phaseText = 'Phase ' + (phaseIndex + 1) + ' · ' + phase.name;
    });
    bus.on(E.BOSS_HP, function (hp, maxHp) {
      self.bossHpText = hp.toFixed(1) + ' / ' + maxHp.toFixed(1);
      self.bossHpRatio = maxHp > 0 ? hp / maxHp : 0;
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
    bus.on(E.BOSS_ATTACK, function () {
      self._flash('#FF2A2A', 0.3);
    });
    bus.on(E.STAGE_CLEARED, function () {
      self.resultText = 'CLEAR!';
    });
    bus.on(E.PLAYER_DEAD, function () {
      self.resultText = 'GAME OVER';
    });
  }

  FieldRenderer.prototype._flash = function (color, duration) {
    this.flashColor = color;
    this.flashDuration = duration;
    this.flashTimer = duration;
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

    // 3x3 점선 가이드 앵커
    ctx.setLineDash(DASH);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 2;
    for (var n = 1; n <= 9; n++) {
      ctx.beginPath();
      ctx.arc(grid.x[n], grid.y[n], 18, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.setLineDash(NO_DASH);

    // 보스 패턴 (무지개 HSL 순환 네온)
    var pattern = combat.currentPattern();
    if (pattern && combat.state === TestCombat.STATE_BATTLE) {
      var hueIndex = ((this._time * 12) | 0) % HUE_STEPS;
      ctx.strokeStyle = this._hues[hueIndex];
      ctx.shadowColor = this._hues[hueIndex];
      ctx.shadowBlur = 18;
      ctx.lineWidth = 14;
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
      var ratio = combat.ringRatio();
      var start = -Math.PI / 2;
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.arc(grid.cx, grid.cy, this.view.ringRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = ratio < 0.33 ? '#FF2A2A' : '#FFE600';
      ctx.beginPath();
      ctx.arc(grid.cx, grid.cy, this.view.ringRadius, start, start + Math.PI * 2 * ratio);
      ctx.stroke();
    }

    // 보스 HP 바
    var barX = 70;
    var barW = w - 140;
    var barY = this.topH - 22;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(barX, barY, barW, 8);
    ctx.fillStyle = '#FF2A2A';
    ctx.fillRect(barX, barY, barW * this.bossHpRatio, 8);

    // 텍스트
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(this.stageText, w / 2, this.topH + 24);
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#C8C8FF';
    ctx.fillText(this.phaseText, w / 2, this.topH + 50);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px sans-serif';
    ctx.fillText(this.bossHpText, w / 2, barY - 12);

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
      ctx.font = 'bold 48px sans-serif';
      ctx.fillStyle = '#FFE600';
      ctx.shadowColor = '#FFE600';
      ctx.shadowBlur = 20;
      ctx.fillText(this.resultText, w / 2, grid.cy);
      ctx.shadowBlur = 0;
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
