<template>
  <dialog
    :aria-labelledby="id"
    ref="dialog"
    @cancel="handleCancel"
    @click="handleBackdropClick"
    class="ui-modal"
  >
    <div class="ui-modal__panel">
      <div class="ui-modal__header">
        <h2 :id="id" class="ui-modal__title">
          <slot name="title"></slot>
        </h2>
        <button
          type="button"
          class="ui-modal__close"
          aria-label="닫기"
          @click="emit('requestClose')"
        >
          닫기
        </button>
      </div>

      <div class="ui-modal__body">
        <slot></slot>
      </div>
      <div class="ui-modal__footer">
        <slot name="actions"></slot>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const id = useId();

const props = withDefaults(
  defineProps<{
    open: boolean;
    closeOnBackdrop?: boolean;
  }>(),
  {
    closeOnBackdrop: false,
  },
);

const emit = defineEmits<{
  requestClose: [];
}>();

const dialogRef = useTemplateRef<HTMLDialogElement>("dialog");

const handleCancel = (event: Event) => {
  event.preventDefault();
  emit("requestClose");
};

const handleBackdropClick = (event: MouseEvent) => {
  if (!props.closeOnBackdrop) return;
  if (event.target !== event.currentTarget) return;
  emit("requestClose");
};

const syncDialogOpenState = () => {
  const dialog = dialogRef.value;
  if (!dialog) return;

  if (props.open && !dialog.open) {
    dialog.showModal();
  } else if (!props.open && dialog.open) {
    dialog.close();
  }
};

onMounted(() => {
  syncDialogOpenState();
});

watch(
  () => props.open,
  () => {
    syncDialogOpenState();
  },
);
</script>

<style scoped>
.ui-modal {
  border: 0;
  background-color: transparent;
  padding: 0;
  width: calc(100vw - 32px);
  max-width: 520px;
  color: inherit;
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .ui-modal__panel {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 20px 48px rgba(15, 23, 42, 0.24);
    overflow: hidden;
  }

  .ui-modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    border-bottom: 1px solid #e4e9f1;
  }

  .ui-modal__title {
    margin: 0;
    color: #253047;
    font-size: 20px;
    line-height: 1.4;
  }

  .ui-modal__close {
    flex: none;
    padding: 6px 8px;
    border: 0;
    border-radius: 6px;
    background-color: transparent;
    color: #475467;
    font: inherit;
    cursor: pointer;

    &:hover {
      background-color: #f2f4f7;
    }

    &:focus-visible {
      outline: 3px solid #84adff;
      outline-offset: 2px;
    }
  }

  .ui-modal__body {
    padding: 24px;
    color: #475467;
    line-height: 1.6;
  }

  .ui-modal__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px 24px;
    border-top: 1px solid #e4e9f1;
    background-color: #f8fafc;
  }
}
</style>
