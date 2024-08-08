import { DummyResponse } from '../../types/types';

export interface GetProductsPageQueryParams {
  page: number;
  limit: number;
  query: string;
  initialData?: DummyResponse;
}

export interface GetProductByIdQueryParams {
  id: string | number | null;
}
