import { CSSProperties, LegacyRef, ReactNode } from 'react';
import { Callback } from './types';

export interface BaseProps<T = void> {
  children?: string | ReactNode;
  onClick?: Callback;
  className?: string;
  style?: CSSProperties;
  innerRef?: LegacyRef<T>;
}

export interface ButtonProps extends BaseProps<HTMLButtonElement> {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseProps<HTMLInputElement> {
  name: string;
  value?: string;
  label?: string;
  onInput?: Callback<string>;
  onChange?: Callback<string>;
  type?: string;
  validation?: unknown;
  checked?: boolean;
  autocomplete?: string;
  errors?: string[];
  accept?: HTMLInputElement['accept'];
}

export interface ChooseProps extends BaseProps<HTMLInputElement> {
  isMultiple?: boolean;
  defaultValue?: string;
  options: {
    name: string;
    label: string;
    value: string;
    ref: LegacyRef<HTMLInputElement>;
  }[];
  error?: string[];
}

export interface SelectProps extends BaseProps<HTMLSelectElement> {
  options: { label: string; value: string }[];
}
