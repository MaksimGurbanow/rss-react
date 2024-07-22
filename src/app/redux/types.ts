export interface GetProductsPageQueryParams {
  page: number;
  limit: number;
  query: string;
}

export interface GetProductByIdQueryParams {
  id: string | number | null;
}
