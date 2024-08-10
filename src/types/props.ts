import { ReactNode } from 'react';
import { Callback, Product, ToggleState } from './types';

export interface BaseProps {
  children?: string | ReactNode;
  className?: React.HTMLAttributes<HTMLButtonElement>['className'];
  style?: React.HTMLAttributes<HTMLButtonElement>['style'];
}

export interface InputProps {
  placeholder: string;
  value?: string;
  onChange: (v: string) => void;
  testid?: string;
}

export interface ButtonProps extends BaseProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: Callback;
  disabled?: boolean;
  testid?: string;
}

export interface ItemProps
  extends Pick<Product, 'title' | 'images' | 'id'>,
    BaseProps {
  detailsPath: string;
}

export interface SearchProps {
  onSearch?: (value: string) => void;
  searchValue?: string;
}

export interface ItemPropertyProps {
  name: string;
  content: string | number;
}

export interface ItemDescriptionProps
  extends Pick<Product, 'brand' | 'price' | 'rating'> {}

export type ItemDescriptionValues =
  ItemDescriptionProps[keyof ItemDescriptionProps];

export interface ListProps extends BaseProps {
  items: Pick<Product, 'title' | 'images' | 'id'>[];
  detailsPath: string;
}

export interface PaginationProps {
  total: number;
  page: number;
}

export interface ItemDetailsProps extends Product, BaseProps {}

export interface ToogleProps extends BaseProps {
  initial: ToggleState;
  end: ToggleState;
  callback?: () => void;
  defaultToggled?: boolean;
  testid?: string;
}
