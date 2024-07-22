export interface GetProductsPageQueryParams {
  query: string;
  page: number;
  limit: number;
}

export interface GetProductByIdQueryParams {
  id: string | number | null;
}
