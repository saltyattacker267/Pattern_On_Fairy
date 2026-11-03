# 패턴 온 페어리 - 아트 스타일 가이드 (Asset Prompt Guide)

`asset_bridge.py`로 에셋을 생성할 때 사용하는 프롬프트 블록 모음이다.
실행 규칙(순차 실행, 명령어 형식 등)은 `CLAUDE.md`의 Asset Bridge Protocol을 따르고, 이 문서는 프롬프트에 들어갈 **내용(데이터)** 만 관리한다.

---

## 1. 프롬프트 조합 순서

### 1.1 캐릭터 스프라이트 (`--rembg` 사용)
```
[LAYER_SPRITE_HEAD] + [캐릭터 IDENTITY] + [캐릭터 OUTFIT] + [POSE] + [PALETTE] + [STYLE_BASE] + [LAYER_SPRITE_TAIL]
```

### 1.2 배경 (`--rembg` 미사용)
```
[LAYER_BG_HEAD] + [장면 묘사] + [STYLE_BASE] + [LAYER_BG_TAIL]
```

### 1.3 블록 교체 규칙
| 에셋 | 고정 블록 | 교체 블록 |
|---|---|---|
| `fairy_base.png` | IDENTITY, OUTFIT_BASE | POSE_BASE |
| `lobby_fairy_idle_A/B/C.png` | IDENTITY, OUTFIT_BASE | POSE (프레임별) |
| `fairy_costume_1~6.png` | IDENTITY | OUTFIT (코스튬별), POSE |
| `boss_N_phase_1~3.png` | 보스 IDENTITY | 페이즈별 변화 묘사 |

---

## 2. 공통 블록

### STYLE_BASE (모든 에셋 공통 화풍)
```
Art style: bold, thick, dark comic ink outlines with sharp chiseled edges (American cartoon inspired dynamic linework), combined with rich vintage European painterly texture, visible gouache and oil brushstrokes, dramatic chiaroscuro lighting.
```

### LAYER_SPRITE_HEAD (스프라이트 앞부분)
```
Full body character illustration, entire figure inside the frame from head to feet, centered, front three-quarter view, no text, no letters, no watermark, no borders, no ground shadow, no background effects.
```

### LAYER_SPRITE_TAIL (스프라이트 끝부분)
```
isolated on solid white background
```

### LAYER_BG_HEAD (배경 앞부분)
```
Game background illustration, vertical 9:16 composition, no characters, no text, no letters, no watermark, no borders.
```

### LAYER_BG_TAIL (배경 끝부분)
```
Subtle canvas and aged paper grain texture.
```

---

## 3. 캐릭터 시트

### 3.1 주인공 페어리 (기준 이미지: `assets/fairy_base.png`)

**IDENTITY** (코스튬과 무관하게 항상 고정)
```
A 7-head-tall slender and graceful female fairy. Youthful face with cute Japanese anime-style features, heavy half-closed cat-like golden amber eyes with long dark eyelashes, bored, sulky yet proud expression, rosy blushed cheeks, long pointed elf ears. Platinum ash-blonde hair with messy side-swept bangs partially covering one eye, stray strands and an ahoge, gathered into a loose low ponytail hanging behind her shoulder. Four large pale ice-blue tinted translucent crystalline insect-like fairy wings with geometric gold filigree veins, upper pair larger than lower pair.
```

**OUTFIT_BASE** (기본 복장, `fairy_costume_N`에서는 이 블록을 교체)
```
Wearing a French Hussar-inspired royal blue cavalry officer uniform with high collar and steel gorget, dense gold hussar braiding with red underlay across the chest, gold fringed epaulettes over curved steel pauldrons, brown leather lace-up corset with red laces, brown leather belt with gold buckle, crimson red cape, red sash cord with hanging tassels at left hip, sabre scabbard at left hip, silver steel gauntlets with gold engraving, royal blue breeches with red side stripe, polished silver plate greaves, poleyns and sabatons with gold trim, black bicorne hat with gold trim, red cockade and large red and white plumes. Weapon: a long curved silver cavalry sabre with a golden D-guard and brown grip.
```

**PALETTE**
```
Color palette: royal blue, crimson red, gold, polished silver, platinum ash-blonde, brown leather.
```

**POSE_BASE** (`fairy_base.png`)
```
Pose: right hand holds the sabre resting over her right shoulder, left hand on hip, relaxed arrogant standing pose.
```

**POSE_IDLE_A** (`lobby_fairy_idle_A.png`)
```
Pose: lazy idle stance, slightly slouched with weight on one leg, the sabre held loosely pointing down beside her, one gauntleted hand resting lazily on the sabre guard, the other hand covering a big sleepy yawn, eyes squeezed half shut.
```

---

## 4. 생성 작업 규칙

1. **기준 이미지 첨부:** 캐릭터 변형(포즈/코스튬) 에셋은 Gemini에 해당 캐릭터의 기준 이미지를 첨부하고, 프롬프트 앞에 `Same character as the attached image.`를 붙인다.
2. **새 채팅에서 생성:** 이전 생성 결과에 구도가 끌려가지 않도록 에셋마다 새 채팅에서 생성한다.
3. **바닥 상호작용 포즈 금지:** 스프라이트는 바닥 없이 생성되므로 "땅에 꽂기", "앉기", "기대기" 등 바닥/사물과 닿는 포즈는 반영되지 않는다. 공중 또는 선 자세로 표현 가능한 동작만 쓴다.
4. **흰색/반투명 요소 금지:** 흰 배경 위에서 생성하므로 흰색 또는 무색 반투명 요소는 배경 제거 시 불투명한 흰 판이 되거나 함께 지워진다. 옅은 색조라도 반드시 색을 지정한다. (예: 날개 `pale ice-blue tinted`)
5. **임의 디테일 고정:** 생성 결과에서 프롬프트에 없던 디테일(눈 색, 소품, 장식 등)이 확정되면 캐릭터 시트에 즉시 추가하여 다음 생성부터 고정한다.
6. **Gemini 워터마크:** 생성 이미지 우하단의 ✦ 워터마크는 `--rembg` 처리 시 제거됨을 확인했다. 배경(`--rembg` 미사용) 에셋은 워터마크가 남으므로 별도 확인이 필요하다.

---

## 5. 검증 기록

| 날짜 | 테스트 파일 | 결과 |
|---|---|---|
| 2026-11-03 | `assets/test/fairy_base_sprite_test.png` | 기준 이미지와 동일 포즈 재현 성공. 워터마크 제거 확인. 흰 날개가 불투명 흰 판이 되는 문제 발견 → 규칙 4 추가 |
| 2026-11-03 | `assets/test/lobby_fairy_idle_A_test.png` | 포즈 변경 시 캐릭터 일관성 유지 확인. 날개 색조 지정으로 흰 판 문제 개선. 세이버 땅에 꽂기 포즈 미반영 → 규칙 3 추가 |
