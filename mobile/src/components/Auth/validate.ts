import passwordValidator from 'password-validator';

const schema = new passwordValidator();

export default function validate(password: string) {
  return schema.validate(password);
}
