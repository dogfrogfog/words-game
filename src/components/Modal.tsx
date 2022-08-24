interface IModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginForm = () => <div>Login form</div>;

const Modal = ({ visible, onClose }: IModalProps) => {
  const handleOnClose = () => {
    onClose();
  };
  if (!visible) return null;
  return (
    <div
      onClick={handleOnClose}
      onKeyDown={handleOnClose}
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
