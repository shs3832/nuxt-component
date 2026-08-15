import { ref, type Ref } from "vue";

export const useSearchConditions = <T extends Record<string, unknown>>(
  createInitial: () => T,
) => {
  const draftSearchConditions = ref(createInitial()) as Ref<T>;
  const appliedSearchConditions = ref(createInitial()) as Ref<T>;

  const applySearchConditions = () => {
    appliedSearchConditions.value = {
      ...draftSearchConditions.value,
    };
  };

  const resetSearchConditions = () => {
    draftSearchConditions.value = createInitial();
    appliedSearchConditions.value = createInitial();
  };

  return {
    draftSearchConditions,
    appliedSearchConditions,
    applySearchConditions,
    resetSearchConditions,
  };
};
