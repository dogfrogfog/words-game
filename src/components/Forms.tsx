import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from 'hooks/useLogin';
import useRegistration from 'hooks/useRegistation';
import { formLoginSchema, formRegSchema } from 'schemas/formShemas';
import { KindForm } from 'constants/kindForm';
import { useContext } from 'react';
import { Context } from 'context/context';
import Spinner from './Spinner';

export type FormInputs = {
  username?: string;
  email: string;
  password: string;
  confirm?: string;
};

interface IFormProps {
  typeForm: string;
  onClose: () => void;
}

const Form = ({ typeForm, onClose }: IFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: 'all',
    resolver: zodResolver(typeForm === KindForm.LOGIN ? formLoginSchema : formRegSchema),
  });

  const { state, dispatch } = useContext(Context);

  const {
    mutate: regisrtation,
    isLoading: isRegLoading,
    error: regError,
    isSuccess: isSuccessReg,
  } = useRegistration(dispatch);
  const {
    mutate: login,
    isLoading: isLoginLoading,
    error: loginError,
    isSuccess: isSuccessLogin,
  } = useLogin(dispatch);

  const error = loginError || regError;

  const onRegistration: SubmitHandler<FormInputs> = ({ username, password, email }) => {
    if (username) {
      regisrtation({
        name: username,
        password,
        email,
      });
      reset({
        password: '',
        confirm: '',
      });
    }
  };

  const onLogin: SubmitHandler<FormInputs> = ({ email, password }) => {
    login({
      password,
      email,
    });

    if (isSuccessLogin) {
      onClose();
    } else {
      reset({
        password: '',
      });
    }
  };

  const onSubmit = typeForm === KindForm.LOGIN ? onLogin : onRegistration;

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className='text-lg p-5'>
      {typeForm === 'registration' ? (
        <div className='my-3'>
          <input {...register('username')} placeholder='Username' autoComplete='on' />
          {errors.username && <p className='form__input'>{errors.username.message}</p>}
        </div>
      ) : null}
      <div className='my-3'>
        <input {...register('email')} placeholder='Email' autoComplete='on' />
        {errors.email && <p className='form__input'>{errors.email.message}</p>}
      </div>
      <div className='my-3'>
        <input
          {...register('password')}
          placeholder='Password'
          type='password'
          autoComplete='off'
        />
        {errors.password && <p className='form__input'>{errors.password.message}</p>}
      </div>
      {typeForm === 'registration' ? (
        <div className='my-3'>
          <input
            {...register('confirm')}
            placeholder='Confirm password'
            type='password'
            autoComplete='off'
          />
          {errors.confirm && <p className='form__input'>{errors.confirm.message}</p>}
        </div>
      ) : null}
      {regError || loginError ? (
        <p className='form__error'>{error && error.response?.data}</p>
      ) : null}
      {isRegLoading || isLoginLoading ? (
        <Spinner />
      ) : (
        <input
          type='submit'
          disabled={!isValid}
          className='text-xl bg-blue-400 px-3 py-2 transition-colors hover:bg-blue-500 cursor-pointer block mx-auto disabled:bg-blue-200 '
          value='Submit'
        />
      )}
    </form>
  );
};
export { Form };