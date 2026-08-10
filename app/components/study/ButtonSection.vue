<template>
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
</template>

<script setup lang="ts">
const state = ref("바뀌기전");

const buttonClick = () => {
  if (state.value === "바뀌기전") {
    state.value = "바뀜";
  } else {
    state.value = "바뀌기전";
  }
};
</script>
