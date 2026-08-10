<template>
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
</template>

<script setup lang="ts">
const inputMessage = ref("test message");
const inputMessageRequired = ref("");
const inputSelect = ref("");
const hasSubmitted = ref(false);
const isInvalid = computed(() => {
  return inputMessageRequired.value.trim() === "" && hasSubmitted.value;
});
const agreed = ref(false);
const agreedChecked = ref(true);
const agreedDisabled = ref(false);
const agreedRequired = ref(false);

const handleSubmit = () => {
  hasSubmitted.value = true;
};
</script>
