<template>
  <nav aria-label="페이지 탐색" class="ui-pagination">
    <UiButton
      type="button"
      :disabled="page <= 1"
      @click="handlePrev"
      variant="secondary"
      size="small"
    >
      이전
    </UiButton>
    <span class="ui-pagination__status" aria-live="polite">
      현재 페이지 {{ page }} / 전체 페이지
      {{ totalPages }}
    </span>
    <UiButton
      type="button"
      :disabled="page >= totalPages"
      @click="handleNext"
      variant="secondary"
      size="small"
    >
      다음
    </UiButton>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
}>();
const page = defineModel<number>("page", {
  required: true,
});

const handlePrev = () => {
  if (page.value <= 1) return;
  page.value = page.value - 1;
};
const handleNext = () => {
  if (page.value >= props.totalPages) return;
  page.value = page.value + 1;
};
</script>

<style scoped>
.ui-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.ui-pagination__status {
  min-width: 120px;
  color: #475467;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}
</style>
