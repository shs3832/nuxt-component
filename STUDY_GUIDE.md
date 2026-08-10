# Nuxt UI Component Study Guide

이 문서는 새로운 Codex 스레드에서도 동일한 기준으로 Nuxt UI 컴포넌트 학습을 이어가기 위한 프로젝트 가이드다.

## 1. 학습 목표

이 프로젝트는 Nuxt 프론트엔드 전체를 배우는 과정이 아니다. Nuxt 4의 Presentation Tier에서 퍼블리싱 결과물을 재사용 가능한 Vue 컴포넌트로 설계하는 방법을 실습한다.

주요 목표는 다음과 같다.

1. Nuxt 4의 표준 프로젝트 구조와 각 위치의 책임을 이해한다.
2. Semantic HTML과 CSS 기반 UI를 Vue Single-File Component로 구현한다.
3. 공용 UI와 특정 업무를 아는 Presentation Component를 구분한다.
4. Props, Slots, attrs, v-model을 필요한 만큼만 사용해 컴포넌트 API를 설계한다.
5. 공용 UI를 조합해 반복 가능한 페이지 템플릿을 만든다.
6. 회원 관리와 상품 관리 화면에서 실제 재사용성을 검증한다.
7. 반응형 UI, 상태 표현, 키보드 사용성과 웹 접근성을 함께 검증한다.
8. Storybook에서 사용법뿐 아니라 설계 의도와 사용 규칙을 문서화한다.

## 2. 학습 범위

집중해서 다룬다.

- HTML과 CSS
- 반응형 UI
- Semantic HTML
- 웹 접근성
- Vue Component와 SFC
- Props와 Slots
- Fallthrough Attributes와 attrs
- v-model과 defineModel
- UI 상태와 상태 소유권
- Component Composition
- Nuxt Layout과 Page Template
- Storybook

최소한으로만 다룬다.

- API 연결
- Mock 데이터
- Presentation Tier와 API 경계

이번 과정의 주된 범위가 아니다.

- 백엔드 개발
- 인증과 권한 시스템 구현
- Pinia 중심 상태 관리
- 서버 아키텍처
- Nuxt의 모든 기능 학습

### 학습 비중

```text
퍼블리싱과 상태별 UI 구현       70%
컴포넌트 설계와 재사용         20%
Vue/Nuxt 동작 및 개발 연계     10%
```

Nuxt 퍼블리셔의 결과물은 별도 정적 HTML이 아니라 프로젝트에 바로 합칠 수 있는 Vue SFC와 Page Template을 기준으로 한다.

퍼블리셔는 다음 범위를 주도한다.

- Semantic HTML, CSS, 반응형 레이아웃
- 공통 UI의 Props, Slots, 상태별 표현
- Layout과 Page Template의 마크업 및 조립
- Disabled, Loading, Empty, Error 같은 화면 상태
- 폼 마크업, 키보드 사용성과 기본 접근성
- Mock 상태와 Storybook 사용 예시

풀스택 개발자가 주도할 범위는 다음과 같다.

- 실제 API 요청과 데이터 패칭
- 업무 규칙, 인증, 권한과 서버 상태
- 요청 성공, 실패, 재시도와 운영 오류 처리
- `server/`, 데이터 관련 composable, middleware와 플러그인

퍼블리셔는 네이티브 이벤트가 공용 컴포넌트에서 막히지 않는 원리만 이해한다. 단순 이벤트 전달과 `defineEmits` 이론을 반복 실습하지 않으며, 업무 이벤트와 실제 처리 로직은 개발 연계 영역으로 남긴다.

## 3. 공식 문서와 근거 원칙

설명과 구현 방향은 다음 공식 자료를 우선한다.

1. Nuxt 구조, 페이지, 레이아웃, 자동 불러오기: Nuxt 4 공식 문서
2. Vue 컴포넌트, Props, Slots, attrs, v-model: Vue 공식 문서
3. HTML, CSS, 폼 요소: MDN과 웹 표준 문서
4. 접근성 및 키보드 패턴: W3C WAI와 ARIA APG
5. Storybook: Storybook 공식 문서

모든 설명은 가능하면 다음 세 가지를 구분한다.

- **공식 동작:** 프레임워크가 실제로 처리하는 방식
- **공식 권장:** 공식 문서가 명시적으로 권하는 방식
- **프로젝트 설계 선택:** 이 학습 프로젝트에서 비교하고 채택한 규칙

`ui`, `common`, `user`, `product` 같은 `components` 하위 분류는 Nuxt 공식 폴더가 아니라 프로젝트 설계 선택이다.

## 4. 학습 진행 원칙

AI가 완성 코드를 대신 작성하는 방식으로 진행하지 않는다. 학습자가 직접 설계하고 구현하며 AI는 요구사항 제시, 설명, 검증과 리뷰를 담당한다.

### 코드 제공 범위

AI는 학습 가치에 따라 `직접 작성할 코드`와 `그대로 제공할 코드`를 명확히 구분한다.

학습자가 직접 작성한다.

- Props와 컴포넌트의 외부 계약
- 기본값과 상태 조합
- 조건부 클래스와 조건부 렌더링
- Slot의 위치와 조립 방식
- 네이티브 HTML 속성 및 접근성 연결
- 컴포넌트 사용 코드

AI가 필요할 때 바로 제공할 수 있다.

- SVG path와 같은 아이콘 데이터
- 스피너 애니메이션
- 반복적인 크기 및 배치 CSS
- 학습 가치가 낮은 기계적 마크업

AI는 학습자가 직접 작성할 영역에 처음부터 완성 코드를 제시하지 않는다. 먼저 요구사항과 완료 기준을 제시하고, 학습자가 충분히 시도했거나 코드 제공을 요청한 경우에만 해당 예제를 제공한다.

각 단계는 다음 순서를 지킨다.

1. 이번 단계에서 해결할 UI 요구사항을 제시한다.
2. 필요한 개념과 실행 흐름을 짧게 설명한다.
3. 한 번에 처리할 수 있는 작은 구현 과제를 제시한다.
4. 처음부터 전체 정답 코드를 제공하지 않는다.
5. 학습자가 작성한 실제 파일을 확인한다.
6. 정확한 부분, 문제가 되는 부분, 근거를 분리해 설명한다.
7. 먼저 힌트를 주고 학습자가 수정하도록 한다.
8. 충분히 시도했거나 요청한 경우에만 예제 코드를 제공한다.
9. 구현 후 컴포넌트 설계와 접근성 관점에서 리뷰한다.
10. 학습자가 `다음 단계`라고 말하기 전에는 다음 단계로 진행하지 않는다.

질문과 확인은 가능하면 다음 흐름으로 진행한다.

```text
질문 하나
→ 학습자 답변
→ 정확도와 공식 근거 확인
→ 다음 질문 또는 작은 실습
```

코드와 파일은 학습자의 명확한 수정 요청 전까지 AI가 수정하지 않는다.

## 5. 설명할 때 확인할 네 가지

새로운 Nuxt/Vue 동작을 설명할 때 다음을 우선 명확히 한다.

- **주체:** 브라우저, Nuxt 서버, Vue 컴포넌트 중 누가 처리하는가?
- **실행 위치:** 서버와 브라우저 중 어디에서 실행되는가?
- **요청 흐름:** 어떤 파일과 컴포넌트를 거치는가?
- **검증 증거:** 브라우저, 페이지 소스, DOM, 타입 파일 등 어디서 확인할 수 있는가?

## 6. Nuxt 표준 구조

Nuxt 4의 표준 위치를 우선 사용한다.

```text
app/
├── assets/
├── components/
├── composables/
├── layouts/
├── pages/
├── utils/
└── app.vue

public/
nuxt.config.ts
package.json
tsconfig.json
```

기본 책임은 다음과 같다.

- `app/app.vue`: Vue 애플리케이션의 루트 컴포넌트
- `app/pages/`: 파일 경로를 URL로 연결하는 페이지
- `app/components/`: 화면에 렌더링되는 Vue 컴포넌트
- `app/layouts/`: 여러 페이지를 감싸는 공통 화면 골격
- `app/composables/`: Vue 반응형 상태와 동작의 재사용
- `app/utils/`: Vue 상태와 관계없는 일반 함수
- `app/assets/`: Vite가 처리할 CSS, 이미지 등의 원본 리소스
- `public/`: 정해진 URL로 가공 없이 제공할 파일
- `nuxt.config.ts`: Nuxt 프로젝트 전체 설정

`.nuxt`, `.output`, `node_modules`는 직접 수정하는 소스 폴더가 아니다.

## 7. 컴포넌트 책임 모델

기본 방향은 다음과 같다.

```text
UI Component
↓
Common 또는 Composite Component
↓
업무용 Presentation Component
↓
Page
```

예상 조립 구조:

```text
UiInput / UiSelect / UiButton
↓
UserSearchForm / ProductSearchForm
↓
pages/users/index.vue / pages/products/index.vue
```

### UI Component

- 회원, 상품, 주문 같은 업무 도메인을 모른다.
- HTML 요소의 의미와 기본 기능을 최대한 유지한다.
- 상태, 접근성, 반응형 표현을 일관되게 제공한다.
- 예: `UiButton`, `UiInput`, `UiSelect`, `UiTable`, `UiModal`

### 업무용 Presentation Component

- 특정 페이지 안의 하나의 UI 기능을 그룹화한다.
- 업무 용어와 검색 조건 같은 Presentation 요구사항을 알 수 있다.
- API 호출과 서버 로직을 공용 UI 안에 넣지 않는다.
- 전체 서비스 공용은 아니지만 같은 업무 범위에서는 재사용할 수 있다.
- 예: `UserSearchForm`, `ProductSearchForm`, `UserTable`

### 공통화 원칙

기본 UI 공통화는 먼저 진행할 수 있지만, 조합 구조의 공통화는 실제 사용처를 비교한 뒤 결정한다.

```text
첫 화면에서 비슷해 보인다
≠
공통 컴포넌트로 만들어야 한다
```

회원 관리와 상품 관리에서 구조, 변경 이유, 반응형 규칙이 실제로 같을 때 `SearchForm`이나 `ListPageTemplate` 추출을 검토한다.

## 8. 컴포넌트 설계 리뷰 기준

모든 컴포넌트를 다음 질문으로 검토한다.

1. 정말 별도 컴포넌트로 분리할 필요가 있는가?
2. 정말 공용 컴포넌트인가?
3. 재사용 범위가 전체 서비스인지 특정 업무인지 명확한가?
4. Props가 지나치게 많지 않은가?
5. 콘텐츠를 Props로 고정하기보다 Slot이 더 적절하지 않은가?
6. UI 컴포넌트가 업무 로직이나 API를 알고 있지 않은가?
7. 상태는 현재 컴포넌트와 부모 중 어디에서 소유해야 하는가?
8. HTML 기본 attribute와 이벤트를 불필요하게 막고 있지 않은가?
9. Semantic HTML이 적절한가?
10. 키보드와 보조기기 사용을 고려했는가?
11. 반응형 구조가 특정 페이지에 지나치게 종속되지 않았는가?
12. 새로운 페이지에서 수정 없이 사용할 수 있는가?
13. 실제 필요보다 추상화가 앞서지 않았는가?

## 9. 실습과 검증 흐름

```text
디자인 및 UI 요구사항
→ Semantic HTML과 CSS 구현
→ 반응형 및 상태별 표현
→ 컴포넌트 경계 검토
→ 필요한 만큼만 Props, Slots, attrs, v-model 설계
→ 브라우저 검증
→ 첫 번째 페이지에서 조립
→ 두 번째 페이지에서 재사용
→ 공통화 유지 또는 철회
→ Storybook 문서화
```

브라우저 검증에는 필요에 따라 다음을 포함한다.

- 실제 렌더링 결과
- 페이지 소스의 서버 렌더링 HTML
- 개발자 도구의 최종 DOM
- 키보드 탐색과 focus-visible
- 반응형 화면
- Disabled, Loading, Empty, Error 상태
- Nuxt가 생성한 컴포넌트 타입과 자동 불러오기 결과

## 10. 전체 학습 순서

1. Nuxt 4 프로젝트 구조
2. `UiButton`
3. `UiInput`, `UiSelect`, `UiCheckbox`
4. 검색 영역 조합
5. `UiTable`과 Pagination
6. Modal과 상태 UI
7. Nuxt Layout
8. `ListPageTemplate`
9. 회원 관리 페이지
10. 상품 관리 페이지와 첫 재사용성 검증
11. API 경계 확인
12. Storybook 문서화
13. 전체 리팩터링

각 단계의 요구사항은 한 번에 모두 구현하지 않고 작은 단위로 추가한다.

## 11. 단계 종료 형식

각 STEP이 끝나면 다음 형식으로 정리한다.

```text
### 이번 단계에서 배운 것

### 현재 프로젝트 구조

### 설계상 잘한 점

### 개선할 점

### 다음 단계
```

정리가 끝난 뒤 학습자가 `다음 단계`라고 말할 때까지 기다린다.

## 12. 현재 상태

기준일: 2026-08-10

### 설치 환경

- Nuxt `4.5.2`
- Vue `3.5.41` 설치
- Node.js `24.14.0`
- npm 사용
- Git 저장소와 GitHub 원격 저장소 연결 완료
- `main` 브랜치 사용
- 원격 저장소: `https://github.com/shs3832/nuxt-component.git`

### 현재 소스 구조

```text
app/
├── app.vue
├── assets/
│   └── css/
│       └── study.css
├── components/
│   ├── product/
│   │   └── ProductSearchForm.vue
│   ├── search/
│   │   └── SearchForm.vue
│   ├── study/
│   │   ├── ButtonSection.vue
│   │   ├── FormControlsSection.vue
│   │   ├── SearchFormSection.vue
│   │   └── TableSection.vue
│   ├── ui/
│   │   ├── UiButton.vue
│   │   ├── UiCheckbox.vue
│   │   ├── UiInput.vue
│   │   ├── UiPagination.vue
│   │   ├── UiSelect.vue
│   │   └── UiTable.vue
│   └── user/
│       └── UserSearchForm.vue
└── pages/
    └── index.vue

public/
├── favicon.ico
└── robots.txt
```

### 완료한 내용

- STEP 1의 Nuxt 기본 구조 학습 완료
- `app.vue`, `<NuxtPage />`, `pages/index.vue`의 책임 구분
- `/` 파일 기반 라우팅 확인
- 서버 렌더링 HTML을 `view-source:`에서 확인
- Hydration 이후 브라우저 상호작용이 연결되는 원리 확인
- `assets`와 `public`의 차이 확인
- `components`, `layouts`, `composables`, `utils`의 책임 확인
- Nuxt 표준 폴더와 프로젝트 내부 설계 규칙의 차이 확인
- STEP 2 `UiButton` 구현과 브라우저 검증 완료
- `variant`, `size`, `disabled`, `loading`, `iconOnly` Props 구현
- Default, `leading`, `trailing` Slot 구현
- 스피너, 아이콘 크기, `:slotted()`, reduced motion 적용
- HTML attribute, class와 네이티브 listener의 fallthrough 확인
- 아이콘 전용 버튼의 `aria-label`, `aria-busy`, `aria-hidden` 확인
- `:focus-visible`, Enter와 Space 실행, 비활성 버튼의 포커스 제외 확인
- Primary, Secondary, Danger 텍스트 대비와 포커스 표시 대비 확인
- 공용 UI는 업무 로직을 모르고 부모 또는 업무용 Presentation Component가 실제 처리를 소유한다는 경계 확인
- STEP 3 `UiInput`, `UiSelect`, `UiCheckbox` 구현 완료
- 입력 코어 UI는 네이티브 요소를 루트로 사용하고 `defineModel`로 `v-model` 계약 제공
- `disabled`, `required`, `name`, `id` 등은 fallthrough attributes로 전달
- 시각적 오류 상태와 `aria-invalid`를 연결하는 `invalid` Prop 구현
- label, 안내 문구, 오류 메시지, 옵션과 실제 검증 조건은 상위 사용처가 소유
- STEP 4 검색 영역 조합 완료
- `SearchForm`이 form, 검색·초기화 이벤트, 버튼과 공통 반응형 배치를 소유
- `UserSearchForm`, `ProductSearchForm`이 도메인별 필드, label, 옵션과 필드 배치를 소유
- 페이지가 현재 검색 조건, 초기화와 마지막 검색 조건 스냅샷을 소유
- `useId()`로 컴포넌트 인스턴스마다 고유한 label/control 연결 구현
- 회원·상품의 두 번째 사용처에서 공통 `SearchForm`의 실제 재사용 가능성 확인
- 확인된 반복만 공통화하고 슬롯 내부 스타일은 도메인 컴포넌트에 남기는 경계 채택
- 컴포넌트 이벤트는 버블링되지 않으므로 도메인 폼이 `search`, `reset`을 명시적으로 재전달
- `pages/index.vue`의 학습 예제를 `components/study`의 영역별 컴포넌트로 분리
- Nuxt 기본 컴포넌트 자동 등록에서 폴더명과 파일명이 조합된 이름을 사용하는 방식 확인
- STEP 5 `UiTable`, `UiPagination` 구현과 브라우저 검증 완료
- `UiTable`은 가로 스크롤 컨테이너, 공통 table 스타일과 기본 Slot만 소유
- 열, 셀, `caption` 또는 `aria-labelledby`, `scope` 같은 테이블 의미 구조는 사용처가 소유
- `$attrs`를 내부 `table`에 명시적으로 전달해 `aria-labelledby`, `aria-busy` 연결
- `:slotted()`로 슬롯의 직접 자식인 `thead`, `tbody` 영역에 공통 스타일 적용
- Loading → Empty → Data 순서로 상태를 분기하고 로딩 메시지에 `role="status"` 적용
- table은 최소 너비를 유지하고 바깥 컨테이너가 가로 스크롤을 제공하도록 구현
- Grid 자식인 카드에 `min-width: 0`을 적용해 테이블 영역 안에서 스크롤되는 동작 확인
- `UiPagination`은 외부의 `page` 상태와 `totalPages`를 계약으로 받고 이전·다음 이동만 표현
- 목록 사용처가 전체 페이지 수와 현재 페이지 데이터를 계산하는 클라이언트 Mock 페이지네이션 구현
- 최초 로딩에서는 행을 상태 메시지로 대체하고 페이지 이동에서는 데이터를 교체하는 상태 전략 비교
- API 요청, 서버 페이지네이션과 URL 동기화는 구현하지 않음
- `npm run build` 성공

### 현재 요청 흐름

```text
GET /
→ Nuxt가 app/pages를 스캔해 경로 선택
→ app/app.vue
→ <NuxtPage />
→ app/pages/index.vue
→ 서버가 HTML 생성
→ 브라우저가 Hydration으로 상호작용 연결
```

### 다음 시작점

다음 단계는 `STEP 6 — Modal과 상태 UI`이다.

먼저 Modal을 단순한 시각 레이어가 아니라 키보드와 포커스까지 포함한 상호작용 구조로 보고, 공통 컴포넌트와 사용처의 책임을 결정한다.

```text
네이티브 dialog와 직접 구현 방식 비교
→ 열기·닫기 상태의 소유 위치 결정
→ 제목, 설명과 접근성 이름 연결
→ Escape, 배경 클릭과 닫기 정책
→ 열린 뒤의 포커스와 닫힌 뒤의 포커스 복귀
→ Loading, Empty, Error 같은 상태 UI의 공통화 범위 검토
```

인증, API 요청과 실제 업무 처리는 아직 구현하지 않는다. 첫 실습에서는 완성 코드를 제공하지 않고, Modal 코어가 열림 상태까지 소유할지 또는 외부 상태 계약으로 받을지부터 비교한다.

## 13. 새 스레드에서 이어가는 방법

새 스레드는 먼저 이 문서를 읽고 현재 실제 파일을 필요한 범위에서 확인한다. 문서 내용과 실제 프로젝트가 다르면 실제 파일을 우선하되 차이를 설명한다.

새 스레드의 첫 행동:

1. `STUDY_GUIDE.md`에서 학습 원칙과 현재 상태를 확인한다.
2. `package.json`, `app/components/ui/UiTable.vue`, `UiPagination.vue`, `app/components/study/TableSection.vue`와 `app/pages/index.vue`를 필요한 범위에서 확인한다.
3. 학습자의 질문이 남아 있으면 먼저 답한다.
4. 테이블 구현을 반복하지 않고 Modal의 상태, 포커스, 키보드 동작과 책임 분리에 집중한다.
5. 다음 시작점은 `STEP 6 — Modal과 상태 UI`의 열림 상태 책임 결정이다.
6. 학습자가 `다음 단계`라고 말할 때만 구현 과제를 시작한다.
7. 코드 수정은 학습자의 명확한 수정 요청 전까지 하지 않는다.
