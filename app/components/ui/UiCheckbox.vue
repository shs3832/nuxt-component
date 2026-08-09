<template>
  <input
    type="checkbox"
    class="ui-checkbox"
    v-model="checked"
    :class="props.invalid && 'ui-checkbox--invalid'"
    :aria-invalid="props.invalid"
  />
</template>

<script setup lang="ts">
const checked = defineModel<boolean>();
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
.ui-checkbox {
  box-sizing: border-box;
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #6b7280;
  border-radius: 4px;
  cursor: pointer;
  &:checked {
    background-color: #2563eb;
    border-color: #2563eb;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 12 4 4L19 6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 14px 14px;
  }
  &:focus-visible {
    outline: 2px solid deeppink;
    outline-offset: 2px;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.ui-checkbox--invalid {
  border-color: #dc2626;
}
</style>
