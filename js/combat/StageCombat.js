// 스테이지 전투 로직 (10웨이브: 일반 / 중갑·암살 / 강습 9마리 무작위 순서 + 보스)
// - 활성 몬스터는 한 번에 1마리. 처치 시 spawnDelaySec 후 다음 웨이브 등장.
// - 일반/중갑/암살/강습: 피격 시 폼 모핑 (Soft Pity 가중치, 기획서 4.3)
// - 보스: HP 구간에 따라 페이즈 궤적 전환, 피격 시 필드 그리드 내 다른 위치로 이동
// - 드로잉 중 판정(기획서 4.1): 마지막 노드 도달 즉시 타격(On-Reach), 경로 이탈 즉시 Miss,
//   완성 전 릴리즈 Miss, 타격 후 홀딩 시 holdRepeatSec 주기 자동 재타격.
// - 스테이지 타이머는 경과 시간 기록만 한다 (제한 시간 규칙 미정).
// 뷰 제어 없이 EventBus로만 상태를 전파한다.
(function (POF) {
  'use strict';

  var E = POF.Events;

  var STATE_IDLE = 0;
  var STATE_BATTLE = 1;
  var STATE_SPAWN = 2;   // 처치 후 다음 몬스터 등장 대기
  var STATE_CLEAR = 3;
  var STATE_DEAD = 4;

  // 웨이브 몬스터 종류
  var KIND_NORMAL = 0;
  var KIND_ELITE = 1;    // 중갑 또는 암살
  var KIND_ASSAULT = 2;
  var KIND_BOSS = 3;

  // judgeStroke 반환값
  var STROKE_PROGRESS = 0; // 드로잉 계속
  var STROKE_HIT = 1;      // 정타 발동, 홀딩 시작
  var STROKE_MISS = 2;     // 오입력 처리됨
  var STROKE_IGNORED = 3;  // 전투 중이 아니어서 판정 없음

  function round2(v) {
    return Math.round(v * 100) / 100;
  }

  // random: 0 이상 1 미만 난수 함수 (테스트 시 주입, 기본 Math.random)
  function StageCombat(balance, stages, bosses, bus, random) {
    this.cfg = balance.combat;
    this.stageCfg = balance.stage;
    this.grades = balance.grades;
    this.stages = stages;
    this.bosses = bosses;
    this.bus = bus;
    this.random = random || Math.random;

    var mix = this.stageCfg.waveMix;
    this.waveCount = mix.normal + mix.elite + mix.assault + 1;
    this.waveKinds = new Int8Array(this.waveCount);

    this.stageIndex = 0;
    this.stage = null;
    this.boss = null;
    this.state = STATE_IDLE;
    this.resultTimer = 0;
    this.spawnTimer = 0;
    this.elapsed = 0;
    this.playerHp = 0;

    // 현재 활성 몬스터
    this.waveIndex = 0;
    this.kind = KIND_NORMAL;
    this.def = null;         // 몬스터 또는 보스 데이터
    this.grade = null;       // Balance.grades 항목
    this.hp = 0;
    this.maxHp = 0;
    this.formIndex = 0;
    this.formStreak = 0;     // 현재 폼 연속 유지 횟수
    this.phaseIndex = 0;
    this.posCol = 0;         // 필드 그리드 내 3x3 블록 좌상단 칸
    this.posRow = 0;
    this.ringMax = 0;
    this.ringTimer = 0;

    // 홀딩 연타 상태
    this.holding = false;
    this.holdTimer = 0;
    this.heldPattern = null; // 타격 시점의 목표 궤적 (참조 비교로 패턴 변경 감지)
  }

  StageCombat.STATE_IDLE = STATE_IDLE;
  StageCombat.STATE_BATTLE = STATE_BATTLE;
  StageCombat.STATE_SPAWN = STATE_SPAWN;
  StageCombat.STATE_CLEAR = STATE_CLEAR;
  StageCombat.STATE_DEAD = STATE_DEAD;
  StageCombat.KIND_NORMAL = KIND_NORMAL;
  StageCombat.KIND_ELITE = KIND_ELITE;
  StageCombat.KIND_ASSAULT = KIND_ASSAULT;
  StageCombat.KIND_BOSS = KIND_BOSS;
  StageCombat.STROKE_PROGRESS = STROKE_PROGRESS;
  StageCombat.STROKE_HIT = STROKE_HIT;
  StageCombat.STROKE_MISS = STROKE_MISS;
  StageCombat.STROKE_IGNORED = STROKE_IGNORED;

  StageCombat.prototype.startStage = function (index) {
    this.stageIndex = index;
    this.stage = this.stages[index];
    this.boss = this.bosses[index];
    this.playerHp = this.cfg.playerMaxHp;
    this.elapsed = 0;
    this.resultTimer = 0;
    this._buildWaves();

    this.bus.emit(E.STAGE_STARTED, index);
    this.bus.emit(E.PLAYER_HP, this.playerHp, this.cfg.playerMaxHp);
    this._spawn(0);
  };

  // 1 ~ 9 웨이브: 등급 비율대로 채운 뒤 무작위 섞기, 마지막은 보스
  StageCombat.prototype._buildWaves = function () {
    var mix = this.stageCfg.waveMix;
    var kinds = this.waveKinds;
    var n = 0;
    var i;
    for (i = 0; i < mix.normal; i++) kinds[n++] = KIND_NORMAL;
    for (i = 0; i < mix.elite; i++) kinds[n++] = KIND_ELITE;
    for (i = 0; i < mix.assault; i++) kinds[n++] = KIND_ASSAULT;
    for (i = n - 1; i > 0; i--) {
      var j = (this.random() * (i + 1)) | 0;
      var t = kinds[i];
      kinds[i] = kinds[j];
      kinds[j] = t;
    }
    kinds[n] = KIND_BOSS;
  };

  StageCombat.prototype._spawn = function (waveIndex) {
    this.waveIndex = waveIndex;
    this.kind = this.waveKinds[waveIndex];
    this.cancelHold();

    if (this.kind === KIND_BOSS) {
      this.def = this.boss;
      this.grade = this.grades.boss;
    } else if (this.kind === KIND_ELITE) {
      this.def = this.stage.elite;
      this.grade = this.grades[this.def.grade];
    } else if (this.kind === KIND_ASSAULT) {
      this.def = this.stage.assault;
      this.grade = this.grades[this.def.grade];
    } else {
      this.def = this.stage.normal;
      this.grade = this.grades[this.def.grade];
    }

    this.maxHp = this.def.maxHp;
    this.hp = this.maxHp;
    this.ringMax = this.grade.ringSec;
    this.ringTimer = this.ringMax;
    this.formStreak = 0;
    if (this.kind === KIND_BOSS) {
      this.formIndex = 0;
      this.phaseIndex = this._calcPhase();
    } else {
      this.formIndex = (this.random() * this.def.forms.length) | 0;
      this.phaseIndex = 0;
    }
    this._placeRandom(-1);
    this.state = STATE_BATTLE;

    this.bus.emit(E.MONSTER_SPAWNED, waveIndex, this.kind);
    this.bus.emit(E.MONSTER_HP, this.hp, this.maxHp);
    this.bus.emit(E.MONSTER_PATTERN, this.kind === KIND_BOSS ? this.phaseIndex : this.formIndex);
  };

  // 필드 그리드 내 배치 가능 위치 수 = (열 - 2) x (행 - 2)
  StageCombat.prototype.positionCount = function () {
    var g = this.stage.grid;
    return (g.cols - 2) * (g.rows - 2);
  };

  // 무작위 위치 배치. exclude: 제외할 위치 인덱스 (-1이면 제외 없음)
  StageCombat.prototype._placeRandom = function (exclude) {
    var count = this.positionCount();
    var cols = this.stage.grid.cols - 2;
    var idx;
    if (count <= 1) {
      idx = 0;
    } else if (exclude < 0) {
      idx = (this.random() * count) | 0;
    } else {
      idx = (this.random() * (count - 1)) | 0;
      if (idx >= exclude) idx++;
    }
    this.posCol = idx % cols;
    this.posRow = (idx / cols) | 0;
  };

  StageCombat.prototype._calcPhase = function () {
    var phases = this.boss.phases;
    for (var i = 0; i < phases.length; i++) {
      if (this.hp > phases[i].hpAbove) return i;
    }
    return phases.length - 1;
  };

  StageCombat.prototype.isBoss = function () {
    return this.kind === KIND_BOSS;
  };

  StageCombat.prototype.currentPattern = function () {
    if (!this.def) return null;
    if (this.kind === KIND_BOSS) return this.def.phases[this.phaseIndex].nodes;
    return this.def.forms[this.formIndex].nodes;
  };

  StageCombat.prototype.currentPatternName = function () {
    if (!this.def) return '';
    if (this.kind === KIND_BOSS) return this.def.phases[this.phaseIndex].name;
    return this.def.forms[this.formIndex].name;
  };

  StageCombat.prototype.ringRatio = function () {
    return this.ringMax > 0 ? this.ringTimer / this.ringMax : 0;
  };

  StageCombat.prototype.update = function (dt) {
    if (this.state === STATE_BATTLE) {
      this.elapsed += dt;
      this.ringTimer -= dt;
      if (this.ringTimer <= 0) {
        this.ringTimer = this.ringMax;
        this.bus.emit(E.MONSTER_ATTACK, this.grade.attackDamage);
        this._damagePlayer(this.grade.attackDamage);
      }
      if (this.holding && this.state === STATE_BATTLE) this._updateHold(dt);
    } else if (this.state === STATE_SPAWN) {
      this.elapsed += dt;
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0) this._spawn(this.waveIndex + 1);
    } else if (this.state === STATE_CLEAR || this.state === STATE_DEAD) {
      this.resultTimer -= dt;
      if (this.resultTimer <= 0) {
        if (this.state === STATE_CLEAR) {
          this.startStage((this.stageIndex + 1) % this.stages.length);
        } else {
          this.startStage(this.stageIndex);
        }
      }
    }
  };

  // 드로잉 중 궤적이 바뀔 때마다 호출 (nodes: 궤적 버퍼, len: 유효 길이)
  StageCombat.prototype.judgeStroke = function (nodes, len) {
    if (this.state !== STATE_BATTLE) return STROKE_IGNORED;

    var M = POF.PatternMatcher;
    var r = M.progress(nodes, len, this.currentPattern());
    if (r === M.PROGRESS) return STROKE_PROGRESS;
    if (r === M.DEVIATE) {
      this._miss();
      return STROKE_MISS;
    }

    // On-Reach: 마지막 노드 도달 즉시 타격 후 홀딩 대기
    this.heldPattern = this.currentPattern();
    this._applyHit();
    if (this.state === STATE_BATTLE) {
      this.holding = true;
      this.holdTimer = 0;
    }
    return STROKE_HIT;
  };

  // 목표 궤적 완성 전 릴리즈 (len: 릴리즈 시점 궤적 길이). 노드를 하나라도 거쳤으면 Miss.
  StageCombat.prototype.releaseStroke = function (len) {
    if (this.state !== STATE_BATTLE) return;
    if (len > 0) this._miss();
  };

  // 홀딩 취소 (릴리즈, 노드 이탈, 처치 등). 페널티 없음.
  StageCombat.prototype.cancelHold = function () {
    this.holding = false;
    this.holdTimer = 0;
    this.heldPattern = null;
  };

  StageCombat.prototype.isHolding = function () {
    return this.holding;
  };

  StageCombat.prototype.holdRatio = function () {
    return this.holding ? this.holdTimer / this.cfg.holdRepeatSec : 0;
  };

  // 홀딩 중 적의 목표 궤적 모양이 바뀌었으면 true (붉은 경고 상태)
  StageCombat.prototype.holdWarning = function () {
    return this.holding && this.currentPattern() !== this.heldPattern;
  };

  StageCombat.prototype._updateHold = function (dt) {
    this.holdTimer += dt;
    if (this.holdTimer < this.cfg.holdRepeatSec) return;

    if (this.holdWarning()) {
      // 경고 상태에서 완충까지 유지하면 오입력
      this.cancelHold();
      this._miss();
      return;
    }
    this.holdTimer -= this.cfg.holdRepeatSec;
    this._applyHit();
  };

  StageCombat.prototype._applyHit = function () {
    var dmg = this.cfg.baseAttack;
    this.hp = round2(this.hp - dmg);
    if (this.hp < 0) this.hp = 0;
    this.bus.emit(E.PATTERN_HIT, dmg);
    this.bus.emit(E.MONSTER_HP, this.hp, this.maxHp);

    if (this.hp <= 0) {
      this.cancelHold();
      this.bus.emit(E.MONSTER_KILLED, this.waveIndex);
      if (this.kind === KIND_BOSS) {
        this.state = STATE_CLEAR;
        this.resultTimer = this.cfg.resultDelaySec;
        this.bus.emit(E.STAGE_CLEARED, this.stageIndex, this.elapsed);
      } else {
        this.state = STATE_SPAWN;
        this.spawnTimer = this.stageCfg.spawnDelaySec;
      }
      return;
    }

    if (this.kind === KIND_BOSS) {
      var phase = this._calcPhase();
      if (phase !== this.phaseIndex) {
        this.phaseIndex = phase;
        this.bus.emit(E.MONSTER_PATTERN, phase);
      }
      // 피격 시마다 다른 위치로 이동 (배치 가능 위치가 1곳이면 고정)
      this._placeRandom(this.posRow * (this.stage.grid.cols - 2) + this.posCol);
    } else {
      this._rollForm();
    }

    // 공격 딜레이 보상: 잔여 시간 가산, 등급 최대치 상한
    this.ringTimer += this.cfg.staggerAddSec;
    if (this.ringTimer > this.ringMax) this.ringTimer = this.ringMax;
  };

  // 피격 시 폼 모핑 추첨 (Soft Pity): 연속 유지 횟수가 늘수록 유지 확률 감소
  StageCombat.prototype._rollForm = function () {
    var n = this.def.forms.length;
    if (n <= 1) return;
    var table = this.stageCfg.formStayProb[n];
    var k = this.formStreak < table.length ? this.formStreak : table.length - 1;
    if (this.random() < table[k]) {
      this.formStreak++;
      return;
    }
    var idx = (this.random() * (n - 1)) | 0;
    if (idx >= this.formIndex) idx++;
    this.formIndex = idx;
    this.formStreak = 0;
    this.bus.emit(E.MONSTER_PATTERN, idx);
  };

  StageCombat.prototype._miss = function () {
    this.bus.emit(E.PATTERN_MISS, this.cfg.missPenalty);
    this._damagePlayer(this.cfg.missPenalty);
  };

  StageCombat.prototype._damagePlayer = function (amount) {
    this.playerHp = round2(this.playerHp - amount);
    if (this.playerHp < 0) this.playerHp = 0;
    this.bus.emit(E.PLAYER_HP, this.playerHp, this.cfg.playerMaxHp);

    if (this.playerHp <= 0) {
      this.state = STATE_DEAD;
      this.resultTimer = this.cfg.resultDelaySec;
      this.cancelHold();
      this.bus.emit(E.PLAYER_DEAD, this.stageIndex);
    }
  };

  // 디버그: 현재 스테이지의 보스 웨이브로 바로 이동
  StageCombat.prototype.debugSkipToBoss = function () {
    if (this.state !== STATE_BATTLE && this.state !== STATE_SPAWN) return;
    this._spawn(this.waveCount - 1);
  };

  POF.StageCombat = StageCombat;
})(window.POF = window.POF || {});
