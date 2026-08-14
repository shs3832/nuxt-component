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
      <UiTable aria-label="제품 목록">
        <thead>
          <tr>
            <th scope="col">상품명</th>
            <th scope="col">상품 코드</th>
            <th scope="col">카테고리</th>
            <th scope="col">판매 상태</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="4">
              <span role="status">조건에 맞는 제품이 없습니다.</span>
            </td>
          </tr>

          <template v-else>
            <tr v-for="product in paginatedProducts" :key="product.id">
              <th scope="row">{{ product.name }}</th>
              <td>{{ product.code }}</td>
              <td>{{ productCategoryLabels[product.category] }}</td>
              <td>{{ product.soldOut ? "품절" : "판매 중" }}</td>
            </tr>
          </template>
        </tbody>
      </UiTable>
    </template>

    <template v-if="filteredProducts.length > 0" #pagination>
      <UiPagination v-model:page="page" :total-pages="totalPages" />
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

const mockProducts = ref<Product[]>([
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
]);

const page = ref(1);

const handleSearch = () => {
  appliedSearchConditions.value = {
    ...draftSearchConditions.value,
  };
  page.value = 1;
};

const handleReset = () => {
  draftSearchConditions.value = createInitialSearchConditions();
  appliedSearchConditions.value = createInitialSearchConditions();
  page.value = 1;
};

const filteredProducts = computed(() => {
  const keyword = appliedSearchConditions.value.keyword.trim().toLowerCase();

  return mockProducts.value.filter((product) => {
    if (!appliedSearchConditions.value.includeSoldOut && product.soldOut) {
      return false;
    }

    if (
      appliedSearchConditions.value.category !== "" &&
      appliedSearchConditions.value.category !== product.category
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
});

const pageSize = 2;

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pageSize);
});

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * pageSize;
  const end = start + pageSize;

  return filteredProducts.value.slice(start, end);
});
</script>
<style scoped>
.products-page__description {
  margin: 0;
}
</style>
