import { ReactNode } from 'react';
import { Callback, Product } from './types';

export interface BaseProps {
  children?: string | ReactNode;
}

export interface InputProps {
  placeholder: string;
  value?: string;
  onChange: (v: string) => void;
}

export interface ButtonProps {
  children: React.ReactNode | string;
  type?: 'button' | 'submit' | 'reset';
  onClick: Callback;
  className?: React.HTMLAttributes<HTMLButtonElement>['className'];
  style?: React.HTMLAttributes<HTMLButtonElement>['style'];
}

export interface ItemProps extends Product {}

export interface SearchProps {
  value: string;
  onSearch: Callback;
  onChange: (v: string) => void;
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
  items: Product[];
}
