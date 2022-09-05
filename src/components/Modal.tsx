import { ReactNode, useState } from 'react';
import { Form } from './Forms';

interface IModalProps {
  visible: boolean;
  onClose: () => void;
}
const LinkForm = ({
  isActive,
  children,
  onActive,
}: {
  isActive: boolean;
  children: ReactNode;
  onActive: () => void;
}) => {
  const defaultClass = 'flex items-center justify-center flex-[1_1_50%] p-2 border-b-2';

  const classLink = isActive
    ? `${defaultClass} border-blue-400`
    : `${defaultClass} border-grey-400'`;

  return (
    <button type='button' className={classLink} onClick={() => onActive()}>
      {children}
    </button>
  );
};

const Modal = ({ visible, onClose }: IModalProps) => {
  const [activeForm, setActiveForm] = useState('registration');

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
      items-center
      z-50'
    >
      <div
        className='bg-white rounded-md w-[512px] max-w-lg'
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-hidden
      >
        <div className='flex'>
          <LinkForm isActive={activeForm === 'login'} onActive={() => setActiveForm('login')}>
            Login
          </LinkForm>
          <LinkForm
            isActive={activeForm === 'registration'}
            onActive={() => setActiveForm('registration')}
          >
            Registration
          </LinkForm>
        </div>

        <Form typeForm={activeForm} onClose={onClose} />
      </div>
    </div>
  );
};

export default Modal;
