interface IProps {
  children: React.ReactNode;
}
const Button = ({ children }: IProps) => (
  <button
    type='button'
    className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500'
  >
    {children}
  </button>
);

export default Button;
