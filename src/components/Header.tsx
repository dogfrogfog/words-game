import { ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
}

interface IHeaderProps {
  menuState: boolean;
  toggleMenu: () => void;
}

const Button = ({ children }: IButtonProps) => (
  <button
    type='button'
    className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500'
  >
    {children}
  </button>
);

const MenuButton = ({ menuState, toggleMenu }: IHeaderProps) => {
  const first = menuState ? ' -rotate-45 translate-y-[11px]' : '';
  const second = menuState ? ' opacity-0' : '';
  const third = menuState ? ' rotate-45 -translate-y-[11px]' : '';

  return (
    <div className='flex md:hidden'>
      <button
        type='button'
        className='space-y-2 group cursor-pointer relative'
        onClick={toggleMenu}
      >
        <div
          className={`w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-all${first}`}
        />
        <div
          className={`w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-all${second}`}
        />
        <div
          className={`w-8 h-[0.20rem] bg-gray-700 group-hover:bg-orange-500/95 duration-300 transition-all${third}`}
        />
      </button>
    </div>
  );
};
const Header = ({ menuState, toggleMenu }: IHeaderProps) => (
  <div className='flex gap-[40px] items-center justify-between w-full py-4 px-8 fixed z-20 top-0 left-0 bg-blue-400'>
    <MenuButton menuState={menuState} toggleMenu={toggleMenu} />
    <div className='mx-auto'>
      <h1 className='text-3xl'>RS Lang</h1>
    </div>
    <Button>Login</Button>
  </div>
);

export default Header;
