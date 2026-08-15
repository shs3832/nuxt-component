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
