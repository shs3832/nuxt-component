<template>
  <ListPageTemplate>
    <template #title>제품 관리</template>

    <template #description>
      <p class="products-page__description">제품 관리 페이지용</p>
    </template>

    <template #search>
      <ProductSearchForm
        v-model:category="draftSearchConditions.category"
        v-model:keyword="draftSearchConditions.keyword"
        v-model:include-sold-out="draftSearchConditions.includeSoldOut"
        @search="handleSearch"
        @reset="handleReset"
      />
    </template>

    <template #table>
      <UiTable aria-label="제품 목록" :aria-busy="isLoading">
        <thead>
          <tr>
            <th scope="col">상품명</th>
            <th scope="col">상품 코드</th>
            <th scope="col">카테고리</th>
            <th scope="col">판매 상태</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="isLoading">
            <td colspan="4">
              <span role="status">제품 정보를 불러오는 중입니다.</span>
            </td>
          </tr>

          <tr v-else-if="error">
            <td colspan="4">
              <span role="alert">{{ error }}</span>
              <UiButton @click="handleRetry">다시 시도</UiButton>
            </td>
          </tr>

          <tr v-else-if="items.length === 0">
            <td colspan="4">
              <span role="status">조건에 맞는 제품이 없습니다.</span>
            </td>
          </tr>

          <template v-else>
            <tr v-for="product in items" :key="product.id">
              <th scope="row">{{ product.name }}</th>
              <td>{{ product.code }}</td>
              <td>{{ productCategoryLabels[product.category] }}</td>
              <td>{{ product.soldOut ? "품절" : "판매 중" }}</td>
            </tr>
          </template>
        </tbody>
      </UiTable>
    </template>

    <template v-if="showPagination" #pagination>
      <UiPagination
        :page="page"
        :total-pages="totalPages"
        @update:page="handlePageChange"
      />
    </template>
  </ListPageTemplate>
</template>

<script setup lang="ts">
import type {
  LoadProductsParams,
  Product,
  ProductCategory,
  ProductSearchConditions,
} from "../types/products";
import { fetchMockProducts } from "../utils/productsMockApi";
import { isAbortError } from "../utils/requestError";

definePageMeta({
  layout: "admin",
});

const productCategoryLabels: Record<ProductCategory, string> = {
  clothing: "의류",
  electronics: "전자제품",
};

const createInitialSearchConditions = (): ProductSearchConditions => {
  return {
    category: "",
    keyword: "",
    includeSoldOut: false,
  };
};

const {
  draftSearchConditions,
  appliedSearchConditions,
  applySearchConditions,
  resetSearchConditions,
} = useSearchConditions(createInitialSearchConditions);

const page = ref(1);
const pageSize = 2;
const items = ref<Product[]>([]);
const total = ref(0);
const isLoading = ref(true);
const error = ref<string | null>(null);

const createLoadProductsParams = (
  requestedPage: number,
): LoadProductsParams => {
  return {
    conditions: { ...appliedSearchConditions.value },
    page: requestedPage,
    pageSize,
  };
};

let latestRequestId = 0;
let activeRequestController: AbortController | null = null;

const loadProducts = async (params: LoadProductsParams) => {
  activeRequestController?.abort();

  const requestController = new AbortController();
  const requestId = ++latestRequestId;

  activeRequestController = requestController;

  items.value = [];
  total.value = 0;
  error.value = null;
  isLoading.value = true;

  try {
    const response = await fetchMockProducts(
      params,
      requestController.signal,
    );

    if (requestId !== latestRequestId) return;

    items.value = response.items;
    total.value = response.total;
  } catch (caughtError) {
    if (requestId !== latestRequestId || isAbortError(caughtError)) {
      return;
    }

    items.value = [];
    total.value = 0;
    error.value = "제품 정보를 불러오지 못했습니다. 다시 시도해 주세요.";
  } finally {
    if (requestId === latestRequestId) {
      isLoading.value = false;

      if (activeRequestController === requestController) {
        activeRequestController = null;
      }
    }
  }
};

const handleSearch = () => {
  applySearchConditions();
  page.value = 1;
  void loadProducts(createLoadProductsParams(1));
};

const handleReset = () => {
  resetSearchConditions();
  page.value = 1;
  void loadProducts(createLoadProductsParams(1));
};

const handlePageChange = (nextPage: number) => {
  page.value = nextPage;

  void loadProducts(createLoadProductsParams(nextPage));
};

const handleRetry = () => {
  void loadProducts(createLoadProductsParams(page.value));
};

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize);
});

const showPagination = computed(() => {
  return (
    !isLoading.value &&
    !error.value &&
    items.value.length > 0 &&
    totalPages.value > 0
  );
});

onMounted(() => {
  void loadProducts(createLoadProductsParams(page.value));
});

onBeforeUnmount(() => {
  latestRequestId += 1;
  activeRequestController?.abort();
  activeRequestController = null;
});
</script>
<style scoped>
.products-page__description {
  margin: 0;
}
</style>
