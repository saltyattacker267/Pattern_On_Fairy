# 동료 페어리 11인 - 캐릭터 시트

- 저장 폴더: `assets/characters/partners/`
- 파일 규격: `cutin_[영문명].png` (VIEW_ILLUST), `battle_back_[영문명].png` (VIEW_BATTLE_BACK)
- 공통 블록(STYLE_BASE, VIEW, LAYER) 및 작업 규칙은 `docs/art_style_guide.md`를 따른다.
- 생성 순서: 동료마다 `cutin`을 먼저 확정한 뒤 `battle_back`을 생성한다. `battle_back`에는 `cutin`을 첨부하지 않는다 (가이드 규칙 8).

---

## 1. 외형 컨셉 원칙

1. **직업 + 문화권 복식 모티프:** 동료마다 판타지 직업 하나와 실제 역사·문화권의 복식 모티프 하나를 부여한다 (주인공 = 프랑스 경기병). 모티프는 두루뭉술하게 쓰지 않고 고유 복식·소품 명칭(오비, 카프탄, 코코시닉, 호플론 등)을 프롬프트에 직접 써서 컨셉을 극대화한다. 직업과 모티프는 서로 중복되지 않게 하며, 실제 신앙의 성물은 소품으로 쓰지 않는다.
   - **판타지 각색 (2026-11-10 추가):** 복식을 고증대로 재현하지 않는다. 모티프는 한눈에 읽히는 대표 복식·소품 2~3개로만 살리고, 실루엣은 짧고 가볍게(바닥 길이 → 무릎 위, 어깨·팔 노출, 니삭스·오버니 부츠로 다리 라인), 소재는 비단·시폰·레이스 위주로 하며, 요정 포인트(꽃잎형 치맛단, 리본, 덩굴 장식 등)를 1~2개 넣는다. 노출 수위는 모바일 가챠 일러스트 수준(어깨, 팔, 허벅지)으로 한다. OUTFIT 첫 문장은 `Wearing a fantasy-adapted ... outfit:` 형태로 쓴다. 에이다(작고 앳된 체형)는 노출을 다른 동료보다 낮게 유지하고, 남성 동료는 노출을 늘리지 않는다.
2. **스킬의 시각화:** 스킬 효과가 직업, 소품, 복장에서 바로 읽히도록 한다.
3. **날개 종류 전원 상이:** 전투 화면은 3인 백뷰이므로 날개 형태와 머리/모자 실루엣만으로 식별 가능해야 한다.
4. **등급 차등:** 5성은 4성보다 장식과 날개를 크고 화려하게 한다.
5. **공통 요정 특징:** 전원 길고 뾰족한 요정 귀. 카밀라는 박쥐형 막날개를 가진 다른 요정 종족이다.
6. **성비:** 캐릭터 수집형 게임 특성을 고려하여 여성 8 : 남성 3 (남성: 비요른, 아이아스, 알렉세이).
7. **망토 금지 (가이드 규칙 10):** 어깨/목에서 늘어지는 망토 대신 "등 처리" 칸의 방식으로 표현한다.
8. **FACE 블록 (2026-11-10 추가):** 가챠 캐릭터의 매력을 위해 IDENTITY 뒤에 공통 FACE 블록(3장)을 넣어 애니풍의 앳된 미형 얼굴로 통일한다. 나이는 IDENTITY에 쓰며 여성 동료는 `a young adult in her early twenties`를 기본으로 한다. IDENTITY에는 `Sharp`, `narrow`, `aristocratic` 등 얼굴을 성숙하게 만드는 단어를 쓰지 않고, 성격은 표정으로만 표현한다. 장년 컨셉인 비요른은 FACE 블록을 적용하지 않는다. (아이아스는 장년 컨셉으로 시작했으나 2026-11-10 20대 후반 미남으로 변경하여 FACE_MALE 적용)

## 2. 동료 목록

| 동료 (영문명) | 등급 | 색상 / 속성 | 성별 / 체형 | 직업 | 복식 모티프 | 스킬 연결 | 날개 | 등 처리 | 백뷰 식별 포인트 |
|---|---|---|---|---|---|---|---|---|---|
| 카스미 (`kasumi`) | 5성 | 보라 / 심연 | 여 / 날렵 | 그림자 암살자 | 일본 쿠노이치 | 즉사 = 암살, 첫 Miss 무효 = 그림자 회피 | 짙은 보라 나방 | 허리 뒤 긴 오비 띠 (찢어진 검은 천) | 보라 브릿지가 섞인 긴 포니테일, 찢어진 오비 띠 |
| 에이다 (`ada`) | 5성 | 황금 / 시간 | 여 / 작고 앳됨 | 시간술사 | 빅토리아 시대 시계 장인 | 타이머 연장 = 모래시계 지팡이, 회중시계 | 톱니 문양 금빛 나비 | 연미복 자락, 버슬 스커트 | 양갈래 올림머리 + 황동 고글, 모래시계 지팡이 |
| 비요른 (`bjorn`) | 5성 | 진홍 / 화염 | 남 / 근육질 장신 | 화염 대장장이 | 노르드(바이킹) 대장장이 | 추가 피해 = 벼려낸 무기, 치명타 = 망치 일격 | 불씨 무늬 진홍 잠자리 | 털 조끼 (어깨~허리, 날개 뿌리 가림 여부는 백뷰 생성 시 확인) | 정수리를 따라 땋은 붉은 머리, 회색 털 조끼, 어깨에 멘 거대 망치 |
| 록사나 (`roxana`) | 4성 | 분홍 / 관통 | 여 / 늘씬 | 가시장미 궁수 | 페르시아 궁수 | 관통 = 화살 | 장미 꽃잎형 나비 | 허리 장식끈, 옆트임 카프탄 자락 | 터번형 모자 + 높은 포니테일, 화살통 |
| 카밀라 (`camilla`) | 4성 | 암적 / 흡혈 | 여 / 마른 장신 | 흡혈 귀족 | 동유럽 보야르 귀족 | 흡혈, 회복 = 크리스털 잔 | 검붉은 박쥐형 막날개 | 없음 (막날개를 등 뒤로 크게 펼침) | 코코시닉 머리장식, 크게 펼친 막날개 |
| 카탈리나 (`catalina`) | 4성 | 하늘 / 질풍 | 여 / 가벼움 | 바람 항해사 | 대항해시대 스페인 갈레온 항해사 | 판정 시간 = 순풍, 콤보 보존 = 아스트롤라베 | 길고 가는 하늘색 잠자리 | 스카프 | 깃털 꽂은 모리온 투구, 휘날리는 긴 스카프 |
| 아이아스 (`aias`) | 4성 | 강철 / 수호 | 남 / 20대 후반 미남 근육질, 최대 거구 | 성기사 | 고대 그리스 호플리트 | 기절, 1회 생존 = 수호의 방패 | 강철색 딱정벌레 겉날개 | 프테루게스 (허리 아래 가죽 띠 치마) | 세로 볏 코린트식 투구 + 투구 아래로 내려오는 장발, 거대 원형 방패 |
| 에이린 (`eirin`) | 4성 | 녹색 / 치유 | 여 / 단정 | 치유 사제 | 켈트 드루이드 | 회복, 실드 = 약초와 잎사귀 지팡이 | 잎맥 녹색 날개 (나뭇잎벌레형) | 시폰 소매, 잎사귀 모양 치맛단 | 겨우살이 화관 + 짧은 베일, 땋은 머리 |
| 셰헤라자드 (`scheherazade`) | 4성 | 비취 / 충전 | 여 / 활발 | 음유시인 (무희) | 아랍 무희 | 피버 충전 = 춤과 심벌즈로 사기 고양 | 비취색 풀잠자리 | 머리띠 베일, 동전 허리 스카프 | 동전 머리띠 베일, 동전 허리 스카프, 하렘 팬츠 |
| 알렉세이 (`aleksei`) | 4성 | 빙청 / 빙결 | 남 / 냉정한 청년 | 빙결 마법사 | 제정 러시아 궁정 마법사 | 결빙, 감속 = 얼음 마법 | 눈꽃 결정 무늬 나방 | 긴 코트 자락 | 원통형 털모자, 털 장식 긴 코트, 얼음 결정 지팡이 |
| 다온 (`daon`) | 4성 | 무지개 / 공명 | 여 / 우아 | 프리즘 정령술사 | 한국 한복 선녀 | 동료 에너지 주입 = 정령의 힘 분배 | 무지갯빛 모르포 나비 | 팔에 걸친 비단 띠, 늘어진 옷고름 | 매우 긴 머리 + 화관, 색동 소매, 비단 띠, 주위를 도는 프리즘 결정 |

---

## 3. 프롬프트 블록

블록 조합: `[LAYER_SPRITE_HEAD] + [VIEW] + [IDENTITY] + [FACE] + [OUTFIT] + [POSE] + [PALETTE] + [STYLE_BASE] + [LAYER_SPRITE_TAIL]`
- `cutin`: VIEW_ILLUST + POSE_CUTIN (첨부: `fairy_base.png`, 지시문: 화풍 참고)
- `battle_back`: 가이드 1.1.1 조합 (VIEW_BATTLE_BACK + IDENTITY_BACK + OUTFIT_BACK + POSE_BATTLE_BACK + STYLE_BASE_BACK, FACE 없음). 첨부: `assets/characters/fairy/fairy_battle_back.png`, 지시문: `Match the art style and composition of the attached image (a different character). Only the camera angle, framing, hovering stance and art style follow the attached image; the character, outfit and colors are entirely different, as described below. Do not copy the wings of the attached image; draw the wings exactly as described in the text.` (가이드 규칙 8. 날개 문장은 2026-11-12 에이다 1차에서 날개 모양이 주인공 것을 따라가 추가). 동료별 IDENTITY_BACK/OUTFIT_BACK은 백뷰 생성 시 작성하고, 아래 POSE_BATTLE_BACK도 그때 대기 자세(공중 제자리, 오른쪽 위 주시)로 다시 쓴다.
- FACE는 캐릭터별 블록에 적힌 종류를 쓴다. 비요른은 FACE 없이 조합한다. `battle_back`은 얼굴이 보이지 않아야 하므로 전원 FACE 없이 조합한다 (2026-11-11 추가).

**FACE_FEMALE** (여성 동료 공통)
```
Youthful beautiful face with cute Japanese anime-style features, large expressive eyes with long dark eyelashes, small nose, soft rounded jawline, smooth flawless skin with no wrinkles or harsh facial lines, rosy blushed cheeks, the same face rendering style as the attached image.
```
**FACE_MALE** (청년 남성 동료, 아이아스·알렉세이)
```
Handsome youthful face with Japanese anime-style bishonen features, refined expressive eyes with long dark eyelashes, straight slim nose, slim smooth jawline, smooth flawless skin with no wrinkles or harsh facial lines, the same face rendering style as the attached image.
```
- 2026-11-10 카밀라 테스트에서 FACE_FEMALE(당시 나이 문구 포함) 적용 시 얼굴이 크게 앳되고 매력적으로 개선됨을 확인. 나이는 캐릭터마다 다르므로 IDENTITY로 분리했다.

### 3.1 카스미 (`kasumi`) - 그림자 암살자 / 일본 쿠노이치

**IDENTITY**
```
A lean and agile female fairy, a young adult in her early twenties, 7 heads tall. Cool deep violet eyes, faint confident smile, long pointed elf ears. Black hair with several violet streaks through the bangs and ponytail, tied in a long high ponytail with a violet hair tie. Four large deep violet moth wings with dark eyespot patterns and silver-dusted edges.
```
**FACE**: FACE_FEMALE

**OUTFIT**
```
Wearing a fantasy-adapted Japanese kunoichi (female ninja) outfit: a short sleeveless dark violet kimono-style wrap top with lavender trim, fine black kusari chainmail mesh visible at the collar edge, detached dark violet kimono sleeves tied with lavender ribbon bows at the upper arms and wrists, a black obi sash tied at the waist with a lavender cord knotted at the front, a large bow knot at the back and long tattered black obi tails flowing down from the back of her waist, a very short dark violet pleated hakama-style skirt with lavender trim, black tekko arm guards with silver plates over black fingerless gloves, a lavender face cloth mask pulled down around her neck and knotted at the side, black thigh-high stockings with knee-high black kyahan shin guards with silver plates and black split-toe tabi boots, several kunai tucked into the obi. Weapons: a short straight ninjato with a violet-wrapped grip and a square guard, and a kunai. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: deep violet, black, silver, lavender.
```
**POSE_CUTIN**
```
Pose: lunging forward low toward the viewer with the ninjato held in a forward grip slashing out, the other hand flicking a kunai, ponytail and long obi tail sweeping.
```
**IDENTITY_BACK** (전투 백뷰 전용, 2026-11-12 추가. 눈·미소·앞머리 브릿지 삭제)
```
Her back is toward the viewer; only the back of her head and her high ponytail are visible. A lean and agile female fairy, a young adult in her early twenties, 7 heads tall, seen from behind. Long pointed elf ear tips poking out from both sides of the back of her head. Black hair tied in a long high ponytail with a violet hair tie, several violet streaks running through the ponytail, the ponytail swinging behind her. Four large deep violet moth wings with dark eyespot patterns and silver-dusted edges, growing from her upper back between the shoulder blades, spread wide and caught mid-beat.
```
**OUTFIT_BACK** (전투 백뷰 전용, 2026-11-12 추가. 쿠사리 망사·오비 앞 끈·오비의 쿠나이 삭제, 마스크는 `face` 단어 없이 목 천으로 표기)
```
Wearing a fantasy-adapted Japanese kunoichi (female ninja) outfit seen from the back: the back of a short sleeveless dark violet kimono-style wrap top with lavender trim leaving her shoulders bare, a lavender cloth scarf wrapped around her neck with its knot at the side, detached dark violet kimono sleeves tied with lavender ribbon bows at the upper arms and wrists, a black obi sash around her waist with a large black bow knot at the back and long tattered black obi tails flowing down from the back of her waist, a very short dark violet pleated hakama-style skirt with lavender trim, black tekko arm guards with silver plates over black fingerless gloves, black thigh-high stockings with knee-high black kyahan shin guards with silver plates and black split-toe tabi boots seen from behind. Weapons: a short straight ninjato with a violet-wrapped grip and a square guard, and a kunai. No cape or cloak on the shoulders, wings fully visible.
```
**POSE_BATTLE_BACK** (2026-11-12 갱신. 첨부 방식에서는 웅크린 자세가 반영되지 않고 기준 백뷰의 자세를 따름)
```
Pose: poised battle-ready stance while hovering in place in mid-air, not attacking yet, calmly watching the distant opponent in the upper right, body in a slight low crouch leaning forward, right hand holding the ninjato in a forward grip low at her side with the blade angled toward the opponent, left hand holding a kunai ready near her hip, knees bent with legs hanging below her, wings beating steadily to hover, ponytail and long obi tails swaying gently.
```

### 3.2 에이다 (`ada`) - 시간술사 / 빅토리아 시대 시계 장인

**IDENTITY**
```
A petite youthful girl fairy, 5 heads tall. Round curious golden eyes, cheerful confident smile, brass clockmaker goggles with amber tinted lenses pushed up on her forehead, long pointed elf ears. Honey-gold hair in two buns with short loose tails. Four opaque metallic golden butterfly wings with intricate embossed clockwork gear filigree patterns, rich golden yellow.
```
**FACE**: FACE_FEMALE

**OUTFIT**
```
Wearing a fantasy-adapted Victorian-era clockmaker outfit: a cropped midnight blue tailcoat jacket with short puffed sleeves, brass gear-shaped buttons, gold star embroidery on the lapels, coat tails at the back, detached midnight blue wrist cuffs with gold vine and star embroidery and gear-shaped buttons, a gold brocade waistcoat over a pale yellow high-collared blouse with a midnight blue ribbon bow tie, a small brown leather tool apron with a front pocket holding a tiny screwdriver, a wrench and small gears, a short ruffled midnight blue bustle skirt above the knees with a honey yellow lace petticoat, midnight blue and grey striped stockings and knee-high brown boots with triple side buckles and small gear ornaments. Props: a brass staff topped with a large ornate hourglass with golden sand encircled by brass orrery rings, an open brass pocket watch on a long gold chain, and a second brass pocket watch hanging from a chain at her waist. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: gold, brass, midnight blue, honey yellow, brown leather.
```
**POSE_CUTIN**
```
Pose: floating in mid-air raising the hourglass staff high with one hand, holding up the open pocket watch toward the viewer with the other, cheerful wink.
```
**IDENTITY_BACK** (전투 백뷰 전용, 2026-11-12 추가. 눈·미소·이마의 고글 렌즈 삭제, 고글은 뒤통수 가죽끈으로 표기)
```
Her back is toward the viewer; only the back of her head, her two hair buns and the strap of her goggles are visible. A petite youthful girl fairy, 5 heads tall, seen from behind. Long pointed elf ear tips poking out from both sides of the back of her head. Honey-gold hair in two buns with short loose tails, a brown leather goggle strap with small brass buckles wrapped around the back of her head between the buns. Four opaque metallic golden butterfly wings shaped like a real butterfly's: two broad rounded upper wings with wide scalloped outer edges and two smaller rounded lower wings with short tails, rich golden yellow with intricate embossed clockwork gear filigree patterns, growing from her upper back between the shoulder blades, spread wide and caught mid-beat.
```
**OUTFIT_BACK** (전투 백뷰 전용, 2026-11-12 추가. 라펠 자수·조끼·블라우스 리본 타이·앞치마 주머니 공구 삭제, 앞치마는 허리 뒤 끈 매듭으로 표기)
```
Wearing a fantasy-adapted Victorian-era clockmaker outfit seen from the back: the back of a cropped midnight blue tailcoat jacket with short puffed sleeves, the pale yellow high collar of her blouse peeking above it, two long midnight blue coat tails hanging down from the back of the jacket over her skirt, detached midnight blue wrist cuffs with gold vine and star embroidery and gear-shaped buttons, brown leather apron strings tied in a small bow at the back of her waist, a short ruffled midnight blue bustle skirt above the knees with a gathered bustle puff at the back and a honey yellow lace petticoat peeking below, a brass pocket watch hanging from a chain at her hip, midnight blue and grey striped stockings and knee-high brown boots with triple side buckles and small gear ornaments seen from behind. Props: a brass staff topped with a large ornate hourglass with golden sand encircled by brass orrery rings, and an open brass pocket watch on a long gold chain. No cape or cloak on the shoulders, wings fully visible.
```
**POSE_BATTLE_BACK** (2026-11-12 갱신. 첨부 방식에서 기준 백뷰 자세를 따르므로 지팡이를 오른쪽 옆에 세워 든 자세로 맞춤)
```
Pose: poised battle-ready stance while hovering in place in mid-air, not attacking yet, calmly watching the distant opponent in the upper right, right hand holding the hourglass staff upright at her side, left hand holding the open pocket watch on its chain near her hip, legs hanging below her, wings beating steadily to hover, coat tails and bustle skirt swaying gently.
```

### 3.3 비요른 (`bjorn`) - 화염 대장장이 / 노르드(바이킹) 대장장이

**IDENTITY**
```
A tall, muscular, broad-shouldered male fairy in his thirties, 7.5 heads tall. Confident soot-smudged face with freckles, a small scar on one cheek, a full red beard with a long single braid hanging from the chin, bold grin, amber eyes, long pointed elf ears. Fiery red hair in a thick braid running along the top of his head to the back. Four large crimson dragonfly wings with ember orange spots.
```
**OUTFIT**
```
Wearing a Norse Viking blacksmith outfit: a sleeveless crimson wool tunic with woven knotwork trim at the collar and hem, a thick sleeveless grey wolf fur vest over the shoulders reaching down to the waist, fastened at the chest with two bronze oval brooches, a heavy dark brown leather blacksmith apron with brass rivets and a riveted front pocket, a bronze knotwork arm ring on the upper arm and leather bracers engraved with Norse runes, baggy dark grey trousers with cross-wrapped leg bindings and fur-trimmed boots, a wide riveted leather tool belt with tongs and a chisel tucked into the apron pocket. Weapon: a huge two-handed forge hammer with a black iron head engraved with ember orange Norse runes. No cape or cloak on the shoulders, wings fully visible.
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
Pose: standing ready facing away from the viewer toward the enemy, huge forge hammer resting on his shoulder, thick red braid along the top of his head, grey wolf fur vest and crimson dragonfly wings clearly visible.
```

### 3.4 록사나 (`roxana`) - 가시장미 궁수 / 페르시아 궁수

**IDENTITY**
```
A tall and slender female fairy, a young adult in her early twenties, 7 heads tall. Confident smile, rose pink eyes, long pointed elf ears. Long wavy rose pink hair in a high ponytail. Four layered rose-petal shaped butterfly wings in shades of pink and deep magenta.
```
**FACE**: FACE_FEMALE

**OUTFIT**
```
Wearing a fantasy-adapted Persian Safavid-era archer outfit: a fitted sleeveless deep rose silk kaftan bodice with a high stand collar, embroidered with gold rose garden and arabesque patterns, opening below the waist into long split kaftan panels at the sides and back with a rose-petal scalloped hem, short magenta silk shorts, tall pointed brown leather boots above the knees with V-cut tops, a gold-trimmed magenta sash with long flowing ends tied at the waist, a small rose turban-style cap with a gold jewel and a pink feather wrapped around the base of her high ponytail, a carved archer's thumb ring and leather bracers on both forearms with an extra gold arm cuff on the bow arm, an ornate gold-tooled leather quiver of rose-fletched arrows hanging at her left hip, and a matching gold-tooled leather bow case hanging at her right hip. Weapon: a recurved composite bow lacquered deep rose with gold rose motifs and thorned vine carvings. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: rose pink, deep magenta, gold, brown leather.
```
**POSE_CUTIN**
```
Pose: drawing the recurved bow at full draw aimed to the side, winking with one eye closed, ponytail and sash ends swinging.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, drawing the recurved bow, quiver at her hip, turban-style cap with high ponytail, split kaftan hem and rose-petal wings clearly visible.
```

### 3.5 카밀라 (`camilla`) - 흡혈 귀족 / 동유럽 보야르 귀족

**IDENTITY**
```
A slender, tall, pale female fairy, a young adult in her early twenties, 7.5 heads tall. Crimson eyes, playful sly smile showing small fangs, long pointed elf ears. Long straight black hair with dark red streaks and tips. Two large dark crimson bat-like membrane wings with delicate fairy-like ribs, opaque, spread wide behind her.
```
**FACE**: FACE_FEMALE

**OUTFIT**
```
Wearing a fantasy-adapted Eastern European boyar noblewoman outfit: an off-the-shoulder dark blood red silk mini dress with a fitted gold-embroidered brocade corset bodice, a row of ruby and gold buttons down the front, a black sable fur trim along the neckline, short red puffed sleeves under the fur trim, a short layered high-low skirt with a black lace underlayer and scalloped hem, detached long hanging sleeves of sheer black chiffon, a tall jeweled kokoshnik headdress in black and gold set with rubies and hanging garnet bead strands, a ruby drop pendant chain on her forehead, crimson painted nails, black thigh-high stockings with red ribbon garters and garter straps, black heeled ankle boots with gold trim. Props: a crystal goblet filled with dark red liquid and a long straight sword with a ruby-studded cross guard. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: blood red, black, gold, ruby.
```
**POSE_CUTIN**
```
Pose: raising the crystal goblet in an elegant toast toward the viewer with a sly smile, other hand holding the long sword lowered at her side, bat wings spread wide behind her.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, long sword in hand, tall kokoshnik headdress, long black hair, bat-like membrane wings spread wide from her shoulders clearly visible.
```

### 3.6 카탈리나 (`catalina`) - 바람 항해사 / 대항해시대 스페인 갈레온 항해사

**IDENTITY**
```
A slim and agile female fairy, a young adult in her early twenties, 6.5 heads tall. Energetic grin, bright sky blue eyes, long pointed elf ears. Short tousled sky blue hair. Four long and narrow swift-shaped dragonfly wings, very pale sky blue tinted and translucent, with fine geometric pale blue filigree veins.
```
**FACE**: FACE_FEMALE

**OUTFIT**
```
Wearing a fantasy-adapted 16th-century Spanish galleon navigator outfit: a cropped fitted sky blue doublet with long slashed puffed sleeves showing navy lining and frilled cuffs, a small pale sky blue tinted pleated ruff collar, a brown leather corset-style jerkin, short navy puffed trunk hose shorts with sky blue slashes, sky blue thigh-high stockings and folded-top light brown leather boots, a polished steel morion helmet with a curved crest and a sky blue plume, a navy neckerchief knotted at the throat, a very long flowing scarf in sky blue and navy stripes streaming out to both sides. Props: a brass astrolabe on a chain and a brass spyglass. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: sky blue, navy, polished steel, brass, brown leather.
```
**POSE_CUTIN**
```
Pose: dashing forward through the air leaning into the wind, pointing ahead with her finger, holding the brass spyglass and the astrolabe on its chain in the other hand, long scarf streaming behind her.
```
**POSE_BATTLE_BACK**
```
Pose: hovering facing away from the viewer toward the enemy, spyglass raised in one hand, plumed morion helmet, long striped scarf streaming and long narrow dragonfly wings clearly visible.
```

### 3.7 아이아스 (`aias`) - 성기사 / 고대 그리스 호플리트

**IDENTITY**
```
A very tall, broad-shouldered and muscular handsome male fairy, a young man in his late twenties, 8 heads tall, the largest of the party. Calm dependable expression with a gentle confident smile, clean-shaven, steel grey eyes, long pointed elf ears. Long flowing dark ash brown hair falling from beneath his helmet down past his shoulders. Wings: a pair of hard dark steel blue beetle elytra shells, partially open, with smaller smoke grey membrane wings beneath.
```
**FACE**: FACE_MALE

**OUTFIT**
```
Wearing ancient Greek hoplite armor: a polished steel muscled cuirass with brass trim over a dark blue linen chiton, a skirt of layered dark blue leather pteruges strips hanging from the waist to the knees, polished steel greaves on the shins and leather sandals, a polished steel Corinthian helmet worn down over his face with the eyes, nose and smiling mouth visible through the opening, topped with a tall dark blue horsehair crest running front to back, a dark blue cloth wrap and steel bracer on his spear arm. Weapons: a huge round hoplon shield in polished steel with a raised brass rim and an embossed gold fairy crest, and a long spear with a leaf-shaped steel tip and a pointed steel butt spike. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: steel grey, dark blue, brass, gold.
```
**POSE_CUTIN**
```
Pose: standing relaxed and confident facing the viewer, the huge round shield held at his side on one arm, the long spear held low and diagonal in the other hand, gentle smile.
```
**POSE_BATTLE_BACK**
```
Pose: standing firm facing away from the viewer toward the enemy, huge round shield raised on his arm, spear in the other hand, front-to-back crested Corinthian helmet with long dark ash brown hair flowing down his back, pteruges skirt and beetle elytra wings clearly visible.
```

### 3.8 에이린 (`eirin`) - 치유 사제 / 켈트 드루이드

**IDENTITY**
```
A gentle and calm female fairy, a young adult in her early twenties, 7 heads tall. Soft kind smile, soft green eyes, long pointed elf ears. Long leaf green hair in a single braid. Four green leaf-insect wings with detailed leaf vein patterns.
```
**FACE**: FACE_FEMALE

**OUTFIT**
```
Wearing a fantasy-adapted Celtic druid priestess outfit: a fitted sleeveless deep forest green silk dress with a V-neckline and woven gold Celtic knotwork borders, a front-split overskirt panel with knotwork trim over a knee-length skirt with a layered leaf-shaped hem, sheer sage green chiffon sleeves draped loosely from gold upper arm bands, brown leather sandals laced up to the knees, a crown of mistletoe with pale green berries and oak leaves woven into her hair with a short sage green veil hanging from it, a bronze torc necklace, a mint green woven belt with a small golden sickle and a brown leather herb satchel with small glass potion bottles. Prop: a gnarled oak staff with a hooked curling top, sprouting green leaves and hanging mistletoe. No cape or cloak on the shoulders, wings fully visible.
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
A lively and mischievous female fairy, a young adult in her early twenties, 6 heads tall. Big playful grin, jade green eyes, light freckles, long pointed elf ears. Jade green bob haircut with straight bangs. Four pale jade tinted lacewing wings with angular gold geometric vein patterns.
```
**FACE**: FACE_FEMALE

**OUTFIT**
```
Wearing a fantasy-adapted Arabian dancer outfit: a short-sleeved gold-trimmed jade green bolero jacket over a jade green crop top with gold arabesque embroidery, a row of small gold coins dangling from the crop top hem, and a bare midriff, a gold coin headband with a short semi-opaque jade green silk veil hanging only down the back of her head behind the bob hair, the veil not wrapping around her face, neck or shoulders, bare neck and shoulders, a jade green hip scarf belt knotted at the side with a gold tassel, lined with rows of small gold coins, flowing semi-sheer jade green chiffon harem pants with side slits, gathered at the ankles, wide gold wrist cuffs and gold anklets with tiny bells, soft pointed gold slippers. Props: tiny coin-sized gold finger cymbals (zills) strapped to the thumb and middle finger of both hands, not large hand-held cymbals, and a long jade green silk dance scarf with both ends wrapped around her wrists. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: jade green, gold, deep teal.
```
**POSE_CUTIN**
```
Pose: twirling mid-spin in the air toward the viewer, both arms raised snapping the tiny finger cymbals between thumb and middle finger, silk dance scarf and hip scarf coins swirling around her, big grin.
```
**POSE_BATTLE_BACK**
```
Pose: hovering facing away from the viewer toward the enemy, arms raised with finger cymbals, coin headband veil, coin hip scarf, harem pants and lacewing wings clearly visible.
```

### 3.10 알렉세이 (`aleksei`) - 빙결 마법사 / 제정 러시아 궁정 마법사

**IDENTITY**
```
A cool and aloof male fairy, a young man in his early twenties, 7 heads tall. Calm composed expression, ice blue eyes, long pointed elf ears. Messy frosty pale blue hair with bangs partly covering one eye. Four rounded moth wings with snowflake crystal patterns, pale ice blue tinted.
```
**FACE**: FACE_MALE

**OUTFIT**
```
Wearing an Imperial Russian court mage outfit: a long fitted ice blue greatcoat with a high stand collar, silver piping along the edges, a double row of silver buttons, silver frog closures and silver snowflake embroidery, snowflake and vine embroidery along the front panel hem, a wide dark navy fur collar with fur-trimmed cuffs and hem, long coat skirts at the back, a tall cylindrical dark navy fur hat with a silver snowflake badge, a dark navy sash belt knotted at the side with hanging ends, dark navy gloves, dark navy trousers tucked into tall polished black boots. Prop: a tall staff made entirely of pale blue ice crystal with a sharp crystal cluster at the top. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: ice blue, dark navy, silver, pale cyan.
```
**POSE_CUTIN**
```
Pose: standing holding the ice crystal staff diagonally in one hand, the other hand raised with fingers spread casting a spell, calm and focused.
```
**POSE_BATTLE_BACK**
```
Pose: standing facing away from the viewer toward the enemy, ice crystal staff raised, tall fur hat, long greatcoat skirts and snowflake-patterned moth wings clearly visible.
```

### 3.11 다온 (`daon`) - 프리즘 정령술사 / 한국 한복 선녀

**IDENTITY**
```
A graceful and serene female fairy, a young adult in her early twenties, 7 heads tall. Gentle calm expression, iridescent violet blue eyes, long pointed elf ears. Very long flowing pastel lavender hair with iridescent highlights, parted in the center. A small diamond-shaped prism gem on her forehead. Four large morpho butterfly wings with an iridescent blue sheen shifting into rainbow hues at the edges, dark violet wing borders and small swallowtail-like tails on the lower wings.
```
**FACE**: FACE_FEMALE

**OUTFIT**
```
Wearing a fantasy-adapted Korean hanbok celestial maiden (seonnyeo) outfit: a short off-the-shoulder lavender blue jeogori jacket with a pale lavender crossed collar band, wide saekdong rainbow-striped sleeves ending in gold-patterned cuff bands, and gold-stamped geumbak patterns, tied at the chest with a long deep violet otgoreum ribbon, a soft rainbow gradient sash at the high waist, a high-waisted chima skirt cut at knee length in front and flowing long at the back, in soft gradient rainbow hues with a sheer lavender chiffon overlayer, soft violet embroidered kkotsin flower shoes, a norigae tassel ornament with a jade piece and a small butterfly charm hanging from the waist, a long iridescent lavender silk ribbon draped over her forearms and floating around her body below the shoulders, an ornate gold hwagwan crown of gold flowers set with a large prism crystal at the center, with several gold tteoljam trembling hairpins fanning out on both sides. Props: several small faceted pale iridescent prism crystals floating in arcs on both sides of her. No cape or cloak on the shoulders, wings fully visible.
```
**PALETTE**
```
Color palette: lavender blue, saekdong rainbow stripes, iridescent rainbow accents, gold, jade green.
```
**POSE_CUTIN**
```
Pose: floating with both arms open gracefully, guiding the prism crystals floating on both sides of her, eyes gently closed, hair, saekdong sleeves, otgoreum ribbon and silk ribbon flowing softly.
```
**POSE_BATTLE_BACK**
```
Pose: floating facing away from the viewer toward the enemy, arms spread with prism crystals floating on both sides of her, very long lavender hair with gold hwagwan crown, saekdong sleeves, full chima skirt, floating silk ribbon and large morpho wings clearly visible.
```

---

## 4. 에셋 체크리스트

상태: `미생성` / `테스트` / `확정`. 확정 시 채택된 이미지를 만든 최종 프롬프트 전문을 기록한다.

| 동료 | `cutin_[영문명].png` (VIEW_ILLUST) | `battle_back_[영문명].png` (VIEW_BATTLE_BACK) |
|---|---|---|
| 카스미 | 확정 | 확정 |
| 에이다 | 확정 | 확정 |
| 비요른 | 확정 | 미생성 |
| 록사나 | 확정 | 미생성 |
| 카밀라 | 확정 | 미생성 |
| 카탈리나 | 확정 | 미생성 |
| 아이아스 | 확정 | 미생성 |
| 에이린 | 확정 | 미생성 |
| 셰헤라자드 | 확정 | 미생성 |
| 알렉세이 | 확정 | 미생성 |
| 다온 | 확정 | 미생성 |

### 생성 기록
- 2026-11-03 카엘 컷인 1차 (삭제됨): 남성, 어깨 망토 착용 버전. 화풍 일치 및 화풍 참고 지시문 동작을 확인했으나, 이후 성별 변경(여성)과 망토 금지 규칙(가이드 규칙 10)으로 폐기. 이때 임의 생성된 손가락 없는 장갑, 금색 테두리는 현재 블록에 유지.
- 2026-11-03 `cutin_kael.png` 확정 (2차): 첨부 `assets/characters/fairy/fairy_base.png`(v3) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 카엘 IDENTITY + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 결과에서 짧은 치마형 상의 밑단, 여러 겹 버클 벨트가 임의 생성되어 OUTFIT에 고정함 (생성 당시 OUTFIT에는 해당 문구 없음).
- 2026-11-04 동료 11인 복식 모티프 재설정 (원칙 1 변경). 카엘이 서양식 암살자 가죽 갑옷에서 일본 쿠노이치로 바뀌어 `cutin_kael.png`(2차)는 폐기하고, 새 OUTFIT과 `fairy_base.png` v4로 재생성한다. 파일은 재생성 시 덮어쓴다.
- 2026-11-04 동료 이름을 복식 모티프에 맞게 변경 (위 기록의 이름은 당시 이름 그대로 둠): 카엘(`kael`)→카스미(`kasumi`), 루미(`lumi`)→에이다(`ada`), 베른(`bern`)→시그리드(`sigrid`), 로제(`rose`)→록사나(`roxana`), 카밀라(`camilla`) 유지, 시안(`cyan`)→카탈리나(`catalina`), 바란(`baran`)→아이아스(`aias`), 미라(`mira`)→에이린(`eirin`), 제이드(`jade`)→셰헤라자드(`scheherazade`), 레온(`leon`)→알렉세이(`aleksei`), 아이리스(`iris`)→다온(`daon`). 다온의 모티프는 중국 한푸 선녀에서 한국 한복 선녀로 변경. 기존 `cutin_kael.png`는 `cutin_kasumi.png` 생성 시 삭제한다.
- 2026-11-04 `cutin_kasumi.png` 확정: 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 카스미 IDENTITY + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 결과에서 오비 뒤 큰 리본 매듭, 손가락 없는 장갑, 옆으로 묶은 목 천이 임의 생성되어 OUTFIT에 고정함 (생성 당시 OUTFIT에는 해당 문구 없음). 사슬 갑옷은 그물형 망사로, 포즈는 돌진 대신 넓게 선 자세·정방향 파지로 생성됨. 선이 기준 이미지보다 가늘고 붓 터치가 약하나 재생성해도 개선되지 않아 채택. 기존 `cutin_kael.png` 삭제.
- 2026-11-10 `cutin_ada.png` 확정 (1차): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 에이다 IDENTITY + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 결과에서 허리 체인의 두 번째 회중시계, 앞치마 주머니의 렌치·드라이버·톱니, 톱니 모양 소매 단추와 소매 별 자수, 부츠의 이중 버클과 톱니 장식, 남색·회색 줄무늬 스타킹이 임의 생성되어 OUTFIT에 고정함 (생성 당시 OUTFIT에는 해당 문구 없음). 양갈래 올림머리는 꼬리 대신 잔머리가 흘러내리는 형태로, 날개는 금빛보다 아이보리에 가까운 연금색으로 생성됨. 등신은 5~6등신.
- 2026-11-10 시그리드(`sigrid`)를 남성 비요른(`bjorn`)으로 변경. 여성 버전은 체형이 지나치게 듬직하고, 여성스러움을 강조한 안도 컨셉과 맞지 않아 폐기. 30대 근육질 장신 체형은 유지하고 IDENTITY에 짧게 다듬은 붉은 수염 추가. 성비는 여성 8 : 남성 3으로 변경 (원칙 6).
- 2026-11-10 `cutin_bjorn.png` 확정 (1차): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 비요른 IDENTITY + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 생성 당시 IDENTITY는 `a short trimmed red beard`, `Fiery red hair in a thick braid.`였고 OUTFIT은 `a thick grey wolf fur collar around his neck fastened with bronze oval brooches`였으나, 결과에서 턱에서 길게 땋아 내린 수염, 정수리를 따라 뒤로 땋은 머리, 어깨를 덮고 허리까지 내려오는 털 조끼가 생성되어 IDENTITY/OUTFIT을 결과에 맞게 수정함. 함께 생성된 튜닉 목·밑단 매듭 문양, 앞치마 리벳 주머니(집게·끌), 위팔 청동 팔찌, 넓은 리벳 벨트, 통 넓은 바지, 털 장식 부츠도 고정. 털 조끼가 어깨를 덮어 가이드 규칙 10 위반 소지가 있으나 사용자 판단으로 채택, 백뷰 생성 시 날개 뿌리 가림 여부를 확인한다. 날개는 잠자리형보다 끝이 둥근 형태로 생성됨.
- 2026-11-10 `cutin_roxana.png` 확정 (1차): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 록사나 IDENTITY + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 생성 당시 OUTFIT은 `a leather bracer`, `quiver ... on her back`이었으나, 결과에서 양팔 팔 보호대, 왼쪽 허리 화살통, 오른쪽 허리의 같은 금박 가죽 활집이 생성되어 OUTFIT과 POSE_BATTLE_BACK(화살통 위치)을 수정함. 포즈는 정면 조준 대신 화면 옆쪽 조준, 한쪽 눈은 가늘게 뜨는 대신 윙크로 생성됨. 날개는 장미 꽃잎형보다 일반 나비형에 가까운 분홍·마젠타 겹날개로 생성됨.
- 2026-11-10 `cutin_camilla.png` 1차 생성 (미채택): 기존 블록으로 생성. 날개 망토가 반영되지 않고 막날개가 등 뒤로 펼쳐졌으며, 지팡이 칼 대신 손잡이 보호대가 달린 세이버가 생성됨. 이 시점에 사용자가 동료들이 가챠 캐릭터로서 매력이 부족하고 나이 들어 보인다고 판단하여 재작성 테스트 진행.
- 2026-11-10 카밀라 테스트 2건: (1) 얼굴 테스트 — IDENTITY에서 `Sharp elegant beauty`, `aristocratic` 제거 + FACE 블록(당시 `appearing in her late teens to early twenties` 포함) 추가. 얼굴이 크게 개선됨을 사용자가 Gemini 화면에서 확인 (파일은 다운로드하지 않음). (2) `assets/test/cutin_camilla_outfit_test.png` — FACE 블록 나이를 `a young adult in her early twenties`로 변경 + 판타지 각색 OUTFIT(오프숄더 미니 드레스, 레이스 덧치마, 시폰 분리 소매, 니삭스·가터, 앵클부츠). 사용자 채택. 결과에서 날개는 이번에도 등 뒤로 펼쳐졌고 소품은 루비 십자 장검으로, 이마 루비 장식줄·퍼프 소매·붉은 손톱·가터벨트 끈·금장식 하이힐 앵클부츠·하이로우 치마가 임의 생성되어 카밀라 블록에 고정함. 날개 망토는 2회 연속 반영되지 않아 펼친 날개로 변경.
- 2026-11-10 원칙 1 판타지 각색, 원칙 8 FACE 블록 추가에 따라 비요른·아이아스를 제외한 동료 블록 재작성. 여성 8인 IDENTITY에 나이(`a young adult in her early twenties`, 에이다는 기존 `petite youthful girl` 유지) 추가·성숙 인상 단어 제거, OUTFIT 판타지 각색. 알렉세이는 FACE_MALE 적용, 복장 유지. 에이다 날개는 1차 결과가 아이보리에 가까워 `pale gold tinted` → `rich golden yellow tinted`로 변경. 확정했던 `cutin_kasumi.png`, `cutin_ada.png`, `cutin_roxana.png`는 체크리스트를 `미생성`으로 되돌리고 재생성 시 덮어쓴다 (위 확정 기록은 이력으로 유지).
- 2026-11-10 `cutin_camilla.png` 확정: `assets/test/cutin_camilla_outfit_test.png`(카밀라 테스트 2)를 그대로 채택하여 복사 (1차 생성본 덮어씀). 생성 프롬프트는 현재 블록 조합과 같되, 당시 IDENTITY는 `Long straight black hair with dark red tips`, 날개 `draped around her shoulders like a high-collared cloak`, FACE에 `a young adult in her early twenties` 포함, OUTFIT은 위 테스트 2 기록의 각색안(임의 디테일 고정 전)이었다. POSE_CUTIN은 `other hand drawing the cane sword halfway, bat wings draped around her shoulders`였다.
- 2026-11-10 `cutin_kasumi.png` 확정 (재작성 블록 1차, 기존 파일 덮어씀): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 카스미 IDENTITY + FACE_FEMALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 결과에서 앞머리·포니테일의 여러 줄 보라 브릿지와 보라 머리끈, 분리 소매의 라벤더 리본 매듭, 오비 앞의 라벤더 끈, 무릎까지 오는 은판 각반이 임의 생성되어 IDENTITY/OUTFIT에 고정함. 닌자도는 역수 대신 정방향 파지로 생성됨(이전 카스미 컷인과 동일) → POSE_CUTIN/POSE_BATTLE_BACK을 정방향 파지로 수정.
- 2026-11-10 `cutin_ada.png` 확정 (재작성 블록 1차, 기존 파일 덮어씀): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 에이다 IDENTITY + FACE_FEMALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 날개가 진한 금빛으로 개선됨. 결과에서 불투명한 금속 질감 날개, 손목 커프스의 금색 덩굴 자수, 부츠 버클 3줄이 생성되어 IDENTITY/OUTFIT에 고정함 (생성 당시 날개 `golden butterfly wings ... rich golden yellow tinted`, 커프스 `gold star embroidery`, 부츠 `double side buckles`). 양갈래 올림머리 아래 짧은 꼬리는 프롬프트대로 생성됨. 연미복 뒷자락은 정면 각도라 확인 불가, 백뷰 생성 시 확인.
- 2026-11-10 `cutin_roxana.png` 확정 (재작성 블록 1차, 기존 파일 덮어씀): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 록사나 IDENTITY + FACE_FEMALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 결과에서 카프탄 상의의 높은 스탠드 칼라, 활 쥔 팔의 금색 팔찌, 부츠 윗단 V자 컷이 임의 생성되어 OUTFIT에 고정함. 정면 조준·한쪽 눈 가늘게 뜨기 대신 옆쪽 조준·윙크로 생성됨(이전 록사나 컷인과 동일) → POSE_CUTIN을 결과에 맞게 수정. 장미 꽃잎형 카프탄 밑단은 프롬프트대로 생성됨.
- 2026-11-10 `cutin_catalina.png` 확정 (1차): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 카탈리나 IDENTITY + FACE_FEMALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 날개가 첨부한 주인공 날개를 따라 매우 연한 색에 기하학적 선 무늬로 생성됨 — 원칙 3(날개 전원 상이)과 충돌하나 사용자 판단으로 채택하고 IDENTITY를 결과에 맞게 수정 (생성 당시 `pale sky blue tinted`만 지정). 결과에서 긴 퍼프 소매와 프릴 커프스, 남색 목 스카프 매듭, 트렁크 호즈의 하늘색 트임이 생성되어 OUTFIT에 고정함 (생성 당시 `short slashed puffed sleeves`). 망원경 대신 손가락으로 가리키는 포즈로 생성되어 POSE_CUTIN 수정.
- 2026-11-10 아이아스를 장년(a안)에서 20대 후반 미남 근육질(b안)로 변경. 장년 블록으로 생성한 컷인을 사용자가 보자마자 부적합 판단 (파일 미저장). IDENTITY를 `a young man in his late twenties`, 깔끔하게 면도한 얼굴, 짙은 애쉬 브라운 머리(같은 날 사용자 요청으로 투구 아래로 어깨 너머까지 내려오는 장발로 변경), 온화하고 자신감 있는 미소로 수정하고 FACE_MALE 적용. 8등신 최대 거구는 유지.
- 2026-11-10 `cutin_aias.png` 확정 (b안 1차): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 아이아스 IDENTITY + FACE_MALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 투구 아래 장발, 젊은 미소 얼굴, 딱정벌레 겉날개는 프롬프트대로 생성됨. 생성 당시 OUTFIT은 `transverse crest, pushed up on his head to show his face`, POSE_CUTIN은 방패를 앞으로 내민 방어 자세였으나, 결과에서 얼굴을 덮어 쓴 투구, 앞뒤 방향 세로 볏, 방패를 옆에 든 편한 자세가 생성되어 OUTFIT·POSE_CUTIN·POSE_BATTLE_BACK과 동료 표를 결과에 맞게 수정함. 창 아래쪽 뾰족한 날, 창 든 팔의 남색 천과 팔 보호대도 고정. 체격은 "최대 거구"보다 날씬하게 생성됨.
- 2026-11-11 `cutin_eirin.png` 확정 (1차): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 에이린 IDENTITY + FACE_FEMALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 거의 프롬프트대로 생성됨. 결과에서 시폰 소매를 고정하는 금색 위팔 띠, V넥 켈트 테두리와 앞트임 덧치마, 윗부분이 갈고리처럼 휜 지팡이가 생성되어 OUTFIT에 고정함. 땋은 머리가 어깨 앞으로 넘어와 있어 백뷰 생성 시 등 뒤로 오도록 지정할 것.
- 2026-11-11 `cutin_scheherazade.png` 1차 생성 (미채택): 베일이 머리 뒤에 걸치는 대신 머리를 감싸고 목·어깨까지 둘러 백뷰에서 날개 뿌리를 가릴 소지(가이드 규칙 10)가 있었고, 핑거 심벌즈 대신 손에 쥐는 큰 심벌즈가 생성됨 → OUTFIT 베일을 `short ... veil hanging only down the back of her head ... not wrapping around her face, neck or shoulders, bare neck and shoulders`로, 심벌즈를 `tiny coin-sized gold finger cymbals (zills) strapped to the thumb and middle finger ..., not large hand-held cymbals`로, POSE_CUTIN을 `snapping the tiny finger cymbals between thumb and middle finger`로 수정.
- 2026-11-11 `cutin_scheherazade.png` 확정 (2차, 1차 덮어씀): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character).` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 셰헤라자드 IDENTITY + FACE_FEMALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 베일과 핑거 심벌즈는 수정한 대로 생성됨. 날개가 첨부한 주인공 날개를 따라 금색 기하학 선 무늬로 생성됨(카탈리나와 같은 현상) — 원칙 3과 충돌하나 생성 횟수를 고려해 사용자 판단으로 채택, 필요 시 추후 재생성. IDENTITY를 결과에 맞게 수정 (생성 당시 `Four jade tinted lacewing wings with fine net-like veins.`). 결과에서 크롭 상의 위 금테 짧은 소매 볼레로, 상의 밑단 동전 술, 허리 스카프 옆 매듭과 금색 술, 손목에 감은 춤 스카프 양끝, 넓은 금색 팔찌가 생성되어 OUTFIT에 고정함 (생성 당시 `a jade green cropped bolero top with gold embroidery`, `hip scarf belt lined with rows of small gold coins and tassels`, `gold arm cuffs`).
- 2026-11-11 `cutin_aleksei.png` 확정 (1차): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character). Do not copy the wings of the attached image; draw the wings exactly as described in the text.` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 알렉세이 IDENTITY + FACE_MALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 날개 지시문(가이드 규칙 1 추가분) 첫 적용 — 날개가 주인공 날개를 따르지 않고 프롬프트대로 눈꽃 무늬로 생성됨. 날개는 나방형보다 끝이 둥근 형태. 결과에서 높은 스탠드 칼라, 코트 테두리 은색 파이핑, 앞판 밑단 눈꽃·덩굴 자수, 옆으로 묶어 늘어뜨린 허리띠, 장화에 넣어 입은 남색 바지, 한쪽 눈을 살짝 가리는 앞머리, 자루까지 얼음 결정인 지팡이가 생성되어 IDENTITY/OUTFIT에 고정함. 지팡이를 앞으로 내지르는 대신 비스듬히 든 선 자세로 생성되어 POSE_CUTIN 수정.
- 2026-11-11 `cutin_daon.png` 확정 (1차): 첨부 `assets/characters/fairy/fairy_base.png`(v4) + 지시문 `Match the art style of the attached image (a different character). Do not copy the wings of the attached image; draw the wings exactly as described in the text.` + LAYER_SPRITE_HEAD + VIEW_ILLUST + 다온 IDENTITY + FACE_FEMALE + OUTFIT + POSE_CUTIN + PALETTE + STYLE_BASE + LAYER_SPRITE_TAIL. 날개는 프롬프트대로 무지갯빛 모르포 날개로 생성됨. 다른 컷인보다 선이 가늘고 파스텔 톤으로 평평하여 STYLE_BASE(굵은 잉크 선, 강한 명암, 붓 터치)가 약하게 반영됨 — 사용자 판단으로 채택, 필요 시 추후 재생성 (재생성 시 `Keep the same thick dark ink outlines and strong chiaroscuro shading as the attached image.` 지시문 추가 검토). 결과에서 정수리를 따라 땋은 머리, 날개 어두운 보라 테두리와 아래 날개의 제비꼬리형 돌기, 저고리 교차 깃(동정), 소매 끝 금색 띠, 무지개 그라데이션 허리띠가 생성되어 IDENTITY/OUTFIT에 고정함. 프리즘 결정이 원형으로 돌지 않고 양옆에 흩어져 생성되어 OUTFIT 소품과 POSE_CUTIN 수정 (생성 당시 `floating in a circle around her`, `guiding the circle of prism crystals around her`).
- 2026-11-11 `cutin_daon.png` 교체 (사용자가 같은 프롬프트로 Gemini에서 새로 뽑은 이미지, 위 1차 덮어씀): 구도·포즈·복장·화풍(파스텔, 가는 선)은 1차와 거의 같음. 결과에서 이마의 마름모 프리즘 보석, 금 꽃송이 화관과 양옆으로 펼친 여러 개의 떨잠, 노리개의 작은 나비 장식, 연한 무지갯빛 투명 결정이 양옆에 호를 그리며 뜬 배치, 가운데 가르마가 생성되어 IDENTITY/OUTFIT에 고정함. 1차 기준으로 고정했던 정수리 땋은 머리는 이번 결과에서 보이지 않아 삭제, 노리개의 프리즘 결정은 나비 장식으로 교체.
- 2026-11-11 `battle_back_kasumi.png` 시험 생성 3회 (모두 미채택, 첨부 `cutin_kasumi.png` + 지시문 `Same character as the attached image.`): 1차 — 몸은 오른쪽을 향하고 고개를 어깨 너머로 돌려 옆얼굴이 보임. 2차 — battle_back에서 FACE 블록 제외 + VIEW_BATTLE_BACK에 몸·머리 방향 일치·얼굴 비노출 문장 추가, 얼굴은 가려졌으나 몸이 오른쪽 위 대각선을 향함 (1차와 구도 거의 동일). 3차 — `Rear back view`로 바꾸고 화면 위쪽으로 곧게 향하는 문장 추가, 방향은 맞았으나 몸통·팔이 날개 위에 그려져 날개가 가슴 쪽에 달린 앞뒤 관계가 됨 (`assets/test/battle_back_kasumi_v3_test.png`). 이후 날개가 등 위(보는 사람 쪽)에 겹쳐 그려지도록 하는 문장을 VIEW_BATTLE_BACK에 추가했으나 생성 전 중단. 사용자 판단으로 다음 세션에 뒷모습 일러를 처음부터(접근 방식 재검토) 다시 시작한다. 체크리스트는 `미생성` 유지.
- 2026-11-12 `battle_back_kasumi.png` 확정 (1차, 첨부 방식): 첨부 `assets/characters/fairy/fairy_battle_back.png` + 지시문(3장 `battle_back` 항목) + LAYER_SPRITE_HEAD + VIEW_BATTLE_BACK + 카스미 IDENTITY_BACK + OUTFIT_BACK + POSE_BATTLE_BACK + PALETTE + STYLE_BASE_BACK + LAYER_SPRITE_TAIL. 주인공의 색·의상 번짐 없음. 단 자세가 기준 백뷰와 거의 같게 생성됨 (무기를 오른쪽 옆에 세워 든 자세, 웅크린 자세 미반영). 같은 블록을 첨부 없이 텍스트로만 생성한 결과는 사용자 판단으로 첨부 결과보다 품질이 낮아 미채택 (파일 미저장). 자세는 추후 개선 여지가 있으면 재시도한다. 최종 프롬프트 전문:
  `Match the art style and composition of the attached image (a different character). Only the camera angle, framing, hovering stance and art style follow the attached image; the character, outfit and colors are entirely different, as described below. Full body character illustration, entire figure inside the frame from head to feet, centered, no text, no letters, no watermark, no borders, no ground shadow, no background effects. Vertical 3:4 portrait composition. Rear three-quarter back view, camera directly behind the character at the character's own height, the character turned away from the viewer and angled toward an opponent far away in the upper right of the screen, 2.5D game sprite. The back is toward the viewer, the head pointing the same direction as the body, toward the upper right. Her back is toward the viewer; only the back of her head and her high ponytail are visible. A lean and agile female fairy, a young adult in her early twenties, 7 heads tall, seen from behind. Long pointed elf ear tips poking out from both sides of the back of her head. Black hair tied in a long high ponytail with a violet hair tie, several violet streaks running through the ponytail, the ponytail swinging behind her. Four large deep violet moth wings with dark eyespot patterns and silver-dusted edges, growing from her upper back between the shoulder blades, spread wide and caught mid-beat. Wearing a fantasy-adapted Japanese kunoichi (female ninja) outfit seen from the back: the back of a short sleeveless dark violet kimono-style wrap top with lavender trim leaving her shoulders bare, a lavender cloth scarf wrapped around her neck with its knot at the side, detached dark violet kimono sleeves tied with lavender ribbon bows at the upper arms and wrists, a black obi sash around her waist with a large black bow knot at the back and long tattered black obi tails flowing down from the back of her waist, a very short dark violet pleated hakama-style skirt with lavender trim, black tekko arm guards with silver plates over black fingerless gloves, black thigh-high stockings with knee-high black kyahan shin guards with silver plates and black split-toe tabi boots seen from behind. Weapons: a short straight ninjato with a violet-wrapped grip and a square guard, and a kunai. No cape or cloak on the shoulders, wings fully visible. Pose: poised battle-ready stance while hovering in place in mid-air, not attacking yet, calmly watching the distant opponent in the upper right, body in a slight low crouch leaning forward, right hand holding the ninjato in a forward grip low at her side with the blade angled toward the opponent, left hand holding a kunai ready near her hip, knees bent with legs hanging below her, wings beating steadily to hover, ponytail and long obi tails swaying gently. Color palette: deep violet, black, silver, lavender. Art style: bold, thick, dark comic ink outlines with sharp chiseled edges on the body, clothing, props and wings (American cartoon inspired dynamic linework), combined with rich vintage European painterly texture, visible gouache and oil brushstrokes, strong dramatic chiaroscuro lighting with deep, clearly defined form shadows on the body and clothing, pronounced volumetric three-dimensional shading. isolated on solid white background`
- 2026-11-12 `battle_back_ada.png` 1차 생성 (미채택, 2차가 덮어씀): 카스미와 같은 첨부 방식. 색·의상 번짐 없음. 단 날개가 첨부 이미지(주인공)의 길쭉하고 뾰족한 잠자리형 날개 모양을 따라 생성되어 색·문양만 에이다 것으로 바뀜 (카스미는 나방 날개로 정상 생성되었으므로 날개 모양이 기준 백뷰와 다른 동료에서 발생). 연미복 뒷자락이 주인공 반망토처럼 발목까지 긴 두 갈래 천으로 생성됨.
- 2026-11-12 `battle_back_ada.png` 확정 (2차): 첨부 `assets/characters/fairy/fairy_battle_back.png` + 지시문(3장 `battle_back` 항목, 날개 문장 포함) + LAYER_SPRITE_HEAD + VIEW_BATTLE_BACK + 에이다 IDENTITY_BACK + OUTFIT_BACK + POSE_BATTLE_BACK + PALETTE + STYLE_BASE_BACK + LAYER_SPRITE_TAIL. 지시문에 `Do not copy the wings of the attached image; draw the wings exactly as described in the text.`를 붙이고 IDENTITY_BACK의 날개를 실제 나비 형태(넓고 둥근 윗날개, 작은 아랫날개)로 구체화하자 나비 날개로 생성됨. 결과에서 아랫날개 끝에 긴 꼬리(호랑나비형)가 생성됨. 연미복 뒷자락은 무릎 길이로 생성됨. 자세는 기준 백뷰와 같음(지팡이를 오른쪽 옆에 세워 듦, 프롬프트도 이에 맞춤). 체형은 5~6등신. 최종 프롬프트 전문:
  `Match the art style and composition of the attached image (a different character). Only the camera angle, framing, hovering stance and art style follow the attached image; the character, outfit and colors are entirely different, as described below. Do not copy the wings of the attached image; draw the wings exactly as described in the text. Full body character illustration, entire figure inside the frame from head to feet, centered, no text, no letters, no watermark, no borders, no ground shadow, no background effects. Vertical 3:4 portrait composition. Rear three-quarter back view, camera directly behind the character at the character's own height, the character turned away from the viewer and angled toward an opponent far away in the upper right of the screen, 2.5D game sprite. The back is toward the viewer, the head pointing the same direction as the body, toward the upper right. Her back is toward the viewer; only the back of her head, her two hair buns and the strap of her goggles are visible. A petite youthful girl fairy, 5 heads tall, seen from behind. Long pointed elf ear tips poking out from both sides of the back of her head. Honey-gold hair in two buns with short loose tails, a brown leather goggle strap with small brass buckles wrapped around the back of her head between the buns. Four opaque metallic golden butterfly wings shaped like a real butterfly's: two broad rounded upper wings with wide scalloped outer edges and two smaller rounded lower wings with short tails, rich golden yellow with intricate embossed clockwork gear filigree patterns, growing from her upper back between the shoulder blades, spread wide and caught mid-beat. Wearing a fantasy-adapted Victorian-era clockmaker outfit seen from the back: the back of a cropped midnight blue tailcoat jacket with short puffed sleeves, the pale yellow high collar of her blouse peeking above it, two long midnight blue coat tails hanging down from the back of the jacket over her skirt, detached midnight blue wrist cuffs with gold vine and star embroidery and gear-shaped buttons, brown leather apron strings tied in a small bow at the back of her waist, a short ruffled midnight blue bustle skirt above the knees with a gathered bustle puff at the back and a honey yellow lace petticoat peeking below, a brass pocket watch hanging from a chain at her hip, midnight blue and grey striped stockings and knee-high brown boots with triple side buckles and small gear ornaments seen from behind. Props: a brass staff topped with a large ornate hourglass with golden sand encircled by brass orrery rings, and an open brass pocket watch on a long gold chain. No cape or cloak on the shoulders, wings fully visible. Pose: poised battle-ready stance while hovering in place in mid-air, not attacking yet, calmly watching the distant opponent in the upper right, right hand holding the hourglass staff upright at her side, left hand holding the open pocket watch on its chain near her hip, legs hanging below her, wings beating steadily to hover, coat tails and bustle skirt swaying gently. Color palette: gold, brass, midnight blue, honey yellow, brown leather. Art style: bold, thick, dark comic ink outlines with sharp chiseled edges on the body, clothing, props and wings (American cartoon inspired dynamic linework), combined with rich vintage European painterly texture, visible gouache and oil brushstrokes, strong dramatic chiaroscuro lighting with deep, clearly defined form shadows on the body and clothing, pronounced volumetric three-dimensional shading. isolated on solid white background`
- 2026-11-12 `battle_back_kasumi.png` 교체 확정 (2차, 1차 덮어씀, 원본 사본 `assets/test/battle_back_kasumi_v4style_test.png`): 사용자 결정으로 주인공은 기준 백뷰 v3를 유지하고 동료만 역동적인 전투 준비 자세로 생성. 첨부 없음(텍스트만). 사용자가 외부 매뉴얼 원칙(자세 블록 최상단, 무기를 손 동작과 결합, 비유·부정어 최소화, 카메라 시점 단일화)으로 작성한 프롬프트 사용. 결과에서 쿠나이를 왼쪽 어깨 높이로 치켜든 고유 자세가 반영되어 주인공과 다른 실루엣 확보, 얼굴 비노출, 품질은 첨부 방식 1차와 대등. 닌자도는 프롬프트(정방향)와 달리 역수로 생성됨. 등에 라벤더 X자 끈(타스키)이 임의 생성됨. 다리는 웅크림보다 도약에 가까움. 블록(POSE_BATTLE_BACK, OUTFIT_BACK) 및 가이드 조합 순서 갱신은 별도 작업으로 진행 예정. 최종 프롬프트 전문:
  `Full body character illustration, vertical 3:4 portrait composition, entire figure inside the frame from head to feet, centered, isolated on solid white background. Low-angle from behind and slightly to her left, rear back view. Pose: tightly compressed mid-air ready stance, locked onto a distant opponent in the upper right. Torso aggressively leaning forward and slightly twisted. Right hand securely gripping a short straight ninjato (violet-wrapped grip, square guard) in a forward grip low at her right side, blade angled sharply forward toward the opponent. Left hand raised high near her left shoulder, tightly holding a single kunai ready to throw. Knees drawn up tightly beneath her torso, legs compressed like a loaded spring while hovering in mid-air. Wings held wide and steady in a powerful hovering beat. Ponytail and long obi tails swaying with intense kinetic tension. A lean and agile female fairy, young adult, 7 heads tall, seen from behind. Back of her head and high ponytail are clearly visible, head pointing toward the upper right. Long pointed elf ear tips poking out. Black hair tied in a long high ponytail with a violet hair tie, several violet streaks running through the ponytail. Four large deep violet moth wings with dark eyespot patterns and silver-dusted edges, growing from her upper back between the shoulder blades. Wearing a fantasy-adapted Japanese kunoichi outfit seen from the back: short sleeveless dark violet kimono-style wrap top with lavender trim leaving her shoulders bare. Lavender cloth scarf wrapped around her neck with its knot at the side. Detached dark violet kimono sleeves tied with lavender ribbon bows at the upper arms and wrists. Black obi sash around her waist with a large black bow knot at the back, long tattered black obi tails hanging down. Very short dark violet pleated hakama-style skirt with lavender trim. Black tekko arm guards with silver plates over black fingerless gloves. Black thigh-high stockings, knee-high black kyahan shin guards with silver plates, and black split-toe tabi boots seen from behind. Color palette: deep violet, black, silver, lavender. Art style: bold, thick, dark comic ink outlines with sharp chiseled edges (American cartoon inspired dynamic linework), combined with rich vintage European painterly texture, visible gouache and oil brushstrokes, strong dramatic chiaroscuro lighting, deep clearly defined form shadows, pronounced volumetric three-dimensional shading. No text, no letters, no watermark, no borders, no ground shadow, no background effects.`
- 2026-11-12 `battle_back_ada.png`는 첨부 방식(기준 백뷰 v3 자세)으로 확정되었으므로, 동료 역동 자세 방침에 따라 재생성 대상.
