<template>
  <select
    class="ui-select"
    v-model="select"
    :class="props.invalid && 'ui-select--invalid'"
    :aria-invalid="props.invalid"
  >
    <slot></slot>
  </select>
</template>

<script setup lang="ts">
const select = defineModel<string>();

const props = withDefaults(
  defineProps<{
    invalid?: boolean;
  }>(),
  {
    invalid: false,
  },
);
</script>

<style scoped>
.ui-select {
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid;
  min-height: 40px;
  padding: 0 12px;
  font-family: inherit;
  font-size: 16px;
  background-color: #ffffff;
  color: #1f2937;
  border-color: #6b7280;
  appearance: none;
  padding-right: 40px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px 16px;
  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid deeppink;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.ui-select--invalid {
  border-color: #dc2626;
}
</style>
