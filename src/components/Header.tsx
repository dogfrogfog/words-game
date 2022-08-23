import { ReactNode, useState } from 'react';

interface IButtonProps {
  children: ReactNode;
}

const Button = ({ children }: IButtonProps) => (
  <button
    type='button'
    className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500'
  >
    {children}
  </button>
);

const Logo = () => <h1 className='text-3xl'>RSLang</h1>;

const MenuButton = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className='flex lg:hidden'>
      <div className='space-y-2 group cursor-pointer'>
        <div className='w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-colors' />
        <div className='w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-colors' />
        <div className='w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-colors' />
      </div>
    </div>
  );
};
const Header = () => (
  <div className='flex gap-[40px] items-center justify-between w-full py-4 px-8 fixed top-0 left-0 bg-blue-400'>
    <MenuButton />
    <div className='mx-auto'>
      <Logo />
    </div>
    <Button>Login</Button>
  </div>
);

export default Header;
