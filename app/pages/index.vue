<template>
  <main class="study-page">
    <header class="study-hero">
      <p class="study-hero__eyebrow">NUXT 4 · PRESENTATION TIER</p>
      <h1>UI Component Study</h1>
      <p class="study-hero__description">
        공통 UI의 책임과 상태를 직접 구현하고 검증하는 컴포넌트 실습실입니다.
      </p>
    </header>

    <div class="study-grid">
      <section class="study-card" aria-labelledby="button-study-title">
        <div class="study-card__header">
          <div>
            <p class="study-card__step">STEP 2</p>
            <h2 id="button-study-title">UiButton</h2>
          </div>
          <span class="study-card__status">완료</span>
        </div>

        <p class="study-card__description">
          variant, size, loading과 Slot 조합을 한눈에 비교합니다.
        </p>

        <div class="button-showcase">
          <UiButton
            id="save"
            title="저장버튼"
            data-save
            class="btn-save"
            @click="buttonClick"
          >
            저장
          </UiButton>
          <UiButton variant="secondary" size="small">취소</UiButton>
          <UiButton variant="danger" size="large">삭제</UiButton>
          <UiButton disabled>비활성</UiButton>
          <UiButton loading>저장</UiButton>
          <UiButton>
            <template #leading>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </template>
            새 항목
          </UiButton>

          <UiButton icon-only aria-label="새 항목">
            <template #leading>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </template>
          </UiButton>
        </div>

        <p class="study-output">
          <span>클릭 상태</span>
          <code>{{ state }}</code>
        </p>
      </section>

      <section class="study-card" aria-labelledby="input-study-title">
        <div class="study-card__header">
          <div>
            <p class="study-card__step">STEP 3</p>
            <h2 id="input-study-title">UiInput</h2>
          </div>
          <span class="study-card__status">완료</span>
        </div>

        <p class="study-card__description">
          동일한 모델을 공유하며 기본, 비활성, 읽기 전용 상태를 비교합니다.
        </p>

        <div class="field-grid">
          <div class="field-demo">
            <div class="field-demo__header">
              <label for="input">기본 입력</label>
              <span>Default</span>
            </div>
            <UiInput
              id="input"
              name="input"
              type="text"
              class="field-demo__control"
              placeholder="텍스트 입력"
              autocomplete="off"
              v-model="inputMessage"
            />
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ inputMessage }}</code>
            </p>
          </div>

          <div class="field-demo">
            <div class="field-demo__header">
              <label for="input2">비활성 입력</label>
              <span>Disabled</span>
            </div>
            <UiInput
              id="input2"
              name="input2"
              type="text"
              class="field-demo__control"
              placeholder="텍스트 입력"
              autocomplete="off"
              v-model="inputMessage"
              disabled
            />
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ inputMessage }}</code>
            </p>
          </div>

          <div class="field-demo">
            <div class="field-demo__header">
              <label for="input3">읽기 전용 입력</label>
              <span>Readonly</span>
            </div>
            <UiInput
              id="input3"
              name="input3"
              type="text"
              class="field-demo__control"
              placeholder="텍스트 입력"
              autocomplete="off"
              v-model="inputMessage"
              readonly
            />
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ inputMessage }}</code>
            </p>
          </div>

          <form
            class="field-demo field-demo--validation"
            @submit.prevent="handleSubmit"
            novalidate
          >
            <div class="field-demo__header">
              <label for="inputReq2">필수 입력</label>
              <span>Invalid</span>
            </div>
            <UiInput
              id="inputReq2"
              name="inputReq2"
              type="text"
              class="field-demo__control"
              placeholder="값을 입력해주세요"
              autocomplete="off"
              v-model="inputMessageRequired"
              required
              :invalid="isInvalid"
              :aria-describedby="isInvalid ? 'inputReq2-error' : undefined"
            />
            <p v-if="isInvalid" id="inputReq2-error" class="field-demo__error">
              필수 입력 항목입니다.
            </p>
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ inputMessageRequired || "빈 문자열" }}</code>
            </p>
            <button class="validation-submit" type="submit">검증하기</button>
          </form>
        </div>
      </section>

      <section class="study-card" aria-labelledby="select-study-title">
        <div class="study-card__header">
          <div>
            <p class="study-card__step">STEP 3</p>
            <h2 id="select-study-title">UiSelect</h2>
          </div>
          <span class="study-card__status">완료</span>
        </div>

        <p class="study-card__description">
          네이티브 선택 동작을 유지하며 기본, 비활성, 오류 상태를 비교합니다.
        </p>

        <div class="field-grid">
          <div class="field-demo">
            <div class="field-demo__header">
              <label for="selectBox1">상태 선택</label>
              <span>Default</span>
            </div>
            <UiSelect
              id="selectBox1"
              name="selectBox1"
              class="field-demo__control"
              v-model="inputSelect"
            >
              <option value="">전체</option>
              <option value="active">사용중</option>
              <option value="inactive">사용중지</option>
            </UiSelect>
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ inputSelect || "빈 문자열" }}</code>
            </p>
          </div>

          <div class="field-demo">
            <div class="field-demo__header">
              <label for="selectBox2">비활성 상태 선택</label>
              <span>Disabled</span>
            </div>
            <UiSelect
              id="selectBox2"
              name="selectBox2"
              class="field-demo__control"
              v-model="inputSelect"
              disabled
            >
              <option value="">전체</option>
              <option value="active">사용중</option>
              <option value="inactive">사용중지</option>
            </UiSelect>
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ inputSelect || "빈 문자열" }}</code>
            </p>
          </div>

          <div class="field-demo field-demo--validation">
            <div class="field-demo__header">
              <label for="selectBox3">필수 상태 선택</label>
              <span>Invalid</span>
            </div>
            <UiSelect
              id="selectBox3"
              name="selectBox3"
              class="field-demo__control"
              v-model="inputSelect"
              required
              :invalid="true"
              aria-describedby="inputSelect-error"
            >
              <option value="">선택해주세요</option>
              <option value="active">사용중</option>
              <option value="inactive">사용중지</option>
            </UiSelect>
            <p id="inputSelect-error" class="field-demo__error">
              필수 선택 항목입니다.
            </p>
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ inputSelect || "빈 문자열" }}</code>
            </p>
          </div>
        </div>
      </section>

      <section class="study-card" aria-labelledby="checkbox-study-title">
        <div class="study-card__header">
          <div>
            <p class="study-card__step">STEP 3</p>
            <h2 id="checkbox-study-title">UiCheckbox</h2>
          </div>
          <span class="study-card__status">완료</span>
        </div>

        <p class="study-card__description">
          boolean 모델을 기준으로 기본, 선택, 비활성, 오류 상태를 비교합니다.
        </p>

        <div class="field-grid">
          <div class="field-demo">
            <div class="field-demo__header">
              <strong>기본 체크박스</strong>
              <span>Default</span>
            </div>
            <label class="checkbox-demo__label">
              <UiCheckbox v-model="agreed" />
              <span>이메일 알림을 받습니다.</span>
            </label>
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ agreed }}</code>
            </p>
          </div>

          <div class="field-demo">
            <div class="field-demo__header">
              <strong>선택된 체크박스</strong>
              <span>Checked</span>
            </div>
            <label class="checkbox-demo__label">
              <UiCheckbox v-model="agreedChecked" />
              <span>이용약관에 동의합니다.</span>
            </label>
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ agreedChecked }}</code>
            </p>
          </div>

          <div class="field-demo">
            <div class="field-demo__header">
              <strong>비활성 체크박스</strong>
              <span>Disabled</span>
            </div>
            <label class="checkbox-demo__label checkbox-demo__label--disabled">
              <UiCheckbox v-model="agreedDisabled" disabled />
              <span>선택할 수 없는 항목입니다.</span>
            </label>
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ agreedDisabled }}</code>
            </p>
          </div>

          <div class="field-demo field-demo--validation">
            <div class="field-demo__header">
              <strong>필수 체크박스</strong>
              <span>Invalid</span>
            </div>
            <label class="checkbox-demo__label">
              <UiCheckbox
                v-model="agreedRequired"
                required
                :invalid="true"
                aria-describedby="inputCheckbox-error"
              />
              <span>개인정보 수집에 동의합니다.</span>
            </label>
            <p id="inputCheckbox-error" class="field-demo__error">
              필수 동의 항목입니다.
            </p>
            <p class="field-demo__value">
              <span>v-model</span>
              <code>{{ agreedRequired }}</code>
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
const inputMessage = ref("test message");
const inputMessageRequired = ref("");
const inputSelect = ref("");
const hasSubmitted = ref(false);
const isInvalid = computed(() => {
  return inputMessageRequired.value.trim() === "" && hasSubmitted.value;
});
const state = ref("바뀌기전");
const agreed = ref(false);
const agreedChecked = ref(true);
const agreedDisabled = ref(false);
const agreedRequired = ref(false);
const buttonClick = () => {
  if (state.value === "바뀌기전") {
    state.value = "바뀜";
  } else {
    state.value = "바뀌기전";
  }
};

const handleSubmit = () => {
  hasSubmitted.value = true;
};
</script>

<style scoped>
:global(body) {
  margin: 0;
  background: #f4f7fb;
}

.study-page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: clamp(32px, 6vw, 72px) clamp(20px, 4vw, 48px);
  color: #172033;
  font-family:
    Inter,
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.study-hero,
.study-grid {
  width: min(100%, 1120px);
  margin-inline: auto;
}

.study-hero {
  margin-bottom: 32px;
}

.study-hero__eyebrow,
.study-card__step {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.study-hero h1 {
  margin: 0;
  font-size: clamp(36px, 6vw, 64px);
  line-height: 1;
  letter-spacing: -0.04em;
}

.study-hero__description {
  max-width: 620px;
  margin: 18px 0 0;
  color: #5b6475;
  font-size: 16px;
  line-height: 1.7;
}

.study-grid {
  display: grid;
  gap: 24px;
}

.study-card {
  padding: clamp(24px, 4vw, 36px);
  border: 1px solid #dfe5ef;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 50px rgb(39 55 83 / 8%);
}

.study-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.study-card__header h2 {
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.03em;
}

.study-card__status {
  flex: 0 0 auto;
  padding: 6px 10px;
  border-radius: 999px;
  background: #ecfdf3;
  color: #067647;
  font-size: 12px;
  font-weight: 700;
}

.study-card__status--progress {
  background: #eff6ff;
  color: #1d4ed8;
}

.study-card__description {
  margin: 14px 0 24px;
  color: #667085;
  line-height: 1.6;
}

.button-showcase {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-radius: 14px;
  background: #f8fafc;
}

.study-output,
.field-demo__value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 16px 0 0;
  color: #667085;
  font-size: 13px;
}

.study-output code,
.field-demo__value code {
  overflow: hidden;
  color: #1d4ed8;
  font-family: "SFMono-Regular", Consolas, monospace;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field-demo {
  min-width: 0;
  padding: 20px;
  border: 1px solid #e4e9f1;
  border-radius: 14px;
  background: #fbfcfe;
}

.field-demo--validation {
  background: #fffafa;
}

.field-demo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.field-demo__header label,
.field-demo__header strong {
  color: #253047;
  font-size: 14px;
  font-weight: 700;
}

.field-demo__header span {
  color: #98a2b3;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.field-demo__control {
  width: 100%;
}

.checkbox-demo__label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 32px;
  color: #344054;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.checkbox-demo__label--disabled {
  color: #98a2b3;
  cursor: not-allowed;
}

.field-demo__error {
  margin: 8px 0 0;
  color: #b42318;
  font-size: 13px;
  font-weight: 600;
}

.validation-submit {
  width: 100%;
  min-height: 40px;
  margin-top: 16px;
  border: 0;
  border-radius: 8px;
  background: #172033;
  color: #ffffff;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.validation-submit:hover {
  background: #253047;
}

.validation-submit:focus-visible {
  outline: 3px solid #60a5fa;
  outline-offset: 3px;
}

@media (max-width: 720px) {
  .study-card {
    border-radius: 16px;
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  .button-showcase {
    padding: 18px;
  }
}
</style>
