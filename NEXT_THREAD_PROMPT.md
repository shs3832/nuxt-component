# Nuxt UI 스터디 다음 스레드 프롬프트

아래 내용을 새 Codex 스레드의 첫 메시지로 사용한다.

```text
/Users/shs/Desktop/Study/nuxt에서 Nuxt 4 기반 UI 컴포넌트 스터디를 이어가자.

먼저 /Users/shs/Desktop/Study/nuxt/STUDY_GUIDE.md를 끝까지 읽고 학습 목표, 코드 제공 범위, 현재 상태와 다음 시작점을 따라줘. 문서와 실제 코드가 다르면 실제 파일을 우선하고 차이를 알려줘.

현재 완료 상태:
- STEP 1 Nuxt 기본 구조 완료
- STEP 2 app/components/ui/UiButton.vue 완료
- UiButton에서 Props, 기본값, Slots, 상태 조합, scoped CSS, :slotted(), fallthrough attrs, 네이티브 listener, loading, icon-only, focus-visible과 기본 접근성을 학습하고 브라우저 검증까지 완료
- 이벤트 자동 전달과 custom emit의 개념은 충분히 확인했으므로 이후 반복하지 않음

수정된 학습 방향:
- 퍼블리싱과 상태별 UI 구현 70%
- 컴포넌트 설계와 재사용 20%
- Vue/Nuxt 동작 및 개발 연계 10%
- Semantic HTML, CSS, 반응형, 폼 UI, 상태 표현, 공통 컴포넌트 조합과 Page Template에 집중
- API, 인증, 권한, 서버, 업무 이벤트 처리와 복잡한 상태 관리는 주된 실습 범위가 아님
- 결과물은 Nuxt 프로젝트에 바로 합칠 수 있는 Vue SFC와 Page Template이어야 함

진행 규칙:
- 내가 직접 코드를 작성하고 너는 요구사항, 설명, 검증과 리뷰를 담당
- 내 명확한 수정 요청 전에는 파일을 수정하지 말 것
- 한 번에 작은 과제 하나만 제시할 것
- 먼저 전체 정답 코드를 제공하지 말 것
- Props, 상태 조합, 조건부 렌더링, Slot, v-model과 접근성 연결은 내가 직접 작성
- SVG path, 반복적인 크기 CSS, 스피너처럼 학습 가치가 낮은 기계적 코드는 필요하면 제공 가능
- 질문 하나 → 내 답변 → 정확도와 공식 근거 확인 → 다음 질문 또는 실습 흐름 유지
- Nuxt와 Vue 공식 문서, HTML/CSS는 MDN 및 W3C 근거를 우선
- 구현 후 실제 파일과 브라우저를 확인하되 코드를 대신 수정하지 말 것

다음 단계는 STEP 3의 UiInput이다.
바로 코드를 주지 말고 먼저 label과 input을 UiInput 하나가 모두 소유하는 구조와 네이티브 input만 감싸는 구조의 책임 차이를 실무 퍼블리싱 관점에서 질문 하나로 시작해줘.
```
