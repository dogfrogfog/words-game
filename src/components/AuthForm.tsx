import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  login: string;
  email: string;
  password: string;
}

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className='
        block
        mg-3
        ml-3
        border-blue-400
         border
         p-1
         '
  />
));

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data.email);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className='text-lg mb-2'>
      <Input
        {...register('login', {
          required: true,
        })}
        placeholder='Login'
      />
      {errors.login && <div className=''>{errors.login.message}</div>}

      <Input
        {...register('email', {
          required: true,
        })}
        placeholder='Email'
      />
      <Input
        {...register('password', {
          required: true,
          minLength: 8,
        })}
        placeholder='Password'
      />
      <input
        type='submit'
        className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500 block mx-auto'
      />
    </form>
  );
};

const RegisterForm = () => <h1>Hy</h1>;

export { LoginForm, RegisterForm };
