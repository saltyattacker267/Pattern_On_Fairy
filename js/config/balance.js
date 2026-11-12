// 밸런스 및 레이아웃 파라미터 (Data-Driven)
// [임시값] 표기 항목은 기획서에 수치가 정의되지 않아 검증용으로 둔 값이다.
(function (POF) {
  'use strict';

  POF.Balance = {
    // 논리 해상도(9:16) 및 3-Tier 레이아웃
    view: {
      width: 540,
      height: 960,
      topRatio: 0.40,        // 몬스터 필드
      midRatio: 0.25,        // 플레이어 필드
      botRatio: 0.35,        // 컨트롤 존
      fieldTop: 64,          // 몬스터 필드 그리드 영역 상단 (위쪽은 진행 헤더)
      fieldBottom: 350,      // 몬스터 필드 그리드 영역 하단 (아래쪽은 HP 바)
      ringCellRatio: 1.55,   // 공격 링 반지름 = 필드 칸 크기 x 비율
      gridSpacing: 100,      // 하단 드로잉 그리드 노드 간격
      nodeHitRadius: 36      // 노드 터치 판정 반경
    },

    pattern: {
      closeMinNodes: 3       // 시작점 복귀(닫힘)를 허용하기 위한 최소 고유 노드 수
    },

    time: {
      normalScale: 1.0,      // 드로잉 중에도 1.0배속 유지 (기획서 4.1, 슬로우 없음)
      maxDeltaSec: 0.1       // 탭 전환 등으로 인한 큰 프레임 간격 제한
    },

    combat: {
      baseAttack: 0.5,       // 기본 공격력 (하트 반 쪽)
      missPenalty: 1.0,      // 오입력 시 플레이어 하트 감소량
      staggerAddSec: 0.5,    // 피격 후 체력이 남으면 공격 링 잔여 시간 가산 (기획서 4.3)
      holdRepeatSec: 1.5,    // 홀딩 연타 주기 (기획서 4.1)
      playerMaxHp: 5.0,      // [임시값] 기획서 미정의
      resultDelaySec: 1.5    // [임시값] 클리어/게임오버 후 재시작 대기
    },

    // 등급별 공격 링 타이머(최대 상한) 및 공격 피해량 (기획서 6.1)
    // attackDamage: [임시값] 스테이지 모드 미정의, 등급 구분 없이 1.0
    grades: {
      normal:   { label: '일반', ringSec: 3.0, attackDamage: 1.0 },
      armored:  { label: '중갑', ringSec: 3.0, attackDamage: 1.0 },
      assassin: { label: '암살', ringSec: 2.5, attackDamage: 1.0 },
      assault:  { label: '강습', ringSec: 3.0, attackDamage: 1.0 },
      boss:     { label: '보스', ringSec: 3.0, attackDamage: 1.0 }
    },

    stage: {
      // 1 ~ 9 웨이브 등급 비율 (순서는 스테이지 시작 시 무작위 섞기), 마지막 웨이브는 보스
      waveMix: { normal: 5, elite: 2, assault: 2 },
      spawnDelaySec: 0.3,    // [임시값] 처치 후 다음 몬스터 등장까지 대기
      moveSec: 0.10,         // 보스 위치 이동(미끄러짐) 트랜지션 (기획서 4.3)
      // 폼 모핑 시 현재 폼 유지 확률 (기획서 4.3 Soft Pity). 키: 폼 개수, 인덱스: 연속 유지 횟수
      formStayProb: {
        2: [0.5, 0.25, 0],
        3: [1 / 3, 1 / 6, 0]
      }
    },

    input: {
      ghostTouchGuardMs: 80  // 릴리즈 직후 재터치(고스트 터치) 무시 시간
    }
  };
})(window.POF = window.POF || {});
