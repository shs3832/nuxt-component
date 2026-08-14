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
definePageMeta({
  layout: "admin",
});

type ProductCategory = "clothing" | "electronics";

type Product = {
  id: number;
  name: string;
  code: string;
  category: ProductCategory;
  soldOut: boolean;
};

type ProductSearchConditions = {
  category: string;
  keyword: string;
  includeSoldOut: boolean;
};

type ProductRequestParams = {
  conditions: ProductSearchConditions;
  page: number;
  pageSize: number;
  signal: AbortSignal;
};

type ProductResponse = {
  items: Product[];
  total: number;
};
type LoadProductsParams = Omit<ProductRequestParams, "signal">;

const waitForMockResponse = (signal: AbortSignal, delay = 600) => {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("요청이 중단되었습니다.", "AbortError"));
      return;
    }

    const handleAbort = () => {
      clearTimeout(timeoutId);
      reject(new DOMException("요청이 중단되었습니다.", "AbortError"));
    };

    const timeoutId = setTimeout(() => {
      signal.removeEventListener("abort", handleAbort);
      resolve();
    }, delay);

    signal.addEventListener("abort", handleAbort, { once: true });
  });
};

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

const draftSearchConditions = ref(createInitialSearchConditions());
const appliedSearchConditions = ref(createInitialSearchConditions());

const mockProducts: Product[] = [
  {
    id: 1,
    name: "코튼 베이직 티셔츠",
    code: "CLO-001",
    category: "clothing",
    soldOut: false,
  },
  {
    id: 2,
    name: "오버핏 후드 집업",
    code: "CLO-002",
    category: "clothing",
    soldOut: true,
  },
  {
    id: 3,
    name: "무선 키보드",
    code: "ELC-001",
    category: "electronics",
    soldOut: false,
  },
  {
    id: 4,
    name: "노이즈 캔슬링 이어폰",
    code: "ELC-002",
    category: "electronics",
    soldOut: true,
  },
  {
    id: 5,
    name: "휴대용 보조 배터리",
    code: "ELC-003",
    category: "electronics",
    soldOut: false,
  },
];

const requestProducts = async ({
  conditions,
  page,
  pageSize,
  signal,
}: ProductRequestParams): Promise<ProductResponse> => {
  await waitForMockResponse(signal);

  const keyword = conditions.keyword.trim().toLowerCase();
  if (keyword === "__error__") {
    throw new Error("Mock product request failed");
  }
  const filteredProducts = mockProducts.filter((product) => {
    if (!conditions.includeSoldOut && product.soldOut) {
      return false;
    }

    if (
      conditions.category !== "" &&
      conditions.category !== product.category
    ) {
      return false;
    }

    if (keyword === "") {
      return true;
    }

    return (
      product.name.toLowerCase().includes(keyword) ||
      product.code.toLowerCase().includes(keyword)
    );
  });

  const total = filteredProducts.length;
  const start = (page - 1) * pageSize;

  return {
    items: filteredProducts.slice(start, start + pageSize),
    total,
  };
};

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

const isAbortError = (caughtError: unknown) => {
  return (
    caughtError instanceof DOMException && caughtError.name === "AbortError"
  );
};

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
    const response = await requestProducts({
      ...params,
      signal: requestController.signal,
    });

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
  appliedSearchConditions.value = {
    ...draftSearchConditions.value,
  };
  page.value = 1;
  void loadProducts(createLoadProductsParams(1));
};

const handleReset = () => {
  draftSearchConditions.value = createInitialSearchConditions();
  appliedSearchConditions.value = createInitialSearchConditions();
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
