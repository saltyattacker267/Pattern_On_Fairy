// 검증용 최소 전투 로직 (보스 단일 전투)
// - 보스 HP 구간에 따라 페이즈 패턴이 전환된다.
// - 공격 링 타이머 만료 시 플레이어가 피해를 입는다.
// - 정타 시 보스 피해, 오입력 시 플레이어 하트 감소.
// 뷰 제어 없이 EventBus로만 상태를 전파한다.
(function (POF) {
  'use strict';

  var E = POF.Events;

  var STATE_IDLE = 0;
  var STATE_BATTLE = 1;
  var STATE_CLEAR = 2;
  var STATE_DEAD = 3;

  function round2(v) {
    return Math.round(v * 100) / 100;
  }

  function TestCombat(balance, bosses, bus) {
    this.cfg = balance.combat;
    this.bosses = bosses;
    this.bus = bus;

    this.stageIndex = 0;
    this.boss = null;
    this.bossHp = 0;
    this.phaseIndex = 0;
    this.playerHp = 0;
    this.ringTimer = 0;
    this.state = STATE_IDLE;
    this.resultTimer = 0;
  }

  TestCombat.STATE_IDLE = STATE_IDLE;
  TestCombat.STATE_BATTLE = STATE_BATTLE;
  TestCombat.STATE_CLEAR = STATE_CLEAR;
  TestCombat.STATE_DEAD = STATE_DEAD;

  TestCombat.prototype.startStage = function (index) {
    this.stageIndex = index;
    this.boss = this.bosses[index];
    this.bossHp = this.boss.maxHp;
    this.phaseIndex = this._calcPhase();
    this.playerHp = this.cfg.playerMaxHp;
    this.ringTimer = this.cfg.attackRingSec;
    this.state = STATE_BATTLE;
    this.resultTimer = 0;

    this.bus.emit(E.STAGE_STARTED, index);
    this.bus.emit(E.BOSS_HP, this.bossHp, this.boss.maxHp);
    this.bus.emit(E.BOSS_PHASE, this.phaseIndex);
    this.bus.emit(E.PLAYER_HP, this.playerHp, this.cfg.playerMaxHp);
  };

  TestCombat.prototype._calcPhase = function () {
    var phases = this.boss.phases;
    for (var i = 0; i < phases.length; i++) {
      if (this.bossHp > phases[i].hpAbove) return i;
    }
    return phases.length - 1;
  };

  TestCombat.prototype.currentPattern = function () {
    return this.boss ? this.boss.phases[this.phaseIndex].nodes : null;
  };

  TestCombat.prototype.ringRatio = function () {
    return this.ringTimer / this.cfg.attackRingSec;
  };

  TestCombat.prototype.update = function (dt) {
    if (this.state === STATE_BATTLE) {
      this.ringTimer -= dt;
      if (this.ringTimer <= 0) {
        this.ringTimer = this.cfg.attackRingSec;
        this.bus.emit(E.BOSS_ATTACK, this.cfg.bossAttackDamage);
        this._damagePlayer(this.cfg.bossAttackDamage);
      }
    } else if (this.state === STATE_CLEAR || this.state === STATE_DEAD) {
      this.resultTimer -= dt;
      if (this.resultTimer <= 0) {
        if (this.state === STATE_CLEAR) {
          this.startStage((this.stageIndex + 1) % this.bosses.length);
        } else {
          this.startStage(this.stageIndex);
        }
      }
    }
  };

  // 릴리즈 시점 판정 (nodes: 궤적 버퍼, len: 유효 길이)
  TestCombat.prototype.submit = function (nodes, len) {
    if (this.state !== STATE_BATTLE) return;

    if (POF.PatternMatcher.matches(nodes, len, this.currentPattern())) {
      var dmg = this.cfg.baseAttack;
      this.bossHp = round2(this.bossHp - dmg);
      if (this.bossHp < 0) this.bossHp = 0;
      this.bus.emit(E.PATTERN_HIT, dmg);
      this.bus.emit(E.BOSS_HP, this.bossHp, this.boss.maxHp);

      if (this.bossHp <= 0) {
        this.state = STATE_CLEAR;
        this.resultTimer = this.cfg.resultDelaySec;
        this.bus.emit(E.STAGE_CLEARED, this.stageIndex);
        return;
      }

      var phase = this._calcPhase();
      if (phase !== this.phaseIndex) {
        this.phaseIndex = phase;
        this.bus.emit(E.BOSS_PHASE, phase);
      }
      if (this.cfg.resetRingOnHit) this.ringTimer = this.cfg.attackRingSec;
    } else {
      this.bus.emit(E.PATTERN_MISS, this.cfg.missPenalty);
      this._damagePlayer(this.cfg.missPenalty);
    }
  };

  TestCombat.prototype._damagePlayer = function (amount) {
    this.playerHp = round2(this.playerHp - amount);
    if (this.playerHp < 0) this.playerHp = 0;
    this.bus.emit(E.PLAYER_HP, this.playerHp, this.cfg.playerMaxHp);

    if (this.playerHp <= 0) {
      this.state = STATE_DEAD;
      this.resultTimer = this.cfg.resultDelaySec;
      this.bus.emit(E.PLAYER_DEAD, this.stageIndex);
    }
  };

  POF.TestCombat = TestCombat;
})(window.POF = window.POF || {});
