import { ReactNode } from 'react';
import { Callback, Product } from './types';

export interface BaseProps {
  children?: string | ReactNode;
}

export interface InputProps {
  placeholder: string;
  value?: string;
  onChange: (v: string) => void;
  testid?: string;
}

export interface ButtonProps {
  children: React.ReactNode | string;
  type?: 'button' | 'submit' | 'reset';
  onClick: Callback;
  className?: React.HTMLAttributes<HTMLButtonElement>['className'];
  style?: React.HTMLAttributes<HTMLButtonElement>['style'];
  disabled?: boolean;
  testid?: string;
}

export interface ItemProps
  extends Pick<Product, 'title' | 'images' | 'id'>,
    BaseProps {}

export interface SearchProps {
  onSearch: (value: string) => void;
  searchValue: string;
}

export interface ItemPropertyProps {
  name: string;
  content: string | number;
}

export interface ItemDescriptionProps
  extends Pick<Product, 'brand' | 'price' | 'rating'> {}

export type ItemDescriptionValues =
  ItemDescriptionProps[keyof ItemDescriptionProps];

export interface ListProps {
  items: Pick<Product, 'title' | 'images' | 'id'>[];
}

export interface PaginationProps {
  page: number;
  total: number;
}

export interface ItemDetailsProps extends Product, BaseProps {}
