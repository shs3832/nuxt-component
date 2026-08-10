<template>
  <form
    role="search"
    @submit.prevent="emit('search')"
    @reset.prevent="emit('reset')"
    class="search-form"
  >
    <slot></slot>
    <div class="search-form__actions">
      <UiButton type="reset" variant="secondary" class="search-form__action">
        초기화
      </UiButton>
      <UiButton type="submit" class="search-form__action">검색</UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  search: [];
  reset: [];
}>();
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.search-form__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}
.search-form__action {
  @media (max-width: 720px) {
    flex: 1;
  }
}
</style>
