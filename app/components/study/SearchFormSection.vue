<template>
  <section class="study-card" aria-labelledby="search-form-study-title">
    <div class="study-card__header">
      <div>
        <p class="study-card__step">STEP 4</p>
        <h2 id="search-form-study-title">SearchForm 조합</h2>
      </div>
      <span class="study-card__status">완료</span>
    </div>

    <p class="study-card__description">
      공통 SearchForm에 회원·상품 검색 필드를 조합해 레이아웃과 도메인
      컴포넌트의 책임을 비교합니다.
    </p>

    <div class="search-form-demo">
      <h3 class="search-form-demo__title">회원 검색</h3>
      <UserSearchForm
        v-model:status="userSearchConditions.status"
        v-model:keyword="userSearchConditions.keyword"
        v-model:include-withdrawn="userSearchConditions.includeWithdrawn"
        @reset="resetUserSearchConditions"
        @search="handleUserSearch"
      />
      <p class="study-output">
        <span>현재 입력 조건</span>
        <code>{{ JSON.stringify(userSearchConditions) }}</code>
      </p>

      <p class="study-output">
        <span>마지막 검색 조건</span>
        <code>
          {{
            lastSearchedConditions
              ? JSON.stringify(lastSearchedConditions)
              : "검색 전"
          }}
        </code>
      </p>
    </div>

    <div class="search-form-demo">
      <h3 class="search-form-demo__title">상품 검색</h3>
      <ProductSearchForm
        v-model:category="productSearchConditions.category"
        v-model:keyword="productSearchConditions.keyword"
        v-model:include-sold-out="productSearchConditions.includeSoldOut"
        @reset="resetProductSearchConditions"
        @search="handleProductSearch"
      />
      <p class="study-output">
        <span>현재 입력 조건</span>
        <code>{{ JSON.stringify(productSearchConditions) }}</code>
      </p>

      <p class="study-output">
        <span>마지막 검색 조건</span>
        <code>
          {{
            lastProductSearchConditions
              ? JSON.stringify(lastProductSearchConditions)
              : "검색 전"
          }}
        </code>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MemberSearchConditions } from "../../types/members";
import type { ProductSearchConditions } from "../../types/products";

const createInitialUserSearchConditions = (): MemberSearchConditions => {
  return {
    status: "",
    keyword: "",
    includeWithdrawn: false,
  };
};

const createInitialProductSearchConditions = (): ProductSearchConditions => {
  return {
    category: "",
    keyword: "",
    includeSoldOut: false,
  };
};

const lastSearchedConditions = ref<MemberSearchConditions | null>(null);
const lastProductSearchConditions = ref<ProductSearchConditions | null>(null);

const userSearchConditions = ref(createInitialUserSearchConditions());
const resetUserSearchConditions = () => {
  userSearchConditions.value = createInitialUserSearchConditions();
};
const handleUserSearch = () => {
  lastSearchedConditions.value = {
    ...userSearchConditions.value,
  };
};

const productSearchConditions = ref(createInitialProductSearchConditions());
const resetProductSearchConditions = () => {
  productSearchConditions.value = createInitialProductSearchConditions();
};
const handleProductSearch = () => {
  lastProductSearchConditions.value = {
    ...productSearchConditions.value,
  };
};
</script>
