<template>
  <SearchForm @search="emit('search')" @reset="emit('reset')" aria-label="상품">
    <div class="product-category product-search-form__field">
      <label :for="categoryId">상품 분류</label>
      <UiSelect
        v-model="category"
        :id="categoryId"
        name="category"
        class="control"
      >
        <option value="">전체</option>
        <option value="clothing">의류</option>
        <option value="electronics">전자제품</option>
      </UiSelect>
    </div>
    <div class="product-keyword product-search-form__field">
      <label :for="keywordId">검색어</label>
      <UiInput
        type="search"
        name="keyword"
        :id="keywordId"
        autocomplete="off"
        placeholder="상품명 또는 상품 코드 입력"
        v-model="keyword"
        class="control"
      />
    </div>
    <div class="product-sold-out">
      <UiCheckbox
        name="includeSoldOut"
        :id="includeSoldOutId"
        v-model="includeSoldOut"
      />
      <label :for="includeSoldOutId">품절 상품 포함</label>
    </div>
  </SearchForm>
</template>

<script lang="ts" setup>
import { useId } from "vue";

const categoryId = useId();
const keywordId = useId();
const includeSoldOutId = useId();
const category = defineModel<string>("category", {
  required: true,
});
const keyword = defineModel<string>("keyword", {
  required: true,
});
const includeSoldOut = defineModel<boolean>("includeSoldOut", {
  required: true,
});

const emit = defineEmits<{
  search: [];
  reset: [];
}>();
</script>

<style scoped>
.control {
  width: 100%;
}

.product-category {
  flex: 0 0 160px;
  @media (max-width: 720px) {
    flex-basis: auto;
  }
}

.product-keyword {
  flex: 1 1 280px;
  min-width: 0;
  @media (max-width: 720px) {
    flex-basis: auto;
  }
}

.product-sold-out {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  label {
    cursor: pointer;
  }
}

.product-search-form__field {
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #344054;
  }
}
</style>
