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
import { setUser } from '../../../redux/user';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../context/Notification';

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
  const navigate = useNavigate();
  const countries = useSelector(selectCountries);
  const { setVisible } = useNotification();

  useEffect(() => {
    store.dispatch(fetchCountries());
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const imageFile = image.current?.files?.item(0);
      const formData = {
        ...Object.fromEntries(
          inputs.map((input) => [input.name, input.ref.current?.value]),
        ),
        gender: (genders[0].ref.current?.checked
          ? 'male'
          : genders[1].ref.current?.checked
            ? 'female'
            : undefined) as 'male' | 'female',
        termsAndConditions: termsAndConditions.ref.current?.checked,
        image: image.current?.files,
        country: countrySelectRef.current?.value,
      };
      setErrors({});
      await userSchema.validate(formData, { abortEarly: false });
      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          store.dispatch(
            setUser({
              ...formData,
              image: reader.result?.toString() || '',
              isLogined: true,
            }),
          );
          navigate('/');
          setVisible(true);
        };
        reader.readAsDataURL(imageFile);
      }
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

  const countrySelectRef = useRef<HTMLSelectElement>(null);

  const image = useRef<HTMLInputElement>(null);
  return (
    <div className={classes.formPage}>
      <h1 className={classes.formPageHeader}>Uncontrolled components form</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        {Object.values(inputs).map((input, index) => (
          <InputBlock
            name={input.name}
            label={input.label}
            ref={input.ref}
            type={input.type || 'text'}
            key={`${index}-${input.name}-${input.label}`}
            errors={errors[input.name]}
          />
        ))}
        <ChooseBlock
          options={genders}
          error={errors.gender}
          text="Choose your gender"
        />
        <ChooseBlock
          isMultiple
          options={[termsAndConditions]}
          error={errors.termsAndConditions}
          className={classes.agreement}
        />
        <InputBlock
          type="file"
          name="picture"
          label="Picture"
          ref={image}
          accept=".jpeg,.png,.jpg"
          errors={errors.image}
          className={classes.imagePicker}
        />
        <Select
          options={countries}
          ref={countrySelectRef}
          name="countries"
          id="countries"
          label="Please select a country:"
          errors={errors.country}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Uncontroled;
