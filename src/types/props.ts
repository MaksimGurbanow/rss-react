import { CSSProperties, MutableRefObject, ReactNode } from 'react';
import { Callback } from './types';

export interface BaseProps {
  children?: string | ReactNode;
  onClick?: Callback;
  className?: string;
  style?: CSSProperties;
  ref?: MutableRefObject<number | string>;
}

export interface ButtonProps extends BaseProps {
  disabled?: boolean;
}

export interface InputProps extends BaseProps {
  name: string;
  value?: string;
  labelText?: string;
  onInput?: Callback<string>;
  type?: string;
  validation: unknown;
}
