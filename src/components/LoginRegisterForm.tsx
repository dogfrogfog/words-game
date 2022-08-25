interface IFormProps {
  visible: boolean;
  onChange: () => void;
}

interface IInput {
  type: string;
}

const Input = ({ type }: IInput) => (
  <input
    className='ml-3
   border-blue-400
    border
    p-1'
    type={type}
    id={type}
  />
);

const LoginForm = ({ visible, onChange }: IFormProps) => {
  if (!visible) return null;
  return (
    <div>
      <h4 className='text-2xl text-center font-bold mb-3'>Authorization</h4>
      <form className='text-lg mb-2'>
        <label htmlFor='email' className='mb-2 flex justify-between'>
          Email:
          <Input type='email' />
        </label>
        <label htmlFor='password' className='mb-2 flex justify-between'>
          Password:
          <Input type='password' />
        </label>
        <button
          type='submit'
          className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500 block mx-auto'
        >
          Enter
        </button>
      </form>
      <p className='text-center'>
        Still don&lsquo;t have an account? Register
        <span
          className='cursor-pointer text-orange-400/90'
          onClick={onChange}
          onKeyDown={onChange}
          aria-hidden
        >
          &ensp;here.
        </span>
      </p>
    </div>
  );
};

const RegisterForm = ({ visible, onChange }: IFormProps) => {
  if (visible) return null;
  return (
    <div>
      <h4 className='text-2xl text-center font-bold mb-3'>Registration</h4>
      <form className='text-lg mb-2'>
        <label htmlFor='email' className='mb-2 flex justify-between'>
          Email:
          <Input type='email' />
        </label>
        <label htmlFor='password' className='mb-2 flex justify-between'>
          Password:
          <Input type='password' />
        </label>
        <button
          type='submit'
          className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500 block mx-auto'
        >
          Register
        </button>
      </form>
      <p className='text-center'>
        Got an account already? Login
        <span
          className='cursor-pointer text-orange-400/90'
          onClick={onChange}
          onKeyDown={onChange}
          aria-hidden
        >
          &ensp;here.
        </span>
      </p>
    </div>
  );
};

export { LoginForm, RegisterForm };
