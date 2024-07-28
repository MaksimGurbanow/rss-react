import { ReactNode } from 'react';

export type Callback = () => void;

export interface DummyResponse {
  limit: number;
  total: number;
  skip: number;
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  brand: string;
  description: string;
  dimensions: Dimension;
  discountPercentage: number;
  minimumOrderQuantity: number;
  images: string[];
  price: number;
  rating: number;
  warantyInformation: string;
  thumbnail: string;
}

export interface Dimension {
  depth: number;
  height: number;
  width: number;
}

export interface AppState {
  searchQuery: string;
  listData: Product[];
  error: string;
  isLoading: boolean;
}

export type AsyncFunction<T> = () => Promise<T>;

export interface ToggleState {
  icon: ReactNode;
  className?: React.HTMLAttributes<HTMLButtonElement>['className'];
  style?: React.HTMLAttributes<HTMLButtonElement>['style'];
}
