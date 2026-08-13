<template>
  <section class="study-card" aria-labelledby="modal-study-title">
    <div class="study-card__header">
      <div>
        <p class="study-card__step">STEP 6</p>
        <h2 id="modal-study-title">UiModal</h2>
      </div>
      <span class="study-card__status">완료</span>
    </div>

    <p class="study-card__description">
      부모가 열림 상태와 닫기 정책을 소유하고, UiModal이 외부 상태를 네이티브
      dialog 동작으로 표현합니다.
    </p>

    <UiButton @click="isModalOpen = true">모달 열기</UiButton>

    <UiModal
      :open="isModalOpen"
      close-on-backdrop
      @request-close="isModalOpen = false"
    >
      <template #title>기본 모달</template>

      <p>
        Escape, 닫기 버튼과 배경 클릭은 부모에게 닫기를 요청하고, 부모가
        최종 상태를 결정합니다.
      </p>

      <template #actions>
        <UiButton autofocus @click="isModalOpen = false">확인</UiButton>
      </template>
    </UiModal>
  </section>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
</script>
