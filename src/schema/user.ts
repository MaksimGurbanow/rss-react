import { boolean, mixed, number, object, string } from 'yup';

const MAX_FILE_SIZE = 102400;

const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg'];

function isValidFileType(fileName: string) {
  return (
    !!fileName &&
    validFileExtensions.indexOf(fileName.split('.').pop() as string) > -1
  );
}

const userSchema = object({
  name: string()
    .required('Name is obligatory')
    .matches(/^[A-Z][A-Za-z]*$/, {
      message: 'Name should start with uppercase letter',
    })
    .strict(true),
  age: number()
    .required('Age is obligatory')
    .positive('Age cannot be negative'),
  email: string()
    .required('Email is required')
    .email('Please type correct email'),
  password: string()
    .required('Password is required')
    .min(8, 'Password need to be at least 8 character long')
    .matches(/[1-9]/gi, {
      message: 'Must include at least one numeric character',
    })
    .matches(/[A-Z]/, { message: 'Must include at least one uppercase letter' })
    .matches(/[a-z]/, { message: 'Must include at least one lowercase letter' })
    .matches(/[!@#$%^]/, {
      message: 'Must include at least one special character. E.g. !,@,#,$,%,^',
    }),
  submitPassword: string().test(
    'is-password',
    'Passwords should match',
    function (value) {
      const { password } = this.parent;
      return !!value && value === password;
    },
  ),
  gender: string<'male' | 'female'>().required('Gender is required').strict(),
  termsAndConditions: boolean()
    .required()
    .isTrue('Please accept terms and conditions'),
  image: mixed<FileList>()
    .required('Image is requirred')
    .test('is-valid-type', 'Not a valid image type', (files) => {
      const file = files.item(0);
      return isValidFileType(
        (file && file.name && file.name.toLowerCase()) || '',
      );
    })
    .test('is-valid-size', 'max allowed size is 100kb', (files) => {
      const file = files.item(0);
      return !!file && file.size <= MAX_FILE_SIZE;
    }),
  country: string().required('Country is required').strict(),
});

export default userSchema;
