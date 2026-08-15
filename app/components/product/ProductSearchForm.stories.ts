import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent } from "storybook/test";
import { ref } from "vue";

import ProductSearchForm from "./ProductSearchForm.vue";

const meta = {
  title: "Product/ProductSearchForm",
  component: ProductSearchForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "부모가 세 검색 조건을 v-model로 소유하고, ProductSearchForm은 입력 변경과 search/reset 의도만 전달합니다.",
      },
    },
  },
  argTypes: {
    category: {
      description:
        "부모가 v-model:category로 반드시 제공하는 검색 카테고리입니다. 빈 문자열은 전체를 의미합니다.",
      type: { name: "string", required: true },
      table: {
        category: "Models",
        type: { summary: "string · required" },
      },
    },
    keyword: {
      description:
        "부모가 v-model:keyword로 반드시 제공하는 검색어입니다. 빈 문자열도 정상값입니다.",
      type: { name: "string", required: true },
      table: {
        category: "Models",
        type: { summary: "string · required" },
      },
    },
    includeSoldOut: {
      description:
        "부모가 v-model:include-sold-out으로 반드시 제공하는 품절 상품 포함 여부입니다.",
      type: { name: "boolean", required: true },
      table: {
        category: "Models",
        type: { summary: "boolean · required" },
      },
    },
    search: {
      control: false,
      description: "현재 검색 조건을 적용하도록 부모에게 요청합니다.",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
    reset: {
      control: false,
      description: "검색 조건을 초기화하도록 부모에게 요청합니다.",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
  },
  args: {
    category: "",
    keyword: "",
    includeSoldOut: false,
  },
} satisfies Meta<typeof ProductSearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderSearchForm: Story["render"] = (args) => ({
  components: { ProductSearchForm },
  setup() {
    const category = ref(args.category);
    const keyword = ref(args.keyword);
    const includeSoldOut = ref(args.includeSoldOut);
    const resultMessage = ref("검색 또는 초기화를 실행해 보세요.");

    const handleSearch = () => {
      resultMessage.value = [
        `category=${category.value || "all"}`,
        `keyword=${keyword.value || "empty"}`,
        `includeSoldOut=${includeSoldOut.value}`,
      ].join(", ");
    };

    const handleReset = () => {
      category.value = "";
      keyword.value = "";
      includeSoldOut.value = false;
      resultMessage.value = "검색 조건을 초기화했습니다.";
    };

    return {
      category,
      keyword,
      includeSoldOut,
      resultMessage,
      handleSearch,
      handleReset,
    };
  },
  template: `
    <ProductSearchForm
      v-model:category="category"
      v-model:keyword="keyword"
      v-model:include-sold-out="includeSoldOut"
      @search="handleSearch"
      @reset="handleReset"
    />
    <p role="status">{{ resultMessage }}</p>
  `,
});

export const Default: Story = {
  args: {
    category: "",
    keyword: "",
    includeSoldOut: false,
  },
  render: renderSearchForm,
  play: async ({ canvas }) => {
    const category = canvas.getByRole("combobox", { name: "상품 분류" });
    const keyword = canvas.getByRole("searchbox", { name: "검색어" });
    const includeSoldOut = canvas.getByRole("checkbox", {
      name: "품절 상품 포함",
    });

    await userEvent.selectOptions(category, "electronics");
    await userEvent.type(keyword, "TV-200");
    await userEvent.click(includeSoldOut);
    await userEvent.click(canvas.getByRole("button", { name: "검색" }));

    await expect(canvas.getByRole("status")).toHaveTextContent(
      "category=electronics, keyword=TV-200, includeSoldOut=true",
    );

    await userEvent.click(canvas.getByRole("button", { name: "초기화" }));

    await expect(category).toHaveValue("");
    await expect(keyword).toHaveValue("");
    await expect(includeSoldOut).not.toBeChecked();
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "검색 조건을 초기화했습니다.",
    );
  },
};

export const Filled: Story = {
  args: {
    category: "clothing",
    keyword: "CLO-001",
    includeSoldOut: true,
  },
  render: renderSearchForm,
};
