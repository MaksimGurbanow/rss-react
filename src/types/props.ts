import { ChangeEventHandler, CSSProperties, LegacyRef, ReactNode } from 'react';
import { Callback } from './types';
import { UseFormRegister } from 'react-hook-form';

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
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  validation?: unknown;
  checked?: boolean;
  autocomplete?: string;
  errors?: string[] | null;
  accept?: HTMLInputElement['accept'];
  register?: UseFormRegister<object>;
}

export interface ChooseProps extends BaseProps<HTMLInputElement> {
  isMultiple?: boolean;
  defaultValue?: string;
  options: {
    name: string;
    label: string;
    value: string | boolean | number;
    ref?: LegacyRef<HTMLInputElement>;
  }[];
  onChange?: ChangeEventHandler<EventTarget>;
  error?: string[] | undefined | null;
  text?: string;
}

export interface SelectProps extends BaseProps<HTMLSelectElement> {
  options: { label: string; value: string }[];
  name: string;
  label: string;
  id?: string;
  errors: string[] | null;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}
