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
      mirrorCenterY: 210,    // 상단 3x3 미러 앵커 중심 Y
      mirrorSpacing: 95,     // 상단 앵커 간격
      ringRadius: 150,       // 공격 링 반지름
      gridSpacing: 100,      // 하단 드로잉 그리드 노드 간격
      nodeHitRadius: 36      // 노드 터치 판정 반경
    },

    pattern: {
      minNodes: 3,           // 유효 판정 최소 노드 수 (미만은 무시)
      closeMinNodes: 3       // 시작점 복귀(닫힘)를 허용하기 위한 최소 고유 노드 수
    },

    time: {
      normalScale: 1.0,
      dragSlowScale: 0.75,   // 드래그 유지 중 슬로우 모션
      maxDeltaSec: 0.1       // 탭 전환 등으로 인한 큰 프레임 간격 제한
    },

    combat: {
      baseAttack: 0.5,       // 기본 공격력 (하트 반 쪽)
      missPenalty: 1.0,      // 오입력 시 플레이어 하트 감소량
      attackRingSec: 3.0,    // 공격 링 타이머
      bossAttackDamage: 2.0, // 무한 모드 Tier 0 보스 수치 차용 (스테이지 모드 미정의)
      playerMaxHp: 5.0,      // [임시값] 기획서 미정의
      resetRingOnHit: true,  // [임시값] 정타 시 공격 링 재시작 여부
      resultDelaySec: 1.5    // [임시값] 클리어/게임오버 후 재시작 대기
    },

    input: {
      ghostTouchGuardMs: 80  // 릴리즈 직후 재터치(고스트 터치) 무시 시간
    }
  };
})(window.POF = window.POF || {});
