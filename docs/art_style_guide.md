# 패턴 온 페어리 - 아트 스타일 가이드 (Asset Prompt Guide)

`asset_bridge.py`로 에셋을 생성할 때 사용하는 프롬프트 블록 모음이다.
실행 규칙(순차 실행, 명령어 형식 등)은 `CLAUDE.md`의 Asset Bridge Protocol을 따르고, 이 문서는 프롬프트에 들어갈 **내용(데이터)** 만 관리한다.

---

## 1. 프롬프트 조합 순서

### 1.1 캐릭터/몬스터 스프라이트 (`--rembg` 사용)
```
[LAYER_SPRITE_HEAD] + [VIEW] + [캐릭터 IDENTITY] + [FACE] + [캐릭터 OUTFIT] + [POSE] + [PALETTE] + [STYLE_BASE] + [LAYER_SPRITE_TAIL]
```
- `[FACE]`는 동료 캐릭터 시트(`docs/art_prompts/partners.md` 3장)의 FACE 블록을 쓴다. 주인공은 IDENTITY에 얼굴 묘사가 포함되어 있고, 몬스터/보스와 장년 컨셉 동료는 생략한다.

### 1.1.1 전투 백뷰 스프라이트 (`--rembg` 사용, 2026-11-12 추가)
```
[LAYER_SPRITE_HEAD] + [VIEW_BATTLE_BACK] + [캐릭터 IDENTITY_BACK] + [캐릭터 OUTFIT_BACK] + [POSE_BATTLE_BACK] + [PALETTE] + [STYLE_BASE_BACK] + [LAYER_SPRITE_TAIL]
```
- `[FACE]`는 넣지 않는다. IDENTITY_BACK/OUTFIT_BACK은 일반 IDENTITY/OUTFIT에서 **뒤에서 보이지 않는 요소(눈, 표정, 볼, 앞머리, 가슴 장식, 앞쪽 매듭/끈 등)를 삭제**하고 뒷면 요소(뒤통수, 머리끈, 귀끝, 날개 뿌리, 등·허리 뒤 장식)만 남긴 백뷰 전용 블록이다.
- 생성 모델은 문맥보다 명사에 반응하므로 `face`, `eyes`, `smile`, `expression`, `bangs` 등의 단어는 부정문(`not visible` 등)으로도 쓰지 않는다. 대신 "보이는 것만" 긍정형으로 쓴다 (예: `only the back of her head, her hat and her ponytail are visible`).

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
| `fairy_battle_back.png` | 전투 (2.5D 백뷰, 기준 백뷰) | VIEW_BATTLE_BACK | IDENTITY_BACK, OUTFIT_BACK, STYLE_BASE_BACK | POSE_BATTLE_BACK |
| `battle_back_[동료영문명].png` | 전투 (2.5D 백뷰) | VIEW_BATTLE_BACK | 동료 IDENTITY_BACK, OUTFIT_BACK, STYLE_BASE_BACK | POSE_BATTLE_BACK |
| `monster_[아이디]_form_[A~C].png` | 몬스터 필드 | VIEW_MONSTER | 몬스터 IDENTITY | 노드 궤적 기반 POSE |
| `boss_N_phase_1~3.png` | 보스 필드 | VIEW_MONSTER | 보스 IDENTITY | 페이즈별 변화 묘사 |
| `bg_stage_N.png` | 스테이지 배경 | - | STYLE_BASE | 지역별 장면 묘사 |

블록 원문은 `docs/art_prompts/`의 캐릭터 시트에 있다 (3장 참조).

---

## 2. 공통 블록

### STYLE_BASE (모든 에셋 공통 화풍)
```
Art style: bold, thick, dark comic ink outlines with sharp chiseled edges on the body, clothing, props and wings (American cartoon inspired dynamic linework), but thin, soft, delicate lineart on the face for a gentler expression, combined with rich vintage European painterly texture, visible gouache and oil brushstrokes, strong dramatic chiaroscuro lighting with deep, clearly defined form shadows on the body and clothing, pronounced volumetric three-dimensional shading.
```
- 2026-11-04: 기준 이미지 `fairy_base.png` v4 생성 프롬프트의 STYLE을 일반화하여 반영 (얼굴 선 약화, 몸 그림자·입체감 강화). 배경 제거 시 바닥 그림자 잔상을 막기 위해 `cast shadows`는 제외했다.

### STYLE_BASE_BACK (전투 백뷰 전용 화풍, 2026-11-12 추가)
```
Art style: bold, thick, dark comic ink outlines with sharp chiseled edges on the body, clothing, props and wings (American cartoon inspired dynamic linework), combined with rich vintage European painterly texture, visible gouache and oil brushstrokes, strong dramatic chiaroscuro lighting with deep, clearly defined form shadows on the body and clothing, pronounced volumetric three-dimensional shading.
```
- `STYLE_BASE`에서 얼굴 선화 구절(`but thin, soft, delicate lineart on the face for a gentler expression`)만 삭제했다. 이 구절이 백뷰에서 얼굴을 그리라는 신호로 작용하기 때문이다. `STYLE_BASE`를 수정하면 이 블록도 함께 맞춘다.

### LAYER_SPRITE_HEAD (스프라이트 앞부분)
```
Full body character illustration, entire figure inside the frame from head to feet, centered, no text, no letters, no watermark, no borders, no ground shadow, no background effects.
```

### VIEW (시점, 에셋 용도별 택1)
- **VIEW_ILLUST** (캐릭터 일러스트, 로비)
  ```
  Front three-quarter view.
  ```
- **VIEW_BATTLE_BACK** (인게임 플레이어 필드 2.5D 백뷰, 2026-11-12 갱신)
  ```
  Vertical 3:4 portrait composition. Rear three-quarter back view, camera directly behind the character at the character's own height, the character turned away from the viewer and angled toward an opponent far away in the upper right of the screen, 2.5D game sprite. The back is toward the viewer, the head pointing the same direction as the body, toward the upper right.
  ```
  - 카메라는 위에서 내려다보거나 아래에서 올려다보지 않고 등 뒤 눈높이에 둔다. 상단 몬스터를 향하는 느낌은 카메라 각도가 아니라 캐릭터의 몸·시선 방향(오른쪽 위)으로 표현한다. 낮은 앵글은 밑창·턱 아래가 노출되어 얼굴 묘사가 끼어들 위험이 있다.
  - 비율을 지정하지 않으면 가로형(2752×1536)으로 생성되어 여백이 많으므로 세로 3:4를 명시한다.
  - 모든 백뷰는 오른쪽 위를 향하게 생성한다 (오른쪽 슬롯 동료의 좌우 반전 렌더링 여부는 코드 작업 시 결정).
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

1. **기준 이미지 첨부:** 기준 이미지를 첨부하는 에셋은 용도에 맞는 지시문을 **프롬프트 맨 앞에 포함하여** `asset_bridge.py`에 전달한다 (사용자가 별도로 붙이지 않도록 클립보드 복사본에 포함).
   - 같은 캐릭터의 변형(포즈/코스튬): 해당 캐릭터의 기준 이미지 첨부 + `Same character as the attached image.`
   - 백뷰는 정면 이미지를 첨부하지 않는다 (규칙 8).
   - 다른 캐릭터의 화풍 참고(동료/몬스터/보스 첫 생성): `assets/characters/fairy/fairy_base.png` 첨부 + `Match the art style of the attached image (a different character).`
   - 실행 시 사용자에게 어떤 이미지를 첨부해야 하는지 함께 안내한다.
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
8. **백뷰 에셋 생성 (2026-11-12 갱신):** `VIEW_BATTLE_BACK` 에셋은 얼굴이 보이지 않으므로 머리 색/포니테일, 모자, 허리 반망토, 날개 등 뒷모습에서 보이는 요소로 캐릭터를 식별한다. 조합은 1.1.1을 따른다.
   - **정면 이미지 첨부 금지:** 정면 일러스트(`fairy_base.png`, 동료 `cutin`)를 첨부하면 Gemini가 원본을 편집하는 방식으로 처리하여 몸은 정면 그대로 두고 고개만 돌린다 (규칙 11과 같은 현상). 텍스트에서 정면 묘사를 지워도 해결되지 않았다.
   - **기준 백뷰:** 주인공 백뷰 `assets/characters/fairy/fairy_battle_back.png`는 첨부 없이 텍스트로만 생성하여 확정했다. 이후 백뷰의 구도·화풍 통일을 위한 기준 백뷰로 쓴다.
   - **동료 백뷰 (검증 전):** `fairy_battle_back.png` 첨부 + `Match the art style and composition of the attached image (a different character).` + 동료 백뷰 블록으로 생성한다. 첨부 이미지의 색·의상이 번질 수 있으므로(규칙 11) 첫 동료에서 검증하고, 번지면 `recolor ... (not ...)` 지시를 추가하거나 첨부 없이 텍스트로만 생성한다.
   - **자세:** 전투 백뷰는 공격 전 대기 상태 일러스트다. 공격 동작(돌진, 찌르기)이 아니라 공중에 떠서 적을 주시하는 준비 자세로 쓴다.
9. **모션은 단일 대표 자세로 생성:** 프로토타입은 모션당 이미지 1장 + Canvas 절차적 모션으로 구현한다(기획서 1.3). 프레임 연속 이미지를 만들지 않고, 정지 상태에서도 동작이 한눈에 읽히는 대표 자세 1장으로 생성한다.
10. **날개 캐릭터 망토 금지:** 날개가 있는 캐릭터(주인공, 동료 등)는 어깨나 목에서 늘어져 등 위쪽(날개 뿌리)을 덮는 망토/클로크/케이프를 착용하지 않는다. 날개 뿌리와 겹쳐 설정상 어색하고, 백뷰에서 날개와 망토가 서로를 가려 식별성이 떨어진다.
   - 휘날리는 천이 필요하면 대체 수단을 쓴다: 허리 반망토(허리 뒤에서 흘러내리는 천), 코트 자락, 스카프/리본/장식끈, 몸에 맞는 로브.
   - 망토 같은 실루엣이 필요한 컨셉은 별도 망토 대신 **날개로 표현**한다 (예: 카밀라의 박쥐 막날개를 어깨에 망토처럼 두름). 불투명한 막날개처럼 천으로 읽힐 수 있는 날개에만 사용한다. 단, 2026-11-10 카밀라 생성에서 "날개를 어깨에 망토처럼 두름" 지시가 2회 연속 반영되지 않고 날개가 등 뒤로 펼쳐졌다. 생성 모델이 잘 따르지 않는 지시이므로 기대하지 않는다.
   - 날개 캐릭터의 OUTFIT 블록 끝에는 `No cape or cloak on the shoulders, wings fully visible.`를 포함한다.
   - 캐릭터 시트의 "등 처리" 칸에 캐릭터별 처리 방식을 명시하고, 프롬프트 작성 후 `cape`/`cloak` 키워드를 검색해 허용된 표현(허리 반망토, 날개 망토, 금지 문장) 외에 남아 있지 않은지 확인한다.
   - 날개가 없는 몬스터/보스에는 적용하지 않는다.
11. **첨부 이미지 색 우선 현상:** 기준 이미지를 첨부하면 첨부 이미지의 색이 텍스트 프롬프트의 색 지정보다 우선한다. 기준 이미지와 다른 색을 원하면 지시문에 `recolor <부위> to <색> (not <기존 색>)` 형태로 변경 사항을 명시한다.
   - 그림체와 조명도 같다. 첨부 이미지가 있으면 Gemini는 원본을 편집하는 방식으로 처리하여, 화풍 변경·그림자 강화 지시는 거의 반영되지 않는다 (2026-11-04 검증). 화풍 자체를 바꾸려면 첨부 없이 텍스트로만 생성한다.

---

## 5. 검증 기록

| 날짜 | 테스트 파일 | 결과 |
|---|---|---|
| 2026-11-03 | `assets/test/fairy_base_sprite_test.png` | 기준 이미지와 동일 포즈 재현 성공. 워터마크 제거 확인. 흰 날개가 불투명 흰 판이 되는 문제 발견 → 규칙 4 추가 |
| 2026-11-03 | `assets/test/lobby_fairy_idle_A_test.png` | 포즈 변경 시 캐릭터 일관성 유지 확인. 날개 색조 지정으로 흰 판 문제 개선. 세이버 땅에 꽂기 포즈 미반영 → 규칙 3 추가. (테스트 포즈는 하품 자세로, 기획서 3.1의 낮잠 모션과 다르며 현재 POSE_IDLE_A로 대체됨) |
| 2026-11-03 | `assets/test/fairy_base_v2_test.png` | 원본 첨부 + 지시문으로 어깨 망토 제거 성공 (규칙 10). 단 텍스트로 지정한 날개 하늘색/눈 호박색이 무시되고 첨부 원본의 색을 따름 |
| 2026-11-03 | `assets/test/fairy_base_v3_test.png` | v2 첨부 + 지시문에 색 변경을 명시하자 날개 하늘색, 눈 호박색 반영 → 규칙 11 추가. 기준 이미지 v3로 확정 |
| 2026-11-03 | `assets/test/cutin_kael_test.png` | `fairy_base.png` 첨부 + 화풍 참고 지시문으로 다른 캐릭터를 같은 화풍으로 생성 성공. 이후 성별 변경 및 규칙 10으로 폐기 |
| 2026-11-04 | `assets/test/fairy_base_anime_A_test.png` | 일본 애니풍(모바일 가챠 일러스트) 화풍 전환 시도, `fairy_base.png` 첨부. 원본과 거의 동일하고 얼굴 인상만 약간 부드러워짐 → 규칙 11 보강 |
| 2026-11-04 | `assets/test/fairy_base_anime_A2/B/C/D_test.png` | 첨부 없이 텍스트만으로 애니풍 4종(가챠 일러스트 / TV 셀화 / 90년대 셀화 / 厚塗り) 생성. 화풍은 바뀌나 작가명 없는 묘사는 일반적인 그림체로 수렴하여 미채택. 디자인은 텍스트 블록만으로 대부분 유지, 단 D안은 등신이 낮아짐 |
| 2026-11-04 | `assets/test/fairy_base_softface_3d_test.png`, `_v2_test.png` | 첨부 + "얼굴 선 약화, 몸 그림자 강화" 지시. v2는 광원 방향까지 지정. 얼굴은 약간 부드러워졌으나 그림자 변화 없음 → 규칙 11 보강. `fairy_base_softface_3d_test.png`를 기준 이미지 v4로 채택 |
| 2026-11-10 | (카밀라 얼굴 테스트, 파일 미저장) | 동료가 나이 들어 보이는 원인을 STYLE_BASE가 아닌 IDENTITY 얼굴 묘사로 판단(주인공은 같은 STYLE로 합격). 성숙 인상 단어 제거 + 애니풍 FACE 블록 추가로 얼굴이 크게 개선됨 → 동료 FACE 블록 신설 |
| 2026-11-10 | `assets/test/cutin_camilla_outfit_test.png` | FACE 블록 + 판타지 각색 OUTFIT(오프숄더 미니 드레스, 니삭스 등). 요정다운 가벼운 복장으로 개선되어 채택 → 동료 원칙 1에 판타지 각색 추가. 날개 망토 지시는 미반영 |
| 2026-11-04 | (카스미 백뷰 테스트, 파일 미저장) | `cutin_kasumi.png` 첨부 시 몸은 정면 그대로 두고 고개만 돌아감. 텍스트에서 얼굴·정면 묘사를 지워도 동일 → 규칙 8 갱신 (정면 이미지 첨부 금지) |
| 2026-11-12 | `assets/test/fairy_battle_back_test.png` | 첨부 없이 백뷰 전용 블록(정면 요소 삭제, STYLE 얼굴 구절 삭제)으로 생성. 첫 시도에 얼굴·꺾인 목 없는 정상 뒷모습 성공. 단 가로형 비율, 위에서 본 각도·방향성 약함, 허리 반망토가 한쪽 짧은 천으로 생성 |
| 2026-11-12 | `assets/test/fairy_battle_back_v2_test.png` | 세로 3:4, 등 뒤 눈높이 카메라, 오른쪽 위 돌진 자세, 견장 강조. 방향성·역동성 개선. 단 공격 동작으로 읽혀 대기 일러스트 용도와 맞지 않음, 망토는 여전히 한쪽 천 |
| 2026-11-12 | `assets/characters/fairy/fairy_battle_back.png` | v3. 공중 제자리 준비 자세로 변경. 망토가 기준 이미지처럼 두 갈래 긴 반망토로 생성. 방향성은 v2보다 약하나 대기 일러스트로 적합하여 기준 백뷰로 확정 |

※ 위 테스트 이미지는 2026-11-03 정리 시 `assets/test/`에서 삭제되었다. `fairy_base_sprite_test.png`, `lobby_fairy_idle_A_test.png`는 커밋 `cd7268e`에서 확인할 수 있으며, 나머지는 커밋되지 않은 중간 결과물이다. 확정 이미지는 각 캐릭터 시트의 체크리스트 경로를 따른다.
