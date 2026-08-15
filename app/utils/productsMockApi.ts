import type {
  LoadProductsParams,
  Product,
  ProductResponse,
} from "../types/products";

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

export const fetchMockProducts = async (
  params: LoadProductsParams,
  signal: AbortSignal,
): Promise<ProductResponse> => {
  await waitForMockResponse(signal);

  const keyword = params.conditions.keyword.trim().toLowerCase();
  if (keyword === "__error__") {
    throw new Error("Mock product request failed");
  }

  const filteredProducts = mockProducts.filter((product) => {
    if (!params.conditions.includeSoldOut && product.soldOut) {
      return false;
    }

    if (
      params.conditions.category !== "" &&
      params.conditions.category !== product.category
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
  const start = (params.page - 1) * params.pageSize;

  return {
    items: filteredProducts.slice(start, start + params.pageSize),
    total,
  };
};
