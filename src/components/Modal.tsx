import { useState } from 'react';
import { LoginForm, RegisterForm } from './AuthForm';

interface IModalProps {
  visible: boolean;
  onClose: () => void;
}

const Modal = ({ visible, onClose }: IModalProps) => {
  const [formActive, setFormActive] = useState(true);
  if (!visible) return null;
  return (
    <div
      onClick={() => onClose()}
      onKeyDown={() => onClose()}
      aria-hidden
      className='w-screen h-screen
      fixed inset-0
      bg-black
      bg-opacity-50
      flex
      justify-center
      items-center'
    >
      <div
        className='p-5 bg-white rounded-md'
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-hidden
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default Modal;
