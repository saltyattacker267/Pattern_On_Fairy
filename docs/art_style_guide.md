# 패턴 온 페어리 - 아트 스타일 가이드 (Asset Prompt Guide)

`asset_bridge.py`로 에셋을 생성할 때 사용하는 프롬프트 블록 모음이다.
실행 규칙(순차 실행, 명령어 형식 등)은 `CLAUDE.md`의 Asset Bridge Protocol을 따르고, 이 문서는 프롬프트에 들어갈 **내용(데이터)** 만 관리한다.

---

## 1. 프롬프트 조합 순서

### 1.1 캐릭터/몬스터 스프라이트 (`--rembg` 사용)
```
[LAYER_SPRITE_HEAD] + [VIEW] + [캐릭터 IDENTITY] + [캐릭터 OUTFIT] + [POSE] + [PALETTE] + [STYLE_BASE] + [LAYER_SPRITE_TAIL]
```

### 1.2 배경 (`--rembg` 미사용)
```
[LAYER_BG_HEAD] + [장면 묘사] + [STYLE_BASE] + [LAYER_BG_TAIL]
```

### 1.3 블록 교체 규칙
| 에셋 | 용도 | VIEW | 고정 블록 | 교체 블록 |
|---|---|---|---|---|
| `fairy_base.png` | 캐릭터 일러스트 | VIEW_ILLUST | IDENTITY, OUTFIT_BASE | POSE_BASE |
| `lobby_fairy_idle_A/B/C.png` | 로비 일상 모션 | VIEW_ILLUST | IDENTITY, OUTFIT_BASE | POSE_IDLE_A/B/C |
| `fairy_costume_1~6.png` | 캐릭터 일러스트 | VIEW_ILLUST | IDENTITY | OUTFIT (코스튬별), POSE |
| `fairy_battle_back.png` | 전투 (2.5D 백뷰) | VIEW_BATTLE_BACK | IDENTITY, OUTFIT_BASE | POSE_BATTLE_BACK |
| `battle_back_[동료영문명].png` | 전투 (2.5D 백뷰) | VIEW_BATTLE_BACK | 동료 IDENTITY | POSE |
| `monster_[아이디]_form_[A~C].png` | 몬스터 필드 | VIEW_MONSTER | 몬스터 IDENTITY | 노드 궤적 기반 POSE |
| `boss_N_phase_1~3.png` | 보스 필드 | VIEW_MONSTER | 보스 IDENTITY | 페이즈별 변화 묘사 |
| `bg_stage_N.png` | 스테이지 배경 | - | STYLE_BASE | 지역별 장면 묘사 |

블록 원문은 `docs/art_prompts/`의 캐릭터 시트에 있다 (3장 참조).

---

## 2. 공통 블록

### STYLE_BASE (모든 에셋 공통 화풍)
```
Art style: bold, thick, dark comic ink outlines with sharp chiseled edges (American cartoon inspired dynamic linework), combined with rich vintage European painterly texture, visible gouache and oil brushstrokes, dramatic chiaroscuro lighting.
```

### LAYER_SPRITE_HEAD (스프라이트 앞부분)
```
Full body character illustration, entire figure inside the frame from head to feet, centered, no text, no letters, no watermark, no borders, no ground shadow, no background effects.
```

### VIEW (시점, 에셋 용도별 택1)
- **VIEW_ILLUST** (캐릭터 일러스트, 로비)
  ```
  Front three-quarter view.
  ```
- **VIEW_BATTLE_BACK** (인게임 플레이어 필드 2.5D 백뷰)
  ```
  Rear three-quarter back view, seen from behind and slightly above, character facing away from the viewer toward the upper screen, 2.5D game sprite.
  ```
- **VIEW_MONSTER** (몬스터/보스, 3×3 노드 앵커 매핑용)
  ```
  Orthographic 2D front view, facing the viewer directly, symmetrical framing.
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

## 3. 캐릭터 시트 및 에셋 폴더

캐릭터별 프롬프트 블록과 에셋 체크리스트는 `docs/art_prompts/`에 분류별로 관리한다. 각 파일은 프롬프트 블록, 에셋별 생성 상태(`미생성` / `테스트` / `확정`), 확정 이미지의 최종 프롬프트 기록을 포함한다.

| 시트 | 대상 | 에셋 저장 폴더 |
|---|---|---|
| `docs/art_prompts/fairy.md` | 주인공 페어리 (일러스트, 로비, 코스튬, 전투 백뷰) | `assets/characters/fairy/` |
| `docs/art_prompts/partners.md` | 동료 페어리 11인 (컷인, 전투 백뷰) | `assets/characters/partners/` |
| `docs/art_prompts/monsters.md` | 스테이지 몬스터 15종 (폼별) | `assets/monsters/` |
| `docs/art_prompts/bosses.md` | 스테이지 보스 5종 (페이즈별) + 스테이지 배경 | `assets/bosses/`, `assets/backgrounds/` |
| - | UI 아이콘 | `assets/ui/` |
| - | 테스트 생성물 | `assets/test/` |

에셋을 확정하면 해당 시트의 체크리스트 상태를 갱신하고, 채택된 이미지를 만든 최종 프롬프트 전문을 기록한다.

---

## 4. 생성 작업 규칙

1. **기준 이미지 첨부:** 캐릭터 변형(포즈/코스튬) 에셋은 Gemini에 해당 캐릭터의 기준 이미지를 첨부하고, 프롬프트 앞에 `Same character as the attached image.`를 붙인다.
2. **새 채팅에서 생성:** 이전 생성 결과에 구도가 끌려가지 않도록 에셋마다 새 채팅에서 생성한다.
3. **바닥 상호작용 포즈 금지:** 스프라이트는 바닥 없이 생성되므로 "땅에 꽂기", "앉기", "기대기" 등 바닥/사물과 닿는 포즈는 반영되지 않는다. 공중 또는 선 자세로 표현 가능한 동작만 쓴다.
4. **흰색/반투명 요소 금지:** 흰 배경 위에서 생성하므로 흰색 또는 무색 반투명 요소는 배경 제거 시 불투명한 흰 판이 되거나 함께 지워진다. 옅은 색조라도 반드시 색을 지정한다. (예: 날개 `pale ice-blue tinted`)
5. **임의 디테일 고정:** 생성 결과에서 프롬프트에 없던 디테일(눈 색, 소품, 장식 등)이 확정되면 캐릭터 시트에 즉시 추가하여 다음 생성부터 고정한다.
6. **Gemini 워터마크:** 생성 이미지 우하단의 ✦ 워터마크는 `--rembg` 처리 시 제거됨을 확인했다. 배경(`--rembg` 미사용) 에셋은 워터마크가 남으므로 별도 확인이 필요하다.
7. **금지 키워드:**
   - `neon`, `cyber` 등 인공 발광 키워드 금지 (기획서 1.2 비주얼 톤 앤 매너).
   - 스프라이트에 `glow`, `aura`, `sparkles` 등 캐릭터 주변 발광/입자 키워드 금지. 배경 제거 후 테두리 잔상이 남는다. 발광 연출은 Canvas 런타임 이펙트로 처리한다.
   - `transparent background` 금지. 생성 모델이 체크무늬 배경을 그림으로 그려 넣어 배경 제거가 불가능해진다. 반드시 `solid white background` + `--rembg`를 사용한다.
   - `fairytale`, `cute chibi` 등 화풍을 희석하는 톤 키워드 금지. 화풍은 `STYLE_BASE`로만 지정한다.
8. **백뷰 에셋 식별 요소:** `VIEW_BATTLE_BACK` 에셋은 얼굴이 보이지 않으므로 머리 색/포니테일, 모자, 망토, 날개 등 뒷모습에서 보이는 요소로 캐릭터를 식별한다. 기준 이미지는 해당 캐릭터의 일러스트(주인공은 `assets/characters/fairy/fairy_base.png`)를 첨부한다.
9. **모션은 단일 대표 자세로 생성:** 프로토타입은 모션당 이미지 1장 + Canvas 절차적 모션으로 구현한다(기획서 1.3). 프레임 연속 이미지를 만들지 않고, 정지 상태에서도 동작이 한눈에 읽히는 대표 자세 1장으로 생성한다.

---

## 5. 검증 기록

| 날짜 | 테스트 파일 | 결과 |
|---|---|---|
| 2026-11-03 | `assets/test/fairy_base_sprite_test.png` | 기준 이미지와 동일 포즈 재현 성공. 워터마크 제거 확인. 흰 날개가 불투명 흰 판이 되는 문제 발견 → 규칙 4 추가 |
| 2026-11-03 | `assets/test/lobby_fairy_idle_A_test.png` | 포즈 변경 시 캐릭터 일관성 유지 확인. 날개 색조 지정으로 흰 판 문제 개선. 세이버 땅에 꽂기 포즈 미반영 → 규칙 3 추가. (테스트 포즈는 하품 자세로, 기획서 3.1의 낮잠 모션과 다르며 현재 POSE_IDLE_A로 대체됨) |
