interface IFormProps {
  visible: boolean;
  onChange: () => void;
}

const LoginForm = ({ visible, onChange }: IFormProps) => {
  if (!visible) return null;
  return (
    <div>
      <h4 className='text-2xl text-center font-bold mb-3'>Authorization</h4>
      <p className='text-center'>authorization form goes here.</p>
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
      <p className='text-center'>registration form goes here.</p>
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
