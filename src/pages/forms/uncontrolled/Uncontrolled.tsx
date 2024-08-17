import {
  FormEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import classes from './uncontrolled.module.scss';
import InputBlock from '../../../components/inputBlock/InputBlock';
import Button from '../../../components/button/Button';
import ChooseBlock from '../../../components/chooseBlock/ChooseBlock';
import Select from '../../../components/select/Select';
import userSchema from '../../../schema/user';
import { ValidationError } from 'yup';
import { fetchCountries, selectCountries } from '../../../redux/countries';
import { useSelector } from 'react-redux';
import { store } from '../../../redux/store';

const Uncontroled = () => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const inputs: {
    name: 'name' | 'age' | 'email' | 'password' | 'submitPassword';
    label: string;
    ref: RefObject<HTMLInputElement>;
    error?: string;
    type?: string;
  }[] = [
    {
      name: 'name',
      label: 'Name',
      ref: useRef<HTMLInputElement>(null),
    },
    {
      ref: useRef<HTMLInputElement>(null),
      name: 'age',
      label: 'Age',
      type: 'number',
    },
    {
      ref: useRef<HTMLInputElement>(null),
      name: 'email',
      label: 'Email',
    },
    {
      name: 'password',
      label: 'Password',
      ref: useRef<HTMLInputElement>(null),
    },
    {
      name: 'submitPassword',
      label: 'SubmitPassword',
      ref: useRef<HTMLInputElement>(null),
    },
  ];
  const genders = [
    {
      name: 'gender',
      label: 'Male',
      value: 'male',
      ref: useRef<HTMLInputElement>(null),
    },
    {
      name: 'gender',
      label: 'Female',
      value: 'female',
      ref: useRef<HTMLInputElement>(null),
    },
  ];

  const termsAndConditions = {
    name: 'termsAndConditions',
    ref: useRef<HTMLInputElement>(null),
    label: 'I accept Terms and Conditions',
    value: 'termsAndConditions',
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      await userSchema.validate(
        {
          ...Object.fromEntries(
            inputs.map((input) => [input.name, input.ref.current?.value]),
          ),
          gender: genders[0].ref.current?.checked
            ? 'male'
            : genders[1].ref.current?.checked
              ? 'female'
              : undefined,
          termsAndConditions: termsAndConditions.ref.current?.checked,
          image: image.current?.files?.item(0),
        },
        { abortEarly: false },
      );
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          setErrors((prev) => ({
            ...prev,
            [error.path as string]: [
              ...(prev[error.path as string] || []),
              error.message,
            ],
          }));
        });
      }
    }
  };

  const countries = useSelector(selectCountries);

  useEffect(() => {
    store.dispatch(fetchCountries());
  }, []);

  const image = useRef<HTMLInputElement>(null);
  return (
    <div className={classes.formPage}>
      <h3>Uncontrolled components form</h3>
      <form onSubmit={handleSubmit}>
        {Object.values(inputs).map((input, index) => (
          <InputBlock
            name={input.name}
            label={input.label}
            innerRef={input.ref}
            type={input.type || 'text'}
            key={`${index}-${input.name}-${input.label}`}
            errors={errors[input.name]}
          />
        ))}
        <ChooseBlock options={genders} error={errors.gender} />
        <ChooseBlock
          isMultiple
          options={[termsAndConditions]}
          error={errors.termsAndConditions}
        />
        <InputBlock
          type="file"
          name="picture"
          label="Picture"
          innerRef={image}
          accept=".jpeg,.png,.jpg"
          errors={errors.image}
        />
        <Select
          options={[{ label: 'country', value: 'country' }].concat(countries)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Uncontroled;
