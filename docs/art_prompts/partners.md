# 동료 페어리 11인 - 캐릭터 시트

- 저장 폴더: `assets/characters/partners/`
- 파일 규격: `cutin_[영문명].png` (VIEW_ILLUST), `battle_back_[영문명].png` (VIEW_BATTLE_BACK)
- 공통 블록(STYLE_BASE, VIEW, LAYER) 및 작업 규칙은 `docs/art_style_guide.md`를 따른다.
- 생성 순서: 동료마다 `cutin`을 먼저 확정하고, 이를 기준 이미지로 첨부하여 `battle_back`을 생성한다.

---

## 1. 외형 컨셉 원칙

1. **직업 + 문화권 복식 모티프:** 동료마다 판타지 직업 하나와 실제 역사·문화권의 복식 모티프 하나를 부여한다 (주인공 = 프랑스 경기병). 모티프는 두루뭉술하게 쓰지 않고 고유 복식·소품 명칭(오비, 카프탄, 코코시닉, 호플론 등)을 프롬프트에 직접 써서 컨셉을 극대화한다. 직업과 모티프는 서로 중복되지 않게 하며, 실제 신앙의 성물은 소품으로 쓰지 않는다.
2. **스킬의 시각화:** 스킬 효과가 직업, 소품, 복장에서 바로 읽히도록 한다.
3. **날개 종류 전원 상이:** 전투 화면은 3인 백뷰이므로 날개 형태와 머리/모자 실루엣만으로 식별 가능해야 한다.
4. **등급 차등:** 5성은 4성보다 장식과 날개를 크고 화려하게 한다.
5. **공통 요정 특징:** 전원 길고 뾰족한 요정 귀. 카밀라는 박쥐형 막날개를 가진 다른 요정 종족이다.
6. **성비:** 캐릭터 수집형 게임 특성을 고려하여 여성 9 : 남성 2 (남성: 아이아스, 알렉세이).
7. **망토 금지 (가이드 규칙 10):** 어깨/목에서 늘어지는 망토 대신 "등 처리" 칸의 방식으로 표현한다.

## 2. 동료 목록

| 동료 (영문명) | 등급 | 색상 / 속성 | 성별 / 체형 | 직업 | 복식 모티프 | 스킬 연결 | 날개 | 등 처리 | 백뷰 식별 포인트 |
|---|---|---|---|---|---|---|---|---|---|
| 카스미 (`kasumi`) | 5성 | 보라 / 심연 | 여 / 날렵 | 그림자 암살자 | 일본 쿠노이치 | 즉사 = 암살, 첫 Miss 무효 = 그림자 회피 | 짙은 보라 나방 | 허리 뒤 긴 오비 띠 (찢어진 검은 천) | 보라 브릿지 긴 포니테일, 찢어진 오비 띠 |
| 에이다 (`ada`) | 5성 | 황금 / 시간 | 여 / 작고 앳됨 | 시간술사 | 빅토리아 시대 시계 장인 | 타이머 연장 = 모래시계 지팡이, 회중시계 | 톱니 문양 금빛 나비 | 연미복 자락, 버슬 스커트 | 양갈래 올림머리 + 황동 고글, 모래시계 지팡이 |
| 시그리드 (`sigrid`) | 5성 | 진홍 / 화염 | 여 / 근육질 장신 | 화염 대장장이 | 노르드(바이킹) 대장장이 | 추가 피해 = 벼려낸 무기, 치명타 = 망치 일격 | 불씨 무늬 진홍 잠자리 | 없음 (앞치마 끈) | 굵게 땋은 붉은 머리, 털 깃, 어깨에 멘 거대 망치 |
| 록사나 (`roxana`) | 4성 | 분홍 / 관통 | 여 / 늘씬 | 가시장미 궁수 | 페르시아 궁수 | 관통 = 화살 | 장미 꽃잎형 나비 | 허리 장식끈, 옆트임 카프탄 자락 | 터번형 모자 + 높은 포니테일, 화살통 |
| 카밀라 (`camilla`) | 4성 | 암적 / 흡혈 | 여 / 마른 장신 | 흡혈 귀족 | 동유럽 보야르 귀족 | 흡혈, 회복 = 크리스털 잔 | 검붉은 박쥐형 막날개 | 날개 망토 (막날개를 어깨에 두름) | 코코시닉 머리장식, 망토처럼 두른 막날개 |
| 카탈리나 (`catalina`) | 4성 | 하늘 / 질풍 | 여 / 가벼움 | 바람 항해사 | 대항해시대 스페인 갈레온 항해사 | 판정 시간 = 순풍, 콤보 보존 = 아스트롤라베 | 길고 가는 하늘색 잠자리 | 스카프 | 깃털 꽂은 모리온 투구, 휘날리는 긴 스카프 |
| 아이아스 (`aias`) | 4성 | 강철 / 수호 | 남 / 장년, 최대 거구 | 성기사 | 고대 그리스 호플리트 | 기절, 1회 생존 = 수호의 방패 | 강철색 딱정벌레 겉날개 | 프테루게스 (허리 아래 가죽 띠 치마) | 가로 볏 코린트식 투구, 거대 원형 방패 |
| 에이린 (`eirin`) | 4성 | 녹색 / 치유 | 여 / 단정 | 치유 사제 | 켈트 드루이드 | 회복, 실드 = 약초와 잎사귀 지팡이 | 잎맥 녹색 날개 (나뭇잎벌레형) | 몸에 맞는 로브 | 겨우살이 화관 + 짧은 베일, 땋은 머리 |
| 셰헤라자드 (`scheherazade`) | 4성 | 비취 / 충전 | 여 / 활발 | 음유시인 (무희) | 아랍 무희 | 피버 충전 = 춤과 심벌즈로 사기 고양 | 비취색 풀잠자리 | 머리띠 베일, 동전 허리 스카프 | 동전 머리띠 베일, 동전 허리 스카프, 하렘 팬츠 |
| 알렉세이 (`aleksei`) | 4성 | 빙청 / 빙결 | 남 / 냉정한 청년 | 빙결 마법사 | 제정 러시아 궁정 마법사 | 결빙, 감속 = 얼음 마법 | 눈꽃 결정 무늬 나방 | 긴 코트 자락 | 원통형 털모자, 털 장식 긴 코트, 얼음 결정 지팡이 |
| 다온 (`daon`) | 4성 | 무지개 / 공명 | 여 / 우아 | 프리즘 정령술사 | 한국 한복 선녀 | 동료 에너지 주입 = 정령의 힘 분배 | 무지갯빛 모르포 나비 | 팔에 걸친 비단 띠, 늘어진 옷고름 | 매우 긴 머리 + 화관, 색동 소매, 비단 띠, 주위를 도는 프리즘 결정 |

---

## 3. 프롬프트 블록

블록 조합: `[LAYER_SPRITE_HEAD] + [VIEW] + [IDENTITY] + [OUTFIT] + [POSE] + [PALETTE] + [STYLE_BASE] + [LAYER_SPRITE_TAIL]`
- `cutin`: VIEW_ILLUST + POSE_CUTIN (첨부: `fairy_base.png`, 지시문: 화풍 참고)
- `battle_back`: VIEW_BATTLE_BACK + POSE_BATTLE_BACK (첨부: 확정된 `cutin`, 지시문: 같은 캐릭터)

### 3.1 카스미 (`kasumi`) - 그림자 암살자 / 일본 쿠노이치

**IDENTITY**
```
A lean and agile young female fairy, 7 heads tall. Sharp beautiful features, cool narrow deep violet eyes, faint confident smirk, long pointed elf ears. Black hair with a single violet streak, tied in a long high ponytail. Four large deep violet moth wings with dark eyespot patterns and silver-dusted edges.
```
**OUTFIT**
```
Wearing a Japanese kunoichi (female ninja) outfit: a short dark violet kimono-style wrap top with sleeveless shoulders, fine black kusari chainmail mesh visible at the collar and upper arms, a black obi sash tied at the waist with a large bow knot at the back and long tattered black obi tails flowing down from the back of her waist, black tekko arm guards with silver plates over black fingerless gloves, a lavender face cloth mask pulled down around her neck and knotted at the side, dark violet short hakama-style shorts, black leg wraps with kyahan shin guards and black split-toe tabi boots, several kunai tucked into the obi. Weapons: a short straight ninjato with a violet-wrapped grip and a square guard, and a kunai. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: deep violet, black, silver, lavender.
```
**POSE_CUTIN**
```
Pose: lunging forward low toward the viewer with the ninjato held in reverse grip slashing out, the other hand flicking a kunai, ponytail and long obi tail sweeping.
```
**POSE_BATTLE_BACK**
```
Pose: crouched ready facing away from the viewer toward the enemy, ninjato in reverse grip, long black ponytail with violet streak, long tattered obi tail and violet moth wings with eyespots clearly visible.
```

### 3.2 에이다 (`ada`) - 시간술사 / 빅토리아 시대 시계 장인

**IDENTITY**
```
A petite youthful girl fairy, 5 heads tall. Round curious golden eyes, cheerful confident smile, brass clockmaker goggles with amber tinted lenses pushed up on her forehead, long pointed elf ears. Honey-gold hair in two buns with short loose tails. Four golden butterfly wings with intricate clockwork gear filigree patterns, pale gold tinted.
```
**OUTFIT**
```
Wearing a Victorian-era clockmaker outfit: a short midnight blue tailcoat jacket with brass gear-shaped buttons and gold star embroidery, coat tails at the back, a gold brocade waistcoat over a pale yellow high-collared blouse with a midnight blue ribbon bow tie, a brown leather tool apron with small pockets holding tiny screwdrivers and gears, a ruffled midnight blue bustle skirt, striped stockings and buckled brown boots. Props: a brass staff topped with a large ornate hourglass with golden sand encircled by brass orrery rings, and a brass pocket watch on a long gold chain at her waist. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: gold, brass, midnight blue, honey yellow, brown leather.
```
**POSE_CUTIN**
```
Pose: floating in mid-air raising the hourglass staff high with one hand, holding up the open pocket watch toward the viewer with the other, cheerful wink.
```
**POSE_BATTLE_BACK**
```
Pose: floating facing away from the viewer toward the enemy, hourglass staff held up, tailcoat tails and bustle skirt, hair buns with goggles and golden gear-patterned wings clearly visible.
```

### 3.3 시그리드 (`sigrid`) - 화염 대장장이 / 노르드(바이킹) 대장장이

**IDENTITY**
```
A tall, muscular, broad-shouldered female fairy in her thirties, 7.5 heads tall. Confident soot-smudged face with freckles, a small scar on one cheek, bold grin, amber eyes, long pointed elf ears. Fiery red hair in a thick braid. Four large crimson dragonfly wings with ember orange spots.
```
**OUTFIT**
```
Wearing a Norse Viking blacksmith outfit: a sleeveless crimson wool tunic with woven knotwork trim, a thick grey wolf fur collar around her neck fastened with bronze oval brooches, a heavy dark brown leather blacksmith apron with brass rivets, bronze arm rings and leather bracers engraved with Norse runes, dark grey trousers with cross-wrapped leg bindings and fur-lined boots, a tool belt with tongs and chisels. Weapon: a huge two-handed forge hammer with a black iron head engraved with ember orange Norse runes. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: crimson red, dark brown leather, black iron, ember orange, grey fur, bronze.
```
**POSE_CUTIN**
```
Pose: swinging the huge forge hammer overhead in both hands, about to strike down toward the viewer, shouting a battle cry.
```
**POSE_BATTLE_BACK**
```
Pose: standing ready facing away from the viewer toward the enemy, huge forge hammer resting on her shoulder, thick red braid, grey fur collar, apron straps crossing her back and crimson dragonfly wings clearly visible.
```

### 3.4 록사나 (`roxana`) - 가시장미 궁수 / 페르시아 궁수

**IDENTITY**
```
A tall and elegant female fairy, 7 heads tall. Confident smile, rose pink eyes, long pointed elf ears. Long wavy rose pink hair in a high ponytail. Four layered rose-petal shaped butterfly wings in shades of pink and deep magenta.
```
**OUTFIT**
```
Wearing a Persian Safavid-era archer outfit: a fitted deep rose silk kaftan coat embroidered with gold rose garden and arabesque patterns, split at the sides below the waist, magenta salwar trousers tucked into tall pointed brown leather boots, a gold-trimmed magenta sash with long flowing ends tied at the waist, a small rose turban-style cap with a gold jewel and a pink feather wrapped around the base of her high ponytail, a carved archer's thumb ring and a leather bracer, an ornate gold-tooled leather quiver of rose-fletched arrows on her back. Weapon: a recurved composite bow lacquered deep rose with gold rose motifs and thorned vine carvings. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: rose pink, deep magenta, gold, brown leather.
```
**POSE_CUTIN**
```
Pose: drawing the recurved bow at full draw aimed toward the viewer, one eye narrowed, ponytail and sash ends swinging.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, drawing the recurved bow, quiver on her back, turban-style cap with high ponytail, split kaftan hem and rose-petal wings clearly visible.
```

### 3.5 카밀라 (`camilla`) - 흡혈 귀족 / 동유럽 보야르 귀족

**IDENTITY**
```
A slender, tall, pale aristocratic female fairy, 7.5 heads tall. Sharp elegant beauty, crimson eyes, sly smile showing small fangs, long pointed elf ears. Long straight black hair with dark red tips. Two large dark crimson bat-like membrane wings with delicate fairy-like ribs, opaque, draped around her shoulders like a high-collared cloak.
```
**OUTFIT**
```
Wearing an Eastern European boyar noblewoman outfit: a long dark blood red brocade coat dress with gold thread embroidery and a high stiff collar trimmed with black sable fur, long hanging false sleeves slit open at the elbow, a row of ruby and gold buttons down the front, a black silk under-dress, a tall jeweled kokoshnik headdress in black and gold set with rubies and hanging garnet bead strands, long black gloves and black riding boots. Props: a crystal goblet filled with dark red liquid and an ebony cane sword with a ruby pommel. No separate cape; only her bat wings are draped around her shoulders.
```
**PALETTE**
```
Color palette: blood red, black, gold, ruby.
```
**POSE_CUTIN**
```
Pose: raising the crystal goblet in an elegant toast toward the viewer with a sly smile, other hand drawing the cane sword halfway, bat wings draped around her shoulders.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, cane sword in hand, tall kokoshnik headdress, long black hair, bat-like membrane wings spread wide from her shoulders clearly visible.
```

### 3.6 카탈리나 (`catalina`) - 바람 항해사 / 대항해시대 스페인 갈레온 항해사

**IDENTITY**
```
A slim and agile female fairy, 6.5 heads tall. Energetic grin, bright sky blue eyes, long pointed elf ears. Short tousled sky blue hair. Four long and narrow swift-shaped dragonfly wings, pale sky blue tinted.
```
**OUTFIT**
```
Wearing a 16th-century Spanish galleon navigator outfit: a fitted sky blue doublet with slashed puffed sleeves showing navy lining, a pale sky blue tinted pleated ruff collar, a brown leather jerkin, navy puffed trunk hose over sky blue stockings and folded-top light brown leather boots, a polished steel morion helmet with a curved crest and a sky blue plume, a very long flowing scarf in sky blue and navy stripes tied at the neck. Props: a brass astrolabe on a chain and a brass spyglass. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: sky blue, navy, polished steel, brass, brown leather.
```
**POSE_CUTIN**
```
Pose: dashing forward through the air leaning into the wind, pointing ahead with the brass spyglass, holding the astrolabe in the other hand, long scarf streaming behind her.
```
**POSE_BATTLE_BACK**
```
Pose: hovering facing away from the viewer toward the enemy, spyglass raised in one hand, plumed morion helmet, long striped scarf streaming and long narrow dragonfly wings clearly visible.
```

### 3.7 아이아스 (`aias`) - 성기사 / 고대 그리스 호플리트

**IDENTITY**
```
A very tall and massive middle-aged male fairy, 8 heads tall, the largest of the party. Stoic calm face, steel grey eyes, short grey beard, long pointed elf ears. Short grey hair. Wings: a pair of hard dark steel blue beetle elytra shells, partially open, with smaller smoke grey membrane wings beneath.
```
**OUTFIT**
```
Wearing ancient Greek hoplite armor: a polished steel muscled cuirass with brass trim over a dark blue linen chiton, a skirt of layered dark blue leather pteruges strips hanging from the waist to the knees, polished steel greaves on the shins and leather sandals, a polished steel Corinthian helmet with a tall dark blue horsehair transverse crest, pushed up on his head to show his face. Weapons: a huge round hoplon shield in polished steel with a raised brass rim and an embossed gold fairy crest, and a long spear with a steel tip. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: steel grey, dark blue, brass, gold.
```
**POSE_CUTIN**
```
Pose: bracing the huge round shield forward toward the viewer in a firm defensive stance, spear held upright behind it, steady determined gaze over the shield rim.
```
**POSE_BATTLE_BACK**
```
Pose: standing firm facing away from the viewer toward the enemy, huge round shield raised on his arm, spear in the other hand, transverse-crested Corinthian helmet, pteruges skirt and beetle elytra wings clearly visible.
```

### 3.8 에이린 (`eirin`) - 치유 사제 / 켈트 드루이드

**IDENTITY**
```
A gentle and calm female fairy, 7 heads tall. Soft kind smile, soft green eyes, long pointed elf ears. Long leaf green hair in a single braid. Four green leaf-insect wings with detailed leaf vein patterns.
```
**OUTFIT**
```
Wearing a Celtic druid priestess outfit: a long fitted deep forest green wool robe with woven gold Celtic knotwork borders, a crown of mistletoe with pale green berries and oak leaves woven into her hair with a short sage green veil hanging from it, a bronze torc necklace, a mint green woven belt with a small golden sickle and a brown leather herb satchel with small glass potion bottles. Prop: a gnarled oak staff topped with sprouting green leaves and mistletoe. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: forest green, mint green, sage, bronze, gold, brown leather.
```
**POSE_CUTIN**
```
Pose: holding the oak staff forward with a gentle smile, other hand offering a small potion bottle toward the viewer.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, oak staff held upright, mistletoe crown with short sage green veil, long braid, herb satchel and green leaf wings clearly visible.
```

### 3.9 셰헤라자드 (`scheherazade`) - 음유시인(무희) / 아랍 무희

**IDENTITY**
```
A lively and mischievous female fairy, 6 heads tall. Big playful grin, jade green eyes, freckles, long pointed elf ears. Jade green bob haircut with straight bangs. Four jade tinted lacewing wings with fine net-like veins.
```
**OUTFIT**
```
Wearing an Arabian dancer outfit: a jade green cropped bolero top with gold embroidery, a gold coin headband with a semi-opaque jade green silk veil draped over the back of her hair, a jade green hip scarf belt lined with rows of small gold coins and tassels, flowing jade green harem pants gathered at the ankles, gold arm cuffs and gold anklets with tiny bells, soft pointed gold slippers. Props: gold finger cymbals on both hands and a long jade green silk dance scarf. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: jade green, gold, deep teal.
```
**POSE_CUTIN**
```
Pose: twirling mid-spin in the air toward the viewer, both arms raised clashing the finger cymbals, silk dance scarf and hip scarf coins swirling around her, big grin.
```
**POSE_BATTLE_BACK**
```
Pose: hovering facing away from the viewer toward the enemy, arms raised with finger cymbals, coin headband veil, coin hip scarf, harem pants and lacewing wings clearly visible.
```

### 3.10 알렉세이 (`aleksei`) - 빙결 마법사 / 제정 러시아 궁정 마법사

**IDENTITY**
```
A cool and aloof young male fairy, 7 heads tall. Calm expressionless face, ice blue eyes, long pointed elf ears. Messy frosty pale blue hair. Four moth wings with snowflake crystal patterns, pale ice blue tinted.
```
**OUTFIT**
```
Wearing an Imperial Russian court mage outfit: a long fitted ice blue greatcoat with a double row of silver buttons, silver frog closures and silver snowflake embroidery, a wide dark navy fur collar with fur-trimmed cuffs and hem, long coat skirts at the back, a tall cylindrical dark navy fur hat with a silver snowflake badge, a dark navy sash belt, dark navy gloves and tall polished black boots. Prop: a tall staff of pale blue ice crystal with a sharp crystal cluster at the top. No cape or cloak on the shoulders, wings fully visible.
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
Pose: standing facing away from the viewer toward the enemy, ice crystal staff raised, tall fur hat, long greatcoat skirts and snowflake-patterned moth wings clearly visible.
```

### 3.11 다온 (`daon`) - 프리즘 정령술사 / 한국 한복 선녀

**IDENTITY**
```
A graceful and serene female fairy, 7 heads tall. Gentle calm expression, iridescent violet blue eyes, long pointed elf ears. Very long flowing pastel lavender hair with iridescent highlights. Four large morpho butterfly wings with an iridescent blue sheen shifting into rainbow hues at the edges.
```
**OUTFIT**
```
Wearing an elegant traditional Korean hanbok celestial maiden (seonnyeo) outfit: a short lavender blue jeogori jacket with saekdong rainbow-striped sleeves and gold-stamped geumbak patterns, tied at the chest with a long deep violet otgoreum ribbon, a voluminous high-waisted long chima skirt in soft gradient rainbow hues, a norigae tassel ornament with a jade piece and a small prism crystal hanging from the waist, a long iridescent lavender silk ribbon draped over her forearms and floating around her body below the shoulders, an ornate gold hwagwan floral crown set with a prism crystal and gold tteoljam trembling hairpins. Props: several small faceted prism crystals in rainbow colors floating in a circle around her. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: lavender blue, saekdong rainbow stripes, iridescent rainbow accents, gold, jade green.
```
**POSE_CUTIN**
```
Pose: floating with both arms open gracefully, guiding the circle of prism crystals around her, eyes gently closed, hair, saekdong sleeves, otgoreum ribbon and silk ribbon flowing softly.
```
**POSE_BATTLE_BACK**
```
Pose: floating facing away from the viewer toward the enemy, arms spread with prism crystals circling her, very long lavender hair with gold hwagwan crown, saekdong sleeves, full chima skirt, floating silk ribbon and large morpho wings clearly visible.
```

---

## 4. 에셋 체크리스트

상태: `미생성` / `테스트` / `확정`. 확정 시 채택된 이미지를 만든 최종 프롬프트 전문을 기록한다.

| 동료 | `cutin_[영문명].png` (VIEW_ILLUST) | `battle_back_[영문명].png` (VIEW_BATTLE_BACK) |
|---|---|---|
| 카스미 | 확정 | 미생성 |
| 에이다 | 미생성 | 미생성 |
| 시그리드 | 미생성 | 미생성 |
| 록사나 | 미생성 | 미생성 |
| 카밀라 | 미생성 | 미생성 |
| 카탈리나 | 미생성 | 미생성 |
| 아이아스 | 미생성 | 미생성 |
| 에이린 | 미생성 | 미생성 |
| 셰헤라자드 | 미생성 | 미생성 |
| 알렉세이 | 미생성 | 미생성 |
| 다온 | 미생성 | 미생성 |

### 생성 기록
- 2026-11-03 카엘 컷인 1차 (삭제됨): 남성, 어깨 망토 착용 버전. 화풍 일치 및 화풍 참고 지시문 동작을 확인했으나, 이후 성별 변경(여성)과 망토 금지 규칙(가이드 규칙 10)으로 폐기. 이때 임의 생성된 손가락 없는 장갑, 금색 테두리는 현재 블록에 유지.
- 2026-11-03 `cutin_kael.png` 확정 (2차): 첨부 `assets/characters/fairy/fairy_base.png`(v3) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 카엘 IDENTITY + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 결과에서 짧은 치마형 상의 밑단, 여러 겹 버클 벨트가 임의 생성되어 OUTFIT에 고정함 (생성 당시 OUTFIT에는 해당 문구 없음).
- 2026-11-04 동료 11인 복식 모티프 재설정 (원칙 1 변경). 카엘이 서양식 암살자 가죽 갑옷에서 일본 쿠노이치로 바뀌어 `cutin_kael.png`(2차)는 폐기하고, 새 OUTFIT과 `fairy_base.png` v4로 재생성한다. 파일은 재생성 시 덮어쓴다.
- 2026-11-04 동료 이름을 복식 모티프에 맞게 변경 (위 기록의 이름은 당시 이름 그대로 둠): 카엘(`kael`)→카스미(`kasumi`), 루미(`lumi`)→에이다(`ada`), 베른(`bern`)→시그리드(`sigrid`), 로제(`rose`)→록사나(`roxana`), 카밀라(`camilla`) 유지, 시안(`cyan`)→카탈리나(`catalina`), 바란(`baran`)→아이아스(`aias`), 미라(`mira`)→에이린(`eirin`), 제이드(`jade`)→셰헤라자드(`scheherazade`), 레온(`leon`)→알렉세이(`aleksei`), 아이리스(`iris`)→다온(`daon`). 다온의 모티프는 중국 한푸 선녀에서 한국 한복 선녀로 변경. 기존 `cutin_kael.png`는 `cutin_kasumi.png` 생성 시 삭제한다.
- 2026-11-04 `cutin_kasumi.png` 확정: 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 카스미 IDENTITY + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 결과에서 오비 뒤 큰 리본 매듭, 손가락 없는 장갑, 옆으로 묶은 목 천이 임의 생성되어 OUTFIT에 고정함 (생성 당시 OUTFIT에는 해당 문구 없음). 사슬 갑옷은 그물형 망사로, 포즈는 돌진 대신 넓게 선 자세·정방향 파지로 생성됨. 선이 기준 이미지보다 가늘고 붓 터치가 약하나 재생성해도 개선되지 않아 채택. 기존 `cutin_kael.png` 삭제.
