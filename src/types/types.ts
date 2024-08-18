export type Callback<T = void> = (value?: T) => void;

export interface IUser {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female';
  image: string;
  termsAndConditions?: boolean;
  country: string;
  isLogined: boolean;
}
