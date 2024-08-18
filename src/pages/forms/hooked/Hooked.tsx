import { SubmitHandler, useForm } from 'react-hook-form';
import classes from './hooked.module.scss';
import { IUser } from '../../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import userSchema from '../../../schema/user';
import InputBlock from '../../../components/inputBlock/InputBlock';
import ChooseBlock from '../../../components/chooseBlock/ChooseBlock';
import { useEffect } from 'react';
import Select from '../../../components/select/Select';
import { useSelector } from 'react-redux';
import { fetchCountries, selectCountries } from '../../../redux/countries';
import { store } from '../../../redux/store';

interface IUserForm extends Omit<IUser, 'image'> {
  image: File;
}

const Hooked = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userSchema, { abortEarly: false }),
  });
  const { errors } = formState;
  const onSubmit: SubmitHandler<IUserForm> = (data) => {
    console.log(data);
  };

  const countries = useSelector(selectCountries);

  useEffect(() => {
    store.dispatch(fetchCountries());
  }, []);

  const inputs: {
    name: 'name' | 'age' | 'email' | 'password' | 'submitPassword';
    label: string;
  }[] = [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'age',
      label: 'Age',
    },
    {
      name: 'email',
      label: 'Email',
    },
    {
      name: 'password',
      label: 'Password',
    },
    {
      name: 'submitPassword',
      label: 'Submit password',
    },
  ];

  return (
    <div className={classes.hookedFormPage}>
      <h1 className={classes.hookedFormHeader}>Hooked form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.hookedForm}>
        {inputs.map((input, index) => (
          <InputBlock
            key={`${index}-${input.name}`}
            label={input.label}
            errors={
              errors[input.name]?.message
                ? [errors[input.name]?.message || '']
                : null
            }
            {...register(input.name)}
          />
        ))}
        <ChooseBlock
          options={[
            {
              name: 'gender',
              label: 'Male',
              value: 'male',
              ref: register('gender').ref,
            },
            {
              name: 'gender',
              label: 'Female',
              value: 'female',
              ref: register('gender').ref,
            },
          ]}
          error={errors.gender?.message ? [errors.gender?.message || ''] : null}
          text="Choose your gender"
          {...register('gender')}
        />
        <ChooseBlock
          isMultiple
          options={[
            {
              name: 'termsAndConditions',
              ref: register('termsAndConditions').ref,
              label: 'I accept Terms and Conditions',
              value: true,
            },
          ]}
          {...register('termsAndConditions')}
          className={classes.agreement}
          error={
            errors.termsAndConditions?.message
              ? [errors.termsAndConditions?.message || '']
              : null
          }
        />
        <InputBlock
          type="file"
          label="Picture"
          accept=".jpeg,.png,.jpg"
          errors={errors.image?.message ? [errors.image?.message] : null}
          className={classes.imagePicker}
          {...register('image')}
        />
        <Select
          options={countries}
          label="Choose your country"
          {...register('country')}
          errors={errors.country?.message ? [errors.country.message] : null}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Hooked;
