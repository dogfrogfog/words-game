import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from 'hooks/useLogin';
import useRegistration from 'hooks/useRegistation';
import { formLoginSchema, formRegSchema } from 'schemas/formShemas';
import { KindForm } from 'constants/kindForm';
import { AxiosError } from 'axios';
import Spinner from './Spinner';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className='block
        my-3
        border-blue-400
         border-2
        p-2
        w-[100%]
         '
  />
));

const Field = ({ children }: { children: ReactNode }) => <div className='my-3'>{children}</div>;

const ButtonSubmit = ({ isValid }: { isValid: boolean }) => (
  <input
    type='submit'
    disabled={isValid}
    className='text-xl bg-blue-400 px-3 py-2 transition-colors hover:bg-blue-500 cursor-pointer block mx-auto disabled:bg-blue-200 '
    value='Submit'
  />
);

export type FormInputs = {
  username?: string;
  email: string;
  password: string;
  confirm?: string;
};

const Form = ({ typeForm }: { typeForm: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: 'all',
    resolver: zodResolver(typeForm === KindForm.LOGIN ? formLoginSchema : formRegSchema),
  });

  const { mutate: regisrtation, isLoading: isRegLoading, error: regError } = useRegistration();
  const { mutate: login, isLoading: isLoginLoading, error: loginError } = useLogin();

  const error = loginError || regError;

  const onRegistration: SubmitHandler<FormInputs> = ({ username, password, email }) => {
    if (username) {
      regisrtation({
        name: username,
        password,
        email,
      });
    }
    reset({
      password: '',
      confirm: '',
    });
  };

  const onLogin: SubmitHandler<FormInputs> = ({ email, password }) => {
    login({
      password,
      email,
    });
    reset({
      password: '',
    });
  };

  const onSubmit = typeForm === KindForm.LOGIN ? onLogin : onRegistration;

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className='text-lg p-5'>
      {typeForm === 'registration' ? (
        <Field>
          <Input {...register('username')} placeholder='Username' />
          {errors.username && <p className='text-sm text-blue-500'>{errors.username.message}</p>}
        </Field>
      ) : null}
      <Field>
        <Input {...register('email')} placeholder='Email' />
        {errors.email && <p className='text-sm text-blue-500'>{errors.email.message}</p>}
      </Field>
      <Field>
        <Input {...register('password')} placeholder='Password' type='password' />
        {errors.password && <p className='text-sm text-blue-500'>{errors.password.message}</p>}
      </Field>
      {typeForm === 'registration' ? (
        <Field>
          <Input {...register('confirm')} placeholder='Confirm password' type='password' />
          {errors.confirm && <p className='text-sm text-blue-500'>{errors.confirm.message}</p>}
        </Field>
      ) : null}
      {regError || loginError ? (
        <p className='text-base text-center text-blue-500 m-2'>{error && error.response?.data}</p>
      ) : null}
      {isRegLoading || isLoginLoading ? <Spinner /> : <ButtonSubmit isValid={!isValid} />}
    </form>
  );
};
export { Form };
