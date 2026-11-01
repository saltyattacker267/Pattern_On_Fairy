# Mobile Game Prototype Development Guidelines

## 1. Core Principles
- **Prototype First:** 불필요한 오버엔지니어링을 지양하고, 기획서에 명시된 핵심 메커니즘 검증을 최우선으로 구현한다.
- **Incremental Changes:** 한 번에 광범위한 리팩터링을 진행하지 말 것. 단일 컴포넌트 단위로 변경 및 검증을 거친다.
- **Code Preservation:** 기존에 구현된 정상 로직, 주석, 인터페이스를 임의로 생략하거나 축약하지 않는다.

## 2. Mobile Architecture & Optimization Rules
- **GC Allocation Control:** Update/Tick 루프 및 프레임 단위 메서드 내부에서 동적 객체 생성(`new`), 문자열 연산(`+`), 무분별한 컬렉션 재할당을 금지한다.
- **Object Pooling:** 빈번하게 생성/제거되는 엔티티(투사체, 피격 효과, 플로팅 텍스트 등)는 풀링 패턴을 적용한다.
- **UI & Logic Decoupling:** 코어 게임 로직은 UI 요소를 직접 제어하지 않으며, 이벤트 또는 콜백을 통해서만 상태 변경을 전파한다.
- **Data-Driven Balance:** 데미지, 속도, 쿨다운 등 밸런스 수치는 로직 내 하드코딩하지 않고 데이터 객체(JSON/Config)로 분리한다.
- **Safe Area & Inputs:** 모바일 해상도 대응(Safe Area 패딩 고려) 및 고스트 터치/중복 입력 방지 처리를 기본 적용한다.

## 3. External Services & Asset Policy
- **Gemini API:** 이미지 에셋 생성이 필요한 경우 `.env`의 `GEMINI_API_KEY`를 활용하는 스크립트를 거치도록 하며, API 키를 코드에 직접 노출하지 않는다.
- **No Mock Libraries:** 프로젝트에 실제 설치되지 않은 가상 패키지나 검증되지 않은 외부 의존성을 임의로 추가하지 않는다.