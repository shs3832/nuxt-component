<template>
  <input
    class="ui-input"
    v-model="model"
    :class="props.invalid && 'ui-input--invalid'"
    :aria-invalid="props.invalid"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    invalid?: boolean;
  }>(),
  {
    invalid: false,
  },
);

const model = defineModel<string>();
</script>

<style scoped>
.ui-input {
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
  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid deeppink;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[readonly] {
    background-color: #f3f4f6;
    border-color: #9ca3af;
    color: #374151;
  }
}
.ui-input--invalid {
  border-color: #dc2626;
}
</style>
