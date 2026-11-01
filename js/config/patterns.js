// 스테이지 1-1 ~ 1-5 보스 페이즈별 드로잉 궤적 데이터 (기획서 6.2)
// 노드 번호:
//   1 2 3
//   4 5 6
//   7 8 9
// hpAbove: 보스 HP가 이 값보다 클 때 해당 페이즈가 활성화된다.
// 시작 노드와 끝 노드가 같으면 닫힌(순환) 패턴으로 취급한다.
(function (POF) {
  'use strict';

  POF.Patterns = {
    bosses: [
      {
        stage: '1-1', name: '골렘 타이탄', maxHp: 5.0, rewardGold: 100,
        phases: [
          { hpAbove: 3.5, name: 'ㄷ자', nodes: [1, 2, 3, 6, 9, 8, 7] },
          { hpAbove: 1.5, name: 'L자', nodes: [1, 4, 7, 8, 9] },
          { hpAbove: 0.0, name: 'ㅡ자 코어', nodes: [4, 5, 6] }
        ]
      },
      {
        stage: '1-2', name: '스톰 와이번', maxHp: 8.0, rewardGold: 150,
        phases: [
          { hpAbove: 5.5, name: '번개 Z자', nodes: [1, 2, 3, 5, 7, 8] },
          { hpAbove: 2.5, name: '편익', nodes: [2, 5, 8, 7] },
          { hpAbove: 0.0, name: '낙뢰', nodes: [2, 5, 8] }
        ]
      },
      {
        stage: '1-3', name: '스파이더 퀸', maxHp: 12.0, rewardGold: 200,
        phases: [
          { hpAbove: 8.0, name: '마름모', nodes: [2, 4, 7, 8, 9, 6, 2] },
          { hpAbove: 4.0, name: '다리', nodes: [4, 5, 6, 9, 8] },
          { hpAbove: 0.0, name: '독낭', nodes: [7, 5, 3] }
        ]
      },
      {
        stage: '1-4', name: '키메라 비스트', maxHp: 18.0, rewardGold: 250,
        phases: [
          { hpAbove: 12.0, name: '도약 순환', nodes: [1, 5, 9, 8, 7, 4, 2] },
          { hpAbove: 6.0, name: '발톱', nodes: [1, 2, 5, 8, 9] },
          { hpAbove: 0.0, name: '심장', nodes: [8, 5, 2] }
        ]
      },
      {
        stage: '1-5', name: '아케인 오버로드', maxHp: 25.0, rewardGold: 350,
        phases: [
          { hpAbove: 17.0, name: '나선', nodes: [1, 2, 3, 6, 9, 8, 7, 4] },
          { hpAbove: 8.0, name: 'S자', nodes: [3, 2, 1, 4, 5, 6] },
          { hpAbove: 0.0, name: '왜곡 코어', nodes: [1, 5, 9, 6] }
        ]
      }
    ]
  };
})(window.POF = window.POF || {});
