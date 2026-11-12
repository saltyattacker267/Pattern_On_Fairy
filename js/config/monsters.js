// 스테이지 1 ~ 5 일반 / 중갑·암살 / 강습 몬스터 데이터 (기획서 6.2 ~ 6.5)
// - grid: 스테이지 필드 그리드 (열 x 행). 몬스터는 3x3 칸을 차지한다.
// - grade: Balance.grades 키 (normal / armored / assassin / assault)
// - maxHp: 기획서 6.5 밸런스 테이블
// - forms: 폼별 궤적 (노드 번호는 patterns.js와 동일한 3x3 배치)
// 보스는 patterns.js의 bosses[같은 인덱스]를 사용한다.
(function (POF) {
  'use strict';

  POF.Monsters = {
    stages: [
      {
        stage: '1', region: '이끼 덮인 고성 정원', grid: { cols: 3, rows: 3 },
        normal: {
          id: 'moss_pebble', name: '모스 페블', grade: 'normal', maxHp: 0.5,
          forms: [
            { name: '굴러오기', nodes: [7, 8, 9] },
            { name: '튀어오르기', nodes: [7, 5, 9] }
          ]
        },
        elite: {
          id: 'gargoyle_sentinel', name: '가고일 센티넬', grade: 'armored', maxHp: 1.5,
          forms: [
            { name: '방패 방어', nodes: [1, 4, 7, 8] },
            { name: '할버드 내려찍기', nodes: [1, 2, 3, 6] },
            { name: '꼬리 휘두르기', nodes: [4, 5, 6, 9] }
          ]
        },
        assault: {
          id: 'mossthorn_boar', name: '이끼뿔 멧돼지', grade: 'assault', maxHp: 1.5,
          forms: [
            { name: '돌진 후 들이받기', nodes: [7, 8, 9, 6, 3] },
            { name: '퍼올려 내리찍기', nodes: [7, 5, 3, 6, 9] },
            { name: '급선회', nodes: [1, 2, 3, 5, 7] }
          ]
        }
      },
      {
        stage: '2', region: '뇌운의 절벽 섬', grid: { cols: 4, rows: 3 },
        normal: {
          id: 'spark_bat', name: '스파크 박쥐', grade: 'normal', maxHp: 1.0,
          forms: [
            { name: '날갯짓', nodes: [1, 5, 3] },
            { name: '활강', nodes: [1, 5, 9] }
          ]
        },
        elite: {
          id: 'storm_harpy', name: '폭풍 하피', grade: 'assassin', maxHp: 1.5,
          forms: [
            { name: '낚아채기', nodes: [1, 5, 9, 8] },
            { name: '상승 기류', nodes: [7, 4, 5, 2] },
            { name: '칼깃 베기', nodes: [3, 5, 7, 8] }
          ]
        },
        assault: {
          id: 'thunder_griffon', name: '썬더 그리폰', grade: 'assault', maxHp: 2.5,
          forms: [
            { name: '번개 발톱', nodes: [1, 2, 5, 6, 9] },
            { name: '선회 비행', nodes: [2, 4, 8, 6, 2] },
            { name: '벌린 부리', nodes: [1, 4, 8, 6, 3] }
          ]
        }
      },
      {
        stage: '3', region: '독안개 늪 숲', grid: { cols: 4, rows: 3 },
        normal: {
          id: 'toadstool_mite', name: '독버섯 진드기', grade: 'normal', maxHp: 1.5,
          forms: [
            { name: '기어오르기', nodes: [1, 4, 7] },
            { name: '폴짝 뛰기', nodes: [4, 2, 6] }
          ]
        },
        elite: {
          id: 'shadow_mantis', name: '그림자 사마귀', grade: 'assassin', maxHp: 2.5,
          forms: [
            { name: '낫 휘두르기', nodes: [1, 2, 5, 9] },
            { name: '낫 치켜들기', nodes: [7, 4, 1, 2] },
            { name: '찌르기', nodes: [7, 5, 3, 6] }
          ]
        },
        assault: {
          id: 'bog_jumper', name: '늪 도약거미', grade: 'assault', maxHp: 3.5,
          forms: [
            { name: '도약', nodes: [7, 4, 1, 2, 3] },
            { name: '줄 타고 내려오기', nodes: [2, 5, 8, 9, 6] },
            { name: '독침', nodes: [1, 5, 9, 6, 3] }
          ]
        }
      },
      {
        stage: '4', region: '버려진 연금술 공방', grid: { cols: 5, rows: 4 },
        normal: {
          id: 'lab_rat', name: '실험체 쥐', grade: 'normal', maxHp: 2.0,
          forms: [
            { name: '종종걸음', nodes: [7, 8, 9] },
            { name: '뛰어오르기', nodes: [7, 5, 3] }
          ]
        },
        elite: {
          id: 'homunculus_guard', name: '호문쿨루스 갑주병', grade: 'armored', maxHp: 4.0,
          forms: [
            { name: '방패 밀치기', nodes: [4, 5, 6, 3] },
            { name: '망치 내려치기', nodes: [1, 2, 5, 8] },
            { name: '증기 분사', nodes: [7, 8, 5, 2] }
          ]
        },
        assault: {
          id: 'twin_hound', name: '쌍두 사냥개', grade: 'assault', maxHp: 5.0,
          forms: [
            { name: '도약 물기', nodes: [7, 4, 1, 5, 9] },
            { name: '덮치기', nodes: [3, 2, 1, 5, 9] },
            { name: '꼬리 휘감기', nodes: [2, 5, 8, 7, 4] }
          ]
        }
      },
      {
        stage: '5', region: '공허에 잠긴 요정 왕궁', grid: { cols: 6, rows: 4 },
        normal: {
          id: 'page_imp', name: '페이지 임프', grade: 'normal', maxHp: 2.5,
          forms: [
            { name: '책장 넘기기', nodes: [1, 2, 3] },
            { name: '꼬리불꽃', nodes: [4, 8, 6] }
          ]
        },
        elite: {
          id: 'void_wraith', name: '공허 갑주 망령', grade: 'armored', maxHp: 5.0,
          forms: [
            { name: '대검 내려베기', nodes: [2, 5, 8, 9] },
            { name: '횡베기', nodes: [1, 4, 5, 6] },
            { name: '방패 밀치기', nodes: [3, 6, 5, 4] }
          ]
        },
        assault: {
          id: 'void_bug', name: '보이드 버그', grade: 'assault', maxHp: 6.5,
          forms: [
            { name: '지그재그 돌진', nodes: [3, 2, 5, 4, 7] },
            { name: '공허 소용돌이', nodes: [1, 2, 5, 4, 1] },
            { name: '갈퀴 다리', nodes: [7, 4, 5, 6, 9] }
          ]
        }
      }
    ]
  };
})(window.POF = window.POF || {});
