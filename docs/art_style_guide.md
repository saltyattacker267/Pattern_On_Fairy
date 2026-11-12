# 패턴 온 페어리 - 아트 스타일 가이드 (Asset Prompt Guide)

`asset_bridge.py`로 에셋을 생성할 때 사용하는 프롬프트 블록 모음이다.
실행 규칙(순차 실행, 명령어 형식 등)은 `CLAUDE.md`의 Asset Bridge Protocol을 따르고, 이 문서는 프롬프트에 들어갈 **내용(데이터)** 만 관리한다.

---

## 1. 프롬프트 조합 순서

### 1.1 캐릭터/몬스터 스프라이트 (`--rembg` 사용)
```
[LAYER_SPRITE_HEAD] + [VIEW] + [캐릭터 IDENTITY] + [FACE] + [캐릭터 OUTFIT] + [POSE] + [PALETTE] + [STYLE_BASE] + [LAYER_SPRITE_TAIL]
```
- `[FACE]`는 동료 캐릭터 시트(`docs/art_prompts/partners.md` 3장)의 FACE 블록을 쓴다. 주인공은 IDENTITY에 얼굴 묘사가 포함되어 있고, 몬스터/보스와 장년 컨셉 동료는 생략한다. `VIEW_BATTLE_BACK` 에셋은 얼굴이 보이지 않아야 하므로 FACE 블록을 넣지 않는다 (2026-11-11 추가: FACE 블록이 고개를 돌려 얼굴을 보이게 만드는 원인으로 판단).

### 1.1.1 전투 백뷰 스프라이트 (`--rembg` 사용, 2026-11-12 추가)
- 주인공 기준 백뷰 (`fairy_battle_back.png` v3, 확정 당시 조합. 재생성하지 않으며 기록용):
```
[LAYER_SPRITE_HEAD] + [VIEW_BATTLE_BACK] + [캐릭터 IDENTITY_BACK] + [캐릭터 OUTFIT_BACK] + [POSE_BATTLE_BACK] + [PALETTE] + [STYLE_BASE_BACK] + [LAYER_SPRITE_TAIL]
```
- 동료 백뷰 (2026-11-12 갱신, 5블록 구조, 첨부 없음):
```
[Block 1: LAYER_BACK_HEAD + VIEW_BATTLE_BACK_PARTNER] + [Block 2: POSE_BATTLE_BACK (무기 포함)] + [Block 3: IDENTITY_BACK] + [Block 4: OUTFIT_BACK (무기 제외)] + [Block 5: PALETTE + STYLE_BASE_BACK + LAYER_BACK_TAIL]
```
  - 이미지 모델은 앞부분에 가중치를 두므로 자세(Block 2)를 외형·의상보다 앞에 둔다. 자세를 뒤에 둔 기존 조합에서는 자세 지시가 계속 무시되었고, 앞으로 옮기자 반영되었다 (2026-11-12 `battle_back_kasumi.png` 2차).
  - 무기는 OUTFIT_BACK에 따로 선언하지 않고 Block 2에서 쥐고 있는 손과 한 문장으로 묘사한다 (예: `Right hand gripping a short straight ninjato (violet-wrapped grip, square guard) ...`).
  - 작성 원칙과 생성 전 점검은 규칙 12를 따른다.
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
| `battle_back_[동료영문명].png` | 전투 (2.5D 백뷰) | VIEW_BATTLE_BACK_PARTNER | 동료 IDENTITY_BACK, OUTFIT_BACK, STYLE_BASE_BACK | POSE_BATTLE_BACK (동료별 고유 준비 자세) |
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
  - 2026-11-11 보강: `battle_back_kasumi.png` 1차 시험에서 몸은 오른쪽을 향하고 고개는 어깨 너머로 돌려 옆얼굴이 보이는 구도로 생성됨 → 몸·머리 방향 일치와 얼굴 비노출 문장 추가. 2차에서 얼굴은 가려졌으나 몸이 오른쪽 위 대각선을 향함 → `Rear three-quarter back view`를 `Rear back view`로 바꾸고 몸·머리를 화면 위쪽으로 곧게 향하게 하는 문장으로 교체. 3차에서 방향은 맞았으나 몸통·팔이 날개 위에 그려져 날개가 가슴 쪽에 달린 정면 구도의 앞뒤 관계가 됨 → 날개가 견갑골 사이에서 나와 등 위(보는 사람 쪽)에 겹쳐 그려지도록 하는 문장 추가. (2026-11-12: 이 시험 블록은 위 블록으로 대체됨. 규칙 8 참조)
- **VIEW_BATTLE_BACK_PARTNER** (동료 백뷰 전용, 2026-11-12 추가)
  ```
  Low-angle from behind and slightly to her left, rear back view.
  ```
  - 카메라 시점을 한 문장으로 확정한다. 기존 VIEW_BATTLE_BACK은 `Rear three-quarter`, `camera directly behind`, 몸 방향(`angled toward upper right`)을 한 블록에 섞어 시점이 모순되었고, 측면 구도·옆얼굴 노출의 원인으로 판단했다. 몸이 향하는 방향(오른쪽 위의 적)은 Block 2 자세 문장에서 지정한다.
  - 남성 동료는 `her`를 `his`로 바꾼다.
  - 기존 규정은 낮은 앵글을 피했으나(위 VIEW_BATTLE_BACK 참고), 이 블록으로 생성한 카스미 2차에서 밑창·턱 노출 문제가 없어 채택했다. 문제가 생기면 `Eye-level from behind`로 바꾼다.
- **VIEW_MONSTER** (몬스터/보스, 3×3 노드 앵커 매핑용)
  ```
  Orthographic 2D front view, facing the viewer directly, symmetrical framing.
  ```

### LAYER_SPRITE_TAIL (스프라이트 끝부분)
```
isolated on solid white background
```

### LAYER_BACK_HEAD / LAYER_BACK_TAIL (동료 백뷰 전용 앞·끝부분, 2026-11-12 추가)
```
Full body character illustration, vertical 3:4 portrait composition, entire figure inside the frame from head to feet, centered, isolated on solid white background.
```
```
No text, no letters, no watermark, no borders, no ground shadow, no background effects.
```
- LAYER_SPRITE_HEAD/TAIL과 내용은 같고 순서만 다르다. 흰 배경 문장을 앞으로, 화면 구성 금지 문장을 끝으로 옮겼다. 금지 문장은 Gemini 웹에 네거티브 입력란이 없어 남겨 두며, 지금까지 문제를 일으킨 적이 없다.

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
     - 날개 캐릭터는 뒤에 `Do not copy the wings of the attached image; draw the wings exactly as described in the text.`를 붙인다. (2026-11-11 추가: 카탈리나·셰헤라자드 컷인에서 날개가 첨부한 주인공 날개의 연한 색·기하학 선 무늬를 따라 생성됨)
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
   - **동료 백뷰 (2026-11-12 갱신):** 첨부 없이 1.1.1 동료 5블록 구조의 텍스트로만 생성한다. 주인공 백뷰는 여유로운 대기 자세를 유지하는 예외로 두고, 동료는 각자 고유한 역동적 준비 자세로 차별화한다 (사용자 결정).
     - 이전 방식(`fairy_battle_back.png` 첨부 + 구도·화풍만 따르라는 지시문)은 색·의상 번짐 없이 각도·크기가 통일되었으나, 자세가 기준 백뷰를 그대로 따랐다. `Do not copy the pose` 문장 추가, 같은 채팅에서 자세만 고치는 2단계 편집 모두 실패했다(편집은 다리만 바뀜). 날개 모양도 기준 백뷰를 따라가 별도 문장이 필요했다(에이다 1차). 이 방식으로 확정한 `battle_back_ada.png`는 재생성 대상이다.
     - 텍스트 전용은 처음(카스미, 자세를 뒤에 둔 옛 조합)에는 품질이 낮아 미채택했으나, 5블록 구조에서는 첨부 방식과 대등한 품질이 나왔다.
     - 텍스트 전용이라 캐릭터 크기가 동료마다 다를 수 있다. 렌더링 배율로 맞춘다.
   - **자세:** 전투 백뷰는 공격 명령이 내려오기 전의 준비 상태다. 이미 움직이는 동작(돌진, 베기, 휘두르기)이 아니라, 몸은 멈춰 있지만 근육이 압축되어 언제든 튀어나갈 수 있는 정지된 긴장 상태로 쓴다 (2026-11-12 사용자 정의). 주인공 백뷰만 여유로운 대기 자세다.
9. **모션은 단일 대표 자세로 생성:** 프로토타입은 모션당 이미지 1장 + Canvas 절차적 모션으로 구현한다(기획서 1.3). 프레임 연속 이미지를 만들지 않고, 정지 상태에서도 동작이 한눈에 읽히는 대표 자세 1장으로 생성한다.
10. **날개 캐릭터 망토 금지:** 날개가 있는 캐릭터(주인공, 동료 등)는 어깨나 목에서 늘어져 등 위쪽(날개 뿌리)을 덮는 망토/클로크/케이프를 착용하지 않는다. 날개 뿌리와 겹쳐 설정상 어색하고, 백뷰에서 날개와 망토가 서로를 가려 식별성이 떨어진다.
   - 휘날리는 천이 필요하면 대체 수단을 쓴다: 허리 반망토(허리 뒤에서 흘러내리는 천), 코트 자락, 스카프/리본/장식끈, 몸에 맞는 로브.
   - 망토 같은 실루엣이 필요한 컨셉은 별도 망토 대신 **날개로 표현**한다 (예: 카밀라의 박쥐 막날개를 어깨에 망토처럼 두름). 불투명한 막날개처럼 천으로 읽힐 수 있는 날개에만 사용한다. 단, 2026-11-10 카밀라 생성에서 "날개를 어깨에 망토처럼 두름" 지시가 2회 연속 반영되지 않고 날개가 등 뒤로 펼쳐졌다. 생성 모델이 잘 따르지 않는 지시이므로 기대하지 않는다.
   - 날개 캐릭터의 OUTFIT 블록 끝에는 `No cape or cloak on the shoulders, wings fully visible.`를 포함한다. 단 동료 OUTFIT_BACK은 규칙 12에 따라 부정문을 쓰지 않으며, 등 위쪽을 덮을 소지가 있는 의상(털 조끼, 베일 등)만 `upper back left clear around the wing roots, wings fully visible`처럼 긍정문으로 쓴다.
   - 캐릭터 시트의 "등 처리" 칸에 캐릭터별 처리 방식을 명시하고, 프롬프트 작성 후 `cape`/`cloak` 키워드를 검색해 허용된 표현(허리 반망토, 날개 망토, 금지 문장) 외에 남아 있지 않은지 확인한다.
   - 날개가 없는 몬스터/보스에는 적용하지 않는다.
11. **첨부 이미지 색 우선 현상:** 기준 이미지를 첨부하면 첨부 이미지의 색이 텍스트 프롬프트의 색 지정보다 우선한다. 기준 이미지와 다른 색을 원하면 지시문에 `recolor <부위> to <색> (not <기존 색>)` 형태로 변경 사항을 명시한다.
   - 그림체와 조명도 같다. 첨부 이미지가 있으면 Gemini는 원본을 편집하는 방식으로 처리하여, 화풍 변경·그림자 강화 지시는 거의 반영되지 않는다 (2026-11-04 검증). 화풍 자체를 바꾸려면 첨부 없이 텍스트로만 생성한다.
12. **동료 백뷰 자세 프롬프트 작성 원칙 (2026-11-12 추가):** 사용자가 외부 AI로 정리한 전투 준비 자세 매뉴얼을 Gemini 환경에 맞게 반영했다.
   - **장면을 끌고 오는 비유 금지:** `like a sprinter`, `starting signal`, `explode` 등 다른 장면·직업·사건을 떠올리게 하는 비유는 쓰지 않는다 (육상 트랙, 폭발 이펙트가 생성될 위험). 근육의 긴장, 관절 각도, 무게 중심 같은 물리 상태로 쓴다. 물리 상태를 설명하는 비유(`legs compressed like a loaded spring`)는 허용한다.
   - **카메라 시점은 하나로:** 시점은 Block 1에서 한 문장으로 확정하고(VIEW_BATTLE_BACK_PARTNER), 그 시점에서 보이는 부위만 묘사한다.
   - **무기는 손과 결합:** 무기 디자인을 별도 문장(`Weapons: ...`)으로 두지 않고, 쥐고 있는 손 동작 문장 안에 넣는다.
   - **가림 현상에 물리적 근거:** 뒤쪽 요소를 보여주려면 가리는 천에 이유를 준다(`parted in the middle`, 바람에 휘날림 등). 덮는다고 쓴 부위의 세부를 따로 묘사하지 않는다.
   - **부정어 최소화:** Gemini 웹에는 네거티브 입력란이 없으므로, 부정문은 분리하는 대신 긍정문으로 바꾼다 (`not attacking yet` → 현재 하고 있는 동작만 서술). 화면 구성 금지 문장(LAYER_BACK_TAIL)은 예외로 유지한다.
   - **생성 전 점검 (QA):**
     - [ ] 장면을 끌고 오는 비유나 직업명(선수, 스나이퍼 등)이 없는가?
     - [ ] 무기 묘사가 쥐고 있는 손의 동작과 한 문장으로 결합되어 있는가?
     - [ ] LAYER_BACK_TAIL 외에 `no`, `not`, `without`이 없는가?
     - [ ] 머리카락·천·날개의 흔들림 정도가 자세의 긴장 상태와 일치하는가? (정지된 긴장 = 가벼운 흔들림, 격렬한 휘날림은 이미 움직이는 동작으로 읽힘)
     - [ ] `face`, `eyes`, `smile` 등 얼굴 관련 단어가 없는가? (1.1.1)

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
| 2026-11-11 | `cutin_scheherazade.png`, `cutin_catalina.png` | 기준 이미지(`fairy_base.png`) 첨부 시 날개가 주인공 날개의 연한 색·기하학 선 무늬를 따라 생성됨 → 규칙 1에 날개 캐릭터용 문장 추가. 이후 `cutin_aleksei.png`, `cutin_daon.png`에서 날개가 텍스트대로 생성되어 효과 확인 |
| 2026-11-11 | `assets/test/battle_back_kasumi_v3_test.png` | 컷인 첨부 백뷰 시험 3회 실패: 옆얼굴 노출 → 대각선 방향 → 방향은 맞으나 날개가 몸 뒤에 가려진 정면식 앞뒤 관계. VIEW_BATTLE_BACK 보강 및 battle_back FACE 블록 제외. 보강한 블록(날개 앞뒤 관계 문장 포함)은 미검증이며, 다음 세션에 백뷰 접근 방식을 처음부터 재검토 |
| 2026-11-12 | `assets/test/fairy_battle_back_test.png` | 첨부 없이 백뷰 전용 블록(정면 요소 삭제, STYLE 얼굴 구절 삭제)으로 생성. 첫 시도에 얼굴·꺾인 목 없는 정상 뒷모습 성공. 단 가로형 비율, 위에서 본 각도·방향성 약함, 허리 반망토가 한쪽 짧은 천으로 생성 |
| 2026-11-12 | `assets/test/fairy_battle_back_v2_test.png` | 세로 3:4, 등 뒤 눈높이 카메라, 오른쪽 위 돌진 자세, 견장 강조. 방향성·역동성 개선. 단 공격 동작으로 읽혀 대기 일러스트 용도와 맞지 않음, 망토는 여전히 한쪽 천 |
| 2026-11-12 | `assets/characters/fairy/fairy_battle_back.png` | v3. 공중 제자리 준비 자세로 변경. 망토가 기준 이미지처럼 두 갈래 긴 반망토로 생성. 방향성은 v2보다 약하나 대기 일러스트로 적합하여 기준 백뷰로 확정 |
| 2026-11-12 | `assets/characters/partners/battle_back_kasumi.png` | `fairy_battle_back.png` 첨부 + 구도·화풍만 따르라는 지시문. 색·의상 번짐 없음, 각도·크기 통일. 단 자세가 주인공과 거의 동일하고 웅크림 지시 미반영 → 규칙 8 동료 백뷰 항목 갱신 |
| 2026-11-12 | (카스미 백뷰 텍스트 전용, 파일 미저장) | 같은 블록에서 첨부 문장만 삭제. 사용자 판단으로 첨부 결과보다 품질이 낮아 미채택 |
| 2026-11-12 | `assets/characters/partners/battle_back_ada.png` | 1차: 날개가 기준 백뷰의 잠자리형 모양을 따라감(색·문양만 에이다 것). 2차: 지시문에 날개 문장 추가 + 나비 날개 형태 구체화로 나비 날개 생성, 확정 → 규칙 8 동료 백뷰 항목 보강 |
| 2026-11-12 | `assets/test/battle_back_kasumi_pose_test.png` | 지시문의 따를 항목에서 `hovering stance` 삭제, `pose`를 다른 항목에 추가, `Do not copy the pose of the attached image; draw the pose exactly as described in the text.` 추가. 결과는 확정본과 거의 동일한 자세(웅크림 미반영) → 날개와 달리 자세는 문장으로 풀리지 않음 |
| 2026-11-12 | `assets/test/battle_back_kasumi_pose_edit_test.png` | 위 결과를 만든 채팅에서 이어서 "자세만 변경" 편집 요청 (2단계 편집). 다리만 바뀜: 무릎을 굽혀 접어 올리고 발바닥이 보이는 자세. 상체 기울임·팔 뻗기·칼 방향은 미반영(상체는 원본과 동일). 다리가 짧아진 만큼 하단 여백이 생김. 얼굴 노출·의상 변형 없음 |
| 2026-11-12 | `assets/test/fairy_battle_back_dynamic_test.png` | 사용자가 외부 팁으로 재구성한 텍스트 전용 프롬프트(자세 블록을 맨 앞으로, 부정어 삭제, 반망토를 갈라 다리 노출, 압축된 상체·비대칭 팔다리·격렬한 휘날림). 자세가 크게 바뀌어 역동성 확보, 디자인 일관성 유지. 단 몸이 오른쪽 측면을 향해 옆얼굴 윤곽이 보이고, 휘날림 표현 때문에 대기가 아닌 공격 동작으로 읽힘. 배경 미제거 원본 |
| 2026-11-12 | `assets/test/fairy_battle_back_v4_test.png` | 위 프롬프트에서 움직임 표현을 정지된 긴장(`held perfectly still`, 출발 신호 직전의 Set 자세 비유)으로 교체, 방향을 `Back view from behind and slightly to her left ... facing into the screen`으로 수정. 방향이 화면 안쪽(오른쪽 위)으로 돌아오고 망토·머리가 차분해져 정지 상태로 읽힘. 크라우칭 스타트 오해 없음. 단 칼끝이 오른쪽 아래를 향하고 왼팔이 왼쪽 옆으로 뻗어 적을 겨누는 긴장감이 약함 |
| 2026-11-12 | `assets/test/battle_back_kasumi_v4style_test.png` | 사용자 결정: 주인공은 v3 유지, 동료만 역동적 준비 자세. 첨부 없이 사용자가 외부 매뉴얼 원칙(자세 최상단, 무기+손 결합, 비유·부정어 최소화, 단일 카메라 시점)으로 작성한 프롬프트로 생성 (전문은 partners.md 카스미 기록). `battle_back_kasumi.png`로 교체 확정. 고유 자세(쿠나이를 어깨 높이로 치켜듦, 닌자도 낮게) 반영, 주인공과 다른 실루엣 확보, 얼굴 비노출. 품질은 첨부 방식 확정본과 대등. 닌자도는 정방향 대신 역수로 생성, 등에 라벤더 X자 끈(타스키)이 임의 생성, 다리는 웅크림보다 도약에 가까움 |

※ 위 테스트 이미지는 2026-11-03 정리 시 `assets/test/`에서 삭제되었다. `fairy_base_sprite_test.png`, `lobby_fairy_idle_A_test.png`는 커밋 `cd7268e`에서 확인할 수 있으며, 나머지는 커밋되지 않은 중간 결과물이다. 확정 이미지는 각 캐릭터 시트의 체크리스트 경로를 따른다.
