# 동료 페어리 11인 - 캐릭터 시트

- 저장 폴더: `assets/characters/partners/`
- 파일 규격: `cutin_[영문명].png` (VIEW_ILLUST), `battle_back_[영문명].png` (VIEW_BATTLE_BACK)
- 공통 블록(STYLE_BASE, VIEW, LAYER) 및 작업 규칙은 `docs/art_style_guide.md`를 따른다.
- 생성 순서: 동료마다 `cutin`을 먼저 확정하고, 이를 기준 이미지로 첨부하여 `battle_back`을 생성한다.

---

## 1. 외형 컨셉 원칙

1. **중세 판타지 직업:** 동료마다 중세 판타지에 있을 법한 직업 하나를 부여한다. 직업 간 중복은 피한다.
2. **스킬의 시각화:** 스킬 효과가 직업, 소품, 복장에서 바로 읽히도록 한다.
3. **날개 종류 전원 상이:** 전투 화면은 3인 백뷰이므로 날개 형태와 머리/모자 실루엣만으로 식별 가능해야 한다.
4. **등급 차등:** 5성은 4성보다 장식과 날개를 크고 화려하게 한다.
5. **공통 요정 특징:** 전원 길고 뾰족한 요정 귀. 블라드는 박쥐형 막날개를 가진 다른 요정 종족이다.

## 2. 동료 목록

| 동료 (영문명) | 등급 | 색상 / 속성 | 성별 / 체형 | 직업 | 스킬 연결 | 날개 | 백뷰 식별 포인트 |
|---|---|---|---|---|---|---|---|
| 카엘 (`kael`) | 5성 | 보라 / 심연 | 남 / 날렵 | 그림자 암살자 | 즉사 = 암살, 첫 Miss 무효 = 그림자 회피 | 짙은 보라 나방 | 깊은 후드, 찢어진 망토 자락 |
| 루미 (`lumi`) | 5성 | 황금 / 시간 | 여 / 작고 앳됨 | 시간술사 | 타이머 연장 = 모래시계 지팡이, 회중시계 | 톱니 문양 금빛 나비 | 양갈래 올림머리, 별 자수 망토 |
| 베른 (`bern`) | 5성 | 진홍 / 화염 | 남 / 장년, 거구 | 화염 대장장이 | 추가 피해 = 벼려낸 무기, 치명타 = 망치 일격 | 불씨 무늬 진홍 잠자리 | 어깨에 멘 거대 망치, 가죽 앞치마 끈 |
| 로제 (`rose`) | 4성 | 분홍 / 관통 | 여 / 늘씬 | 가시장미 궁수 | 관통 = 화살 | 장미 꽃잎형 나비 | 화살통, 높은 포니테일 |
| 블라드 (`vlad`) | 4성 | 암적 / 흡혈 | 남 / 마른 장신 | 흡혈 귀족 | 흡혈, 회복 = 크리스털 잔 | 검붉은 박쥐형 막날개 | 높은 깃 망토, 막날개 |
| 시안 (`cyan`) | 4성 | 하늘 / 질풍 | 여 / 가벼움 | 바람 항해사 | 판정 시간 = 순풍, 콤보 보존 = 나침반 | 길고 가는 하늘색 잠자리 | 삼각모, 휘날리는 긴 스카프 |
| 바란 (`baran`) | 4성 | 강철 / 수호 | 남 / 장년, 최대 거구 | 성기사 | 기절, 1회 생존 = 수호의 방패 | 강철색 딱정벌레 겉날개 | 투구 장식, 거대 방패 |
| 미라 (`mira`) | 4성 | 녹색 / 치유 | 여 / 단정 | 치유 사제 | 회복, 실드 = 약초와 잎사귀 지팡이 | 잎맥 녹색 날개 (나뭇잎벌레형) | 사제 베일, 땋은 머리 |
| 제이드 (`jade`) | 4성 | 비취 / 충전 | 여 / 활발 | 음유시인 | 피버 충전 = 연주로 사기 고양 | 비취색 풀잠자리 | 깃털 꽂은 베레모, 등에 멘 류트 |
| 레온 (`leon`) | 4성 | 빙청 / 빙결 | 남 / 냉정한 청년 | 빙결 마법사 | 결빙, 감속 = 얼음 마법 | 눈꽃 결정 무늬 나방 | 털 후드, 얼음 결정 지팡이 |
| 아이리스 (`iris`) | 4성 | 무지개 / 공명 | 여 / 우아 | 프리즘 정령술사 | 동료 에너지 주입 = 정령의 힘 분배 | 무지갯빛 모르포 나비 | 매우 긴 머리, 주위를 도는 프리즘 결정 |

---

## 3. 프롬프트 블록

블록 조합: `[LAYER_SPRITE_HEAD] + [VIEW] + [IDENTITY] + [OUTFIT] + [POSE] + [PALETTE] + [STYLE_BASE] + [LAYER_SPRITE_TAIL]`
- `cutin`: VIEW_ILLUST + POSE_CUTIN
- `battle_back`: VIEW_BATTLE_BACK + POSE_BATTLE_BACK (기준 이미지로 확정된 `cutin` 첨부)

### 3.1 카엘 (`kael`) - 그림자 암살자

**IDENTITY**
```
A lean and agile young male fairy, 7 heads tall. Sharp handsome features, cool narrow deep violet eyes, faint confident smirk, long pointed elf ears. Black hair with a single violet streak, falling over his forehead. Four large deep violet moth wings with dark eyespot patterns and silver-dusted edges.
```
**OUTFIT**
```
Wearing a fitted dark violet assassin leather armor with silver buckles, a deep hood, a lavender cloth mask pulled down around his neck, a black cloak with tattered edges, black leather bracers, dark breeches and soft black leather boots, belts lined with small throwing knives. Weapons: a pair of curved silver daggers with violet-wrapped grips.
```
**PALETTE**
```
Color palette: deep violet, black, silver, lavender.
```
**POSE_CUTIN**
```
Pose: lunging forward low toward the viewer with one curved dagger thrust out, the other dagger held in reverse grip behind him, cloak sweeping.
```
**POSE_BATTLE_BACK**
```
Pose: crouched ready facing away from the viewer toward the enemy, curved daggers in both hands, deep hood, tattered cloak and violet moth wings clearly visible.
```

### 3.2 루미 (`lumi`) - 시간술사

**IDENTITY**
```
A petite youthful girl fairy, 5 heads tall. Round curious golden eyes, cheerful confident smile, a brass monocle over one eye, long pointed elf ears. Honey-gold hair in two buns with short loose tails. Four golden butterfly wings with intricate clockwork gear filigree patterns, pale gold tinted.
```
**OUTFIT**
```
Wearing a short midnight blue mage robe embroidered with gold stars and constellations, a gold brocade vest over a pale yellow blouse, striped stockings and buckled brown shoes. Props: a staff topped with a large ornate brass hourglass with golden sand, and a brass pocket watch on a long gold chain at her waist.
```
**PALETTE**
```
Color palette: gold, brass, midnight blue, honey yellow.
```
**POSE_CUTIN**
```
Pose: floating in mid-air raising the hourglass staff high with one hand, holding up the open pocket watch toward the viewer with the other, cheerful wink.
```
**POSE_BATTLE_BACK**
```
Pose: floating facing away from the viewer toward the enemy, hourglass staff held up, star-embroidered robe, hair buns and golden gear-patterned wings clearly visible.
```

### 3.3 베른 (`bern`) - 화염 대장장이

**IDENTITY**
```
A tall, burly, broad-shouldered middle-aged male fairy, 7.5 heads tall. Rugged soot-smudged face with a short fiery red beard and thick sideburns, a scar across one cheek, bold grin, amber eyes, long pointed elf ears. Short fiery red hair. Four large crimson dragonfly wings with ember orange spots.
```
**OUTFIT**
```
Wearing a sleeveless crimson work tunic, a heavy dark brown leather blacksmith apron with brass rivets, thick leather gloves and bracers, dark grey trousers and heavy boots, a tool belt with tongs and chisels. Weapon: a huge two-handed forge hammer with a black iron head engraved with ember orange runes.
```
**PALETTE**
```
Color palette: crimson red, dark brown leather, black iron, ember orange, dark grey.
```
**POSE_CUTIN**
```
Pose: swinging the huge forge hammer overhead in both hands, about to strike down toward the viewer, shouting a battle cry.
```
**POSE_BATTLE_BACK**
```
Pose: standing ready facing away from the viewer toward the enemy, huge forge hammer resting on his shoulder, apron straps crossing his back and crimson dragonfly wings clearly visible.
```

### 3.4 로제 (`rose`) - 가시장미 궁수

**IDENTITY**
```
A tall and elegant female fairy, 7 heads tall. Confident smile, rose pink eyes, long pointed elf ears. Long wavy rose pink hair in a high ponytail. Four layered rose-petal shaped butterfly wings in shades of pink and deep magenta.
```
**OUTFIT**
```
Wearing a fitted deep rose ranger tunic with gold trim, a short magenta hooded capelet, a leather chest guard, dark charcoal leggings and tall brown leather boots, a brown leather quiver of rose-fletched arrows on her back. Weapon: an elegant longbow carved like a thorned rose vine with a pink rose ornament.
```
**PALETTE**
```
Color palette: rose pink, deep magenta, gold, charcoal, brown leather.
```
**POSE_CUTIN**
```
Pose: drawing the thorned longbow at full draw aimed toward the viewer, one eye narrowed, ponytail swinging.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, drawing the longbow, quiver on her back, high ponytail and rose-petal wings clearly visible.
```

### 3.5 블라드 (`vlad`) - 흡혈 귀족

**IDENTITY**
```
A slender, tall, pale aristocratic male fairy, 7.5 heads tall. Sharp handsome face, crimson eyes, sly smirk showing small fangs, long pointed elf ears. Slicked-back black hair with dark red tips. Two large dark crimson bat-like membrane wings with delicate fairy-like ribs, opaque.
```
**OUTFIT**
```
Wearing a high-collared dark blood red noble coat with black velvet lapels and a ruby brooch, dark grey waistcoat, black silk cravat, black gloves, black trousers and polished black boots, a long black cape lined with crimson. Props: a crystal goblet filled with dark red liquid and an ebony cane sword with a ruby pommel.
```
**PALETTE**
```
Color palette: blood red, black, dark grey, ruby.
```
**POSE_CUTIN**
```
Pose: raising the crystal goblet in an elegant toast toward the viewer with a sly smirk, other hand drawing the cane sword halfway.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, cane sword in hand, high collar, long crimson-lined cape and spread bat-like membrane wings clearly visible.
```

### 3.6 시안 (`cyan`) - 바람 항해사

**IDENTITY**
```
A slim and agile female fairy, 6.5 heads tall. Energetic grin, bright sky blue eyes, long pointed elf ears. Short tousled sky blue hair. Four long and narrow swift-shaped dragonfly wings, pale sky blue tinted.
```
**OUTFIT**
```
Wearing a sky blue navigator coat with silver buttons and rolled sleeves, a navy tricorn hat with a sky blue feather, a very long flowing scarf in sky blue and navy stripes, a brown leather vest, navy breeches and light brown boots. Props: a brass navigation compass on a chain and a brass spyglass.
```
**PALETTE**
```
Color palette: sky blue, navy, silver, brass, brown leather.
```
**POSE_CUTIN**
```
Pose: dashing forward through the air leaning into the wind, pointing ahead with the brass spyglass, holding the compass in the other hand, long scarf streaming behind her.
```
**POSE_BATTLE_BACK**
```
Pose: hovering facing away from the viewer toward the enemy, spyglass raised in one hand, tricorn hat, long striped scarf streaming and long narrow dragonfly wings clearly visible.
```

### 3.7 바란 (`baran`) - 성기사

**IDENTITY**
```
A very tall and massive middle-aged male fairy, 8 heads tall, the largest of the party. Stoic calm face, steel grey eyes, short grey beard, long pointed elf ears. Short grey hair. Wings: a pair of hard dark steel blue beetle elytra shells, partially open, with smaller smoke grey membrane wings beneath.
```
**OUTFIT**
```
Wearing heavy polished steel paladin plate armor with brass trim, a dark blue tabard with a gold fairy crest, a steel great helm with a brass crest and a dark blue plume, a dark blue cape, steel gauntlets and sabatons. Weapons: a huge rectangular steel tower shield with a brass rim and an engraved fairy crest, and a heavy flanged mace at his hip.
```
**PALETTE**
```
Color palette: steel grey, dark blue, brass, gold.
```
**POSE_CUTIN**
```
Pose: bracing the huge tower shield forward toward the viewer in a firm defensive stance, steady determined gaze over the shield rim.
```
**POSE_BATTLE_BACK**
```
Pose: standing firm facing away from the viewer toward the enemy, huge tower shield raised on his arm, plumed great helm, dark blue cape and beetle elytra wings clearly visible.
```

### 3.8 미라 (`mira`) - 치유 사제

**IDENTITY**
```
A gentle and calm female fairy, 7 heads tall. Soft kind smile, soft green eyes, long pointed elf ears. Long leaf green hair in a single braid. Four green leaf-insect wings with detailed leaf vein patterns.
```
**OUTFIT**
```
Wearing a healer priestess robe in deep forest green with a sage green veil, a light mint green stole embroidered with a golden herb leaf emblem, a brown leather herb satchel with small glass potion bottles. Prop: a wooden staff topped with sprouting green leaves.
```
**PALETTE**
```
Color palette: forest green, mint green, sage, brown leather, gold.
```
**POSE_CUTIN**
```
Pose: holding the leaf-topped staff forward with a gentle smile, other hand offering a small potion bottle toward the viewer.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, leaf-topped staff held upright, sage green veil, long braid, herb satchel and green leaf wings clearly visible.
```

### 3.9 제이드 (`jade`) - 음유시인

**IDENTITY**
```
A lively and mischievous female fairy, 6 heads tall. Big playful grin, jade green eyes, freckles, long pointed elf ears. Jade green bob haircut with straight bangs. Four jade tinted lacewing wings with fine net-like veins.
```
**OUTFIT**
```
Wearing a colorful bard outfit: a jade green doublet with gold embroidery and puffed sleeves, a dark brown short cape, a jade green beret with a long gold feather, dark brown trousers and pointed soft boots. Prop: a lute with a jade green painted body and gold inlay.
```
**PALETTE**
```
Color palette: jade green, gold, dark brown.
```
**POSE_CUTIN**
```
Pose: strumming the lute energetically while leaning forward toward the viewer, singing with a big grin, one foot kicked up.
```
**POSE_BATTLE_BACK**
```
Pose: hovering facing away from the viewer toward the enemy, strumming the lute, feathered beret, short cape and lacewing wings clearly visible.
```

### 3.10 레온 (`leon`) - 빙결 마법사

**IDENTITY**
```
A cool and aloof young male fairy, 7 heads tall. Calm expressionless face, ice blue eyes, long pointed elf ears. Messy frosty pale blue hair. Four moth wings with snowflake crystal patterns, pale ice blue tinted.
```
**OUTFIT**
```
Wearing a long ice blue frost mage robe with dark navy trim and silver snowflake embroidery, a fur-lined hood in ice blue tinted fur, dark navy gloves and fur-trimmed boots. Prop: a tall staff of pale blue ice crystal with a sharp crystal cluster at the top.
```
**PALETTE**
```
Color palette: ice blue, dark navy, silver, pale cyan.
```
**POSE_CUTIN**
```
Pose: thrusting the ice crystal staff forward toward the viewer with one hand, the other hand raised with fingers spread casting a spell, calm and focused.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, ice crystal staff raised, fur-lined hood and snowflake-patterned moth wings clearly visible.
```

### 3.11 아이리스 (`iris`) - 프리즘 정령술사

**IDENTITY**
```
A graceful and serene female fairy, 7 heads tall. Gentle calm expression, iridescent violet blue eyes, long pointed elf ears. Very long flowing pastel lavender hair with iridescent highlights. Four large morpho butterfly wings with an iridescent blue sheen shifting into rainbow hues at the edges.
```
**OUTFIT**
```
Wearing an elegant elementalist dress robe: a fitted lavender blue bodice with gold trim over a long layered skirt in soft gradient rainbow hues, a gold circlet set with a prism crystal, gold bracelets. Props: several small faceted prism crystals in rainbow colors floating in a circle around her.
```
**PALETTE**
```
Color palette: lavender blue, iridescent rainbow accents, gold.
```
**POSE_CUTIN**
```
Pose: floating with both arms open gracefully, guiding the circle of prism crystals around her, eyes gently closed, hair and skirt flowing softly.
```
**POSE_BATTLE_BACK**
```
Pose: floating facing away from the viewer toward the enemy, arms spread with prism crystals circling her, very long lavender hair and large morpho wings clearly visible.
```

---

## 4. 에셋 체크리스트

상태: `미생성` / `테스트` / `확정`. 확정 시 채택된 이미지를 만든 최종 프롬프트 전문을 기록한다.

| 동료 | `cutin_[영문명].png` (VIEW_ILLUST) | `battle_back_[영문명].png` (VIEW_BATTLE_BACK) |
|---|---|---|
| 카엘 | 미생성 | 미생성 |
| 루미 | 미생성 | 미생성 |
| 베른 | 미생성 | 미생성 |
| 로제 | 미생성 | 미생성 |
| 블라드 | 미생성 | 미생성 |
| 시안 | 미생성 | 미생성 |
| 바란 | 미생성 | 미생성 |
| 미라 | 미생성 | 미생성 |
| 제이드 | 미생성 | 미생성 |
| 레온 | 미생성 | 미생성 |
| 아이리스 | 미생성 | 미생성 |
