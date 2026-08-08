<template>
  <main>
    <h1>Nuxt UI Component Study</h1>
    <p>기본구조와 컴포넌트 설계에대해 학습해보자</p>
    <div>
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

      <p>{{ state }}</p>
    </div>
  </main>
</template>

<script lang="ts" setup>
const state = ref("바뀌기전");
const buttonClick = () => {
  if (state.value === "바뀌기전") {
    state.value = "바뀜";
  } else {
    state.value = "바뀌기전";
  }
};
</script>
