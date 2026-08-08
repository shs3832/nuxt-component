<template>
  <button
    type="button"
    class="ui-button"
    :class="[
      variantClass,
      sizeClass,
      { 'ui-button--icon-only': props.iconOnly },
    ]"
    :disabled="isDisabled"
    :aria-busy="loading"
  >
    <span
      v-if="props.loading"
      class="ui-button__spinner"
      aria-hidden="true"
    ></span>
    <span
      v-if="!props.loading && $slots.leading"
      class="ui-button__icon"
      aria-hidden="true"
    >
      <slot name="leading"></slot>
    </span>

    <slot></slot>

    <span
      v-if="!props.loading && $slots.trailing"
      class="ui-button__icon"
      aria-hidden="true"
    >
      <slot name="trailing"></slot>
    </span>
  </button>
</template>

<style scoped>
.ui-button {
  border: 1px solid;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  cursor: pointer;
  gap: 8px;
}

.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-button:focus-visible {
  outline-offset: 2px;
  outline: 2px solid deeppink;
}

.ui-button--primary {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.ui-button--secondary {
  background-color: #ffffff;
  color: #1f2937;
  border-color: #6b7280;
}

.ui-button--danger {
  background-color: #dc2626;
  color: #ffffff;
  border-color: #dc2626;
}

.ui-button--size-small {
  min-height: 32px;
  padding: 0 12px;
  font-size: 13px;
}

.ui-button--size-medium {
  min-height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

.ui-button--size-large {
  min-height: 48px;
  padding: 0 20px;
  font-size: 16px;
}

.ui-button__icon {
  width: 1em;
  height: 1em;
  display: inline-flex;
  flex: 0 0 auto;
}

.ui-button__icon :slotted(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.ui-button__spinner {
  width: 1em;
  height: 1em;
  flex: 0 0 auto;
  box-sizing: border-box;
  border: 2px solid currentcolor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ui-button-spin 0.8s linear infinite;
}

.ui-button--icon-only {
  padding-inline: 0;
}

.ui-button--icon-only.ui-button--size-small {
  width: 32px;
}

.ui-button--icon-only.ui-button--size-medium {
  width: 40px;
}

.ui-button--icon-only.ui-button--size-large {
  width: 48px;
}

@keyframes ui-button-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-button__spinner {
    animation: none;
  }
}
</style>

<script setup lang="ts">
type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    iconOnly?: boolean;
  }>(),
  {
    variant: "primary",
    size: "medium",
    disabled: false,
    loading: false,
    iconOnly: false,
  },
);

const variantClass = computed(() => `ui-button--${props.variant}`);
const sizeClass = computed(() => `ui-button--size-${props.size}`);
const isDisabled = computed(() => props.disabled || props.loading);
</script>
