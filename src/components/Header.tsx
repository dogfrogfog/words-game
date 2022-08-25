import type { ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  openForm: () => void;
}

interface INavigationItemProps {
  children: ReactNode;
}

const Button = ({ children, openForm }: IButtonProps) => (
  <button
    type='button'
    className='text-xl bg-orange-400/90 rounded-full px-3 py-1 transition-colors hover:bg-orange-500'
    onClick={openForm}
  >
    {children}
  </button>
);

const Logo = () => <h1 className='text-3xl'>Logo</h1>;

const NavigationItem = ({ children }: INavigationItemProps) => (
  <span className='hover:text-orange-500 duration-300 transition-colors cursor-pointer'>
    {children}
  </span>
);

const Navigation = () => (
  <nav className='container flex gap-[50px] justify-between items-center text-xl font-bold'>
    <NavigationItem>Home</NavigationItem>
    <NavigationItem>Page1</NavigationItem>
    <NavigationItem>Page2</NavigationItem>
  </nav>
);

interface IHeaderProps {
  handleOpen: () => void;
}

const Header = ({ handleOpen }: IHeaderProps) => (
  <div className='flex gap-[40px] items-center justify-between w-full py-4 px-8 fixed top-0 left-0 bg-blue-400'>
    <Logo />
    <div className='ml-auto'>
      <Navigation />
    </div>
    <Button openForm={handleOpen}>Login</Button>
  </div>
);

export default Header;
