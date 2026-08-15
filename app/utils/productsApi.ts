export type ProductCategory = "clothing" | "electronics";

export type Product = {
  id: number;
  name: string;
  code: string;
  category: ProductCategory;
  soldOut: boolean;
};

export type ProductSearchConditions = {
  category: "" | ProductCategory;
  keyword: string;
  includeSoldOut: boolean;
};

export type LoadProductsParams = {
  conditions: ProductSearchConditions;
  page: number;
  pageSize: number;
};

export type ProductResponse = {
  items: Product[];
  total: number;
};

type ApiErrorResponse = {
  code: string;
  message: string;
};

export class ProductsApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ProductsApiError";
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isProduct = (value: unknown): value is Product => {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "number" &&
    Number.isInteger(value.id) &&
    typeof value.name === "string" &&
    typeof value.code === "string" &&
    (value.category === "clothing" ||
      value.category === "electronics") &&
    typeof value.soldOut === "boolean"
  );
};

const isProductResponse = (value: unknown): value is ProductResponse => {
  if (!isRecord(value)) return false;

  return (
    Array.isArray(value.items) &&
    value.items.every(isProduct) &&
    typeof value.total === "number" &&
    Number.isInteger(value.total) &&
    value.total >= 0 &&
    value.total >= value.items.length
  );
};

const isApiErrorResponse = (value: unknown): value is ApiErrorResponse => {
  if (!isRecord(value)) return false;

  return (
    typeof value.code === "string" &&
    typeof value.message === "string"
  );
};

export const isAbortError = (error: unknown) => {
  return error instanceof DOMException && error.name === "AbortError";
};

const createProductQuery = (params: LoadProductsParams) => {
  const query = new URLSearchParams({
    includeSoldOut: String(params.conditions.includeSoldOut),
    page: String(params.page),
    pageSize: String(params.pageSize),
  });

  const keyword = params.conditions.keyword.trim();
  if (keyword) query.set("keyword", keyword);

  if (params.conditions.category) {
    query.set("category", params.conditions.category);
  }

  return query;
};

const validateLoadProductsParams = (params: LoadProductsParams) => {
  const hasValidPage = Number.isInteger(params.page) && params.page >= 1;
  const hasValidPageSize =
    Number.isInteger(params.pageSize) && params.pageSize >= 1;

  if (!hasValidPage || !hasValidPageSize) {
    throw new ProductsApiError(
      0,
      "INVALID_REQUEST_PARAMS",
      "제품 요청 조건이 올바르지 않습니다.",
    );
  }
};

const createHttpError = async (response: Response) => {
  let body: unknown;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (isApiErrorResponse(body)) {
    return new ProductsApiError(response.status, body.code, body.message);
  }

  return new ProductsApiError(
    response.status,
    "UNKNOWN_ERROR",
    "제품 정보를 불러오지 못했습니다.",
  );
};

export const fetchProducts = async (
  params: LoadProductsParams,
  signal: AbortSignal,
): Promise<ProductResponse> => {
  validateLoadProductsParams(params);

  let response: Response;

  try {
    const query = createProductQuery(params);
    response = await fetch(`/api/products?${query.toString()}`, { signal });
  } catch (error) {
    if (isAbortError(error)) throw error;

    throw new ProductsApiError(
      0,
      "NETWORK_ERROR",
      "제품 정보를 불러오지 못했습니다.",
    );
  }

  if (!response.ok) {
    throw await createHttpError(response);
  }

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new ProductsApiError(
      response.status,
      "INVALID_PRODUCT_RESPONSE",
      "제품 정보를 불러오지 못했습니다.",
    );
  }

  if (!isProductResponse(data)) {
    throw new ProductsApiError(
      response.status,
      "INVALID_PRODUCT_RESPONSE",
      "제품 정보를 불러오지 못했습니다.",
    );
  }

  return data;
};
