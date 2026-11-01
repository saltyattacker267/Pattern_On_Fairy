// 코어 로직 -> 뷰 상태 전파용 Observer
// emit 시 객체 생성을 피하기 위해 페이로드는 원시값 인자(a, b)로만 전달한다.
(function (POF) {
  'use strict';

  POF.Events = {
    STAGE_STARTED: 'stageStarted',   // (stageIndex)
    STAGE_CLEARED: 'stageCleared',   // (stageIndex)
    PLAYER_DEAD: 'playerDead',       // (stageIndex)
    PLAYER_HP: 'playerHp',           // (hp, maxHp)
    BOSS_HP: 'bossHp',               // (hp, maxHp)
    BOSS_PHASE: 'bossPhase',         // (phaseIndex)
    BOSS_ATTACK: 'bossAttack',       // (damage)
    PATTERN_HIT: 'patternHit',       // (damage)
    PATTERN_MISS: 'patternMiss'      // (penalty)
  };

  function EventBus() {
    this._map = {};
  }

  EventBus.prototype.on = function (type, fn) {
    var list = this._map[type];
    if (!list) {
      list = [];
      this._map[type] = list;
    }
    list.push(fn);
  };

  EventBus.prototype.off = function (type, fn) {
    var list = this._map[type];
    if (!list) return;
    var i = list.indexOf(fn);
    if (i !== -1) list.splice(i, 1);
  };

  EventBus.prototype.emit = function (type, a, b) {
    var list = this._map[type];
    if (!list) return;
    for (var i = 0; i < list.length; i++) {
      list[i](a, b);
    }
  };

  POF.EventBus = EventBus;
})(window.POF = window.POF || {});
