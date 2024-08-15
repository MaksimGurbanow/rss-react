import { addMethod, object, string } from 'yup';

addMethod(string, 'capitalize', function isCapitalized(value) {
  console.log(value);
  return value;
});

const userSchema = object({
  name: string().capitalize(),
});

export default userSchema;
