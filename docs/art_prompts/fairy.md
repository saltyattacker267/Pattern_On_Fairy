# 주인공 페어리 - 캐릭터 시트

- 기준 이미지: `assets/characters/fairy/fairy_base.png`
- 저장 폴더: `assets/characters/fairy/`
- 공통 블록(STYLE_BASE, VIEW, LAYER) 및 작업 규칙은 `docs/art_style_guide.md`를 따른다.

---

## 1. 프롬프트 블록

**IDENTITY** (코스튬과 무관하게 항상 고정)
```
A 7-head-tall slender and graceful female fairy. Youthful face with cute Japanese anime-style features, heavy half-closed cat-like golden amber eyes with long dark eyelashes, bored, sulky yet proud expression, rosy blushed cheeks, long pointed elf ears. Platinum ash-blonde hair with messy side-swept bangs partially covering one eye, stray strands and an ahoge, gathered into a loose low ponytail hanging behind her shoulder. Four large pale ice-blue tinted translucent crystalline insect-like fairy wings with geometric gold filigree veins, upper pair larger than lower pair.
```

**OUTFIT_BASE** (기본 복장, `fairy_costume_N`에서는 이 블록을 교체)
```
Wearing a French Hussar-inspired royal blue cavalry officer uniform with high collar and steel gorget, dense gold hussar braiding with red underlay across the chest, gold fringed epaulettes over curved steel pauldrons, brown leather lace-up corset with red laces, brown leather belt with gold buckle, a crimson red half-cape attached at the back of the belt flowing down from the waist, red sash cord with hanging tassels at left hip, sabre scabbard at left hip, silver steel gauntlets with gold engraving, royal blue breeches with red side stripe, polished silver plate greaves, poleyns and sabatons with gold trim, black bicorne hat with gold trim, red cockade and large red and white plumes. Weapon: a long curved silver cavalry sabre with a golden D-guard and brown grip. No cape or cloak on the shoulders, wings fully visible.
```

**PALETTE**
```
Color palette: royal blue, crimson red, gold, polished silver, platinum ash-blonde, brown leather, pale ice blue.
```

**POSE_BASE** (`fairy_base.png`)
```
Pose: right hand holds the sabre resting over her right shoulder, left hand on hip, relaxed arrogant standing pose.
```

**POSE_IDLE_A: 낮잠** (`lobby_fairy_idle_A.png`)
```
Pose: napping while floating in mid-air, lying on her side curled up as if on an invisible hammock, eyes closed, sleeping peacefully with one arm as a pillow, sabre sheathed at her hip, wings relaxed.
```

**POSE_IDLE_B: 마도서 독서** (`lobby_fairy_idle_B.png`)
```
Pose: floating upright in mid-air sitting cross-legged on nothing, reading an open ornate dark brown leather-bound grimoire with aged cream pages held in both hands, bored half-closed eyes on the pages, sabre sheathed at her hip.
```

**POSE_IDLE_C: 유영** (`lobby_fairy_idle_C.png`)
```
Pose: drifting gracefully through the air as if swimming, body tilted forward almost horizontal, one arm stretched ahead, waist half-cape and ponytail trailing behind her, wings spread wide, relaxed lazy expression, sabre sheathed at her hip.
```

**POSE_BATTLE_BACK** (`fairy_battle_back.png`)
```
Pose: standing ready facing away from the viewer toward the enemy, sabre drawn and held low in her right hand, back of the bicorne hat with plumes, ponytail, crimson waist half-cape and wings clearly visible, wings spread.
```

---

## 2. 에셋 체크리스트

상태: `미생성` / `테스트` / `확정`. 확정 시 채택된 이미지를 만든 최종 프롬프트 전문을 아래 기록란에 남긴다.

| 파일 | 용도 | VIEW | 블록 조합 | 상태 |
|---|---|---|---|---|
| `fairy_base.png` | 캐릭터 일러스트 (기준 이미지) | VIEW_ILLUST | IDENTITY + OUTFIT_BASE + POSE_BASE | 확정 (v4, 2026-11-04) |
| `lobby_fairy_idle_A.png` | 로비 낮잠 | VIEW_ILLUST | IDENTITY + OUTFIT_BASE + POSE_IDLE_A | 미생성 |
| `lobby_fairy_idle_B.png` | 로비 마도서 독서 | VIEW_ILLUST | IDENTITY + OUTFIT_BASE + POSE_IDLE_B | 미생성 |
| `lobby_fairy_idle_C.png` | 로비 유영 | VIEW_ILLUST | IDENTITY + OUTFIT_BASE + POSE_IDLE_C | 미생성 |
| `fairy_battle_back.png` | 전투 2.5D 백뷰 | VIEW_BATTLE_BACK | IDENTITY + OUTFIT_BASE + POSE_BATTLE_BACK | 미생성 |
| `fairy_costume_1~6.png` | 코스튬 일러스트 | VIEW_ILLUST | IDENTITY + 코스튬별 OUTFIT + POSE | 미생성 (코스튬 OUTFIT 블록 미작성) |

### 확정 프롬프트 기록
- `fairy_base.png` v1 (원본): 사용자 제공 최초 프롬프트로 생성한 배경 포함 일러스트. 어깨 망토 착용(규칙 10 위반)으로 교체. 파일은 삭제되었으며 커밋 `cd7268e`의 `assets/fairy_base.png`로 확인할 수 있다.
- `fairy_base.png` v2 (중간 결과물, 삭제됨): 첨부 v1 원본 + 지시문 `Same character as the attached image, with one outfit change: the shoulder cape is removed and replaced by a crimson half-cape flowing from the back of the belt, so the wings are fully visible from the shoulders.` + 블록 조합(LAYER_SPRITE_HEAD + VIEW_ILLUST + IDENTITY + OUTFIT_BASE + POSE_BASE + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL). 망토 해결, 단 날개가 크림색, 눈이 적갈색으로 생성.
- `fairy_base.png` v3 (교체됨, 커밋 `5f334d6`에서 확인 가능): 첨부 v2 + 지시문 `Same character, outfit and pose as the attached image, with exactly two color changes: recolor all four wings to a clearly visible pale ice-blue tint (not white, not cream), and recolor her eyes to bright golden amber. Keep everything else identical.` + 동일 블록 조합(PALETTE에 `pale ice blue` 추가). 날개 평균 RGB (188,200,200)로 하늘색 확인, 눈 금빛 호박색 확인.
- `fairy_base.png` v4 (확정, `assets/characters/fairy/fairy_base.png`): 첨부 v3 + 지시문 `Same character, outfit, colors and pose as the attached image, keeping the same art style, with exactly two changes: (1) make the lineart on the face noticeably thinner and softer, with lighter line weight around the eyes, nose, mouth and jawline, so her facial impression becomes gentler; (2) render much stronger, clearly defined shadows on the body, clothing and armor, with deep form shadows and cast shadows that give a pronounced three-dimensional sculpted look. Keep everything else identical.` + 블록 조합(LAYER_SPRITE_HEAD + VIEW_ILLUST + IDENTITY + OUTFIT_BASE + POSE_BASE + PALETTE + 수정 STYLE + LAYER_SPRITE_TAIL). 수정 STYLE: `Art style: bold, thick, dark comic ink outlines with sharp chiseled edges on the body, clothing, armor and wings (American cartoon inspired dynamic linework), but thin, soft, delicate lineart on the face for a gentler expression, combined with rich vintage European painterly texture, visible gouache and oil brushstrokes, strong dramatic chiaroscuro lighting with deep, clearly defined form shadows and cast shadows on the body, clothing and armor, pronounced volumetric three-dimensional shading.` 얼굴 선이 가늘어져 인상이 부드러워진 점을 채택 (그림자 강화는 거의 반영되지 않음, 가이드 규칙 11). 이 STYLE을 일반화하여 `STYLE_BASE`에 반영.
