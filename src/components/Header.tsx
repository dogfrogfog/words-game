import type { ReactNode } from 'react';
import homeImg from 'assets/svg/menu/home.svg';
import bookImg from 'assets/svg/menu/book.svg';
import audioImg from 'assets/svg/menu/audio.svg';
import sprintImg from 'assets/svg/menu/sprint.svg';
import statisticsImg from 'assets/svg/menu/statistics.svg';

interface IMenuImages {
  audioChallenge: string;
  home: string;
  textbook: string;
  sprint: string;
  statistics: string;
}

const menuImages: IMenuImages = {
  audioChallenge: audioImg,
  home: homeImg,
  textbook: bookImg,
  sprint: sprintImg,
  statistics: statisticsImg,
};
interface IButtonProps {
  children: ReactNode;
}

interface INavigationItemProps {
  children: ReactNode;
  image: keyof IMenuImages;
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

const NavigationItem = ({ children, image }: INavigationItemProps) => (
  <div className='group hover:text-orange-500  duration-300 transition-colors cursor-pointer flex flex-col items-center'>
    <div className='w-[50px] h-[50px]'>
      <img
        src={menuImages[image]}
        alt={image}
        className='h-[50px] object-contain group-hover:scale-75 transition-transform duration-500'
      />
    </div>
    <span>{children}</span>
  </div>
);

const Navigation = () => (
  <nav className='hidden container lg:flex gap-[50px] justify-between items-center text-xl font-bold'>
    <NavigationItem image='home'>Home</NavigationItem>
    <NavigationItem image='textbook'>Textbook</NavigationItem>
    <NavigationItem image='audioChallenge'>Audio Challenge</NavigationItem>
    <NavigationItem image='sprint'>Sprint</NavigationItem>
    <NavigationItem image='statistics'>Statistics</NavigationItem>
  </nav>
);

const MenuButton = () => (
  <div className='flex lg:hidden'>
    <div className='space-y-2'>
      <div className='w-8 h-0.5 bg-gray-600' />
      <div className='w-8 h-0.5 bg-gray-600' />
      <div className='w-8 h-0.5 bg-gray-600' />
    </div>
  </div>
);

const Header = () => (
  <div className='flex gap-[40px] items-center justify-between w-full py-4 px-8 fixed top-0 left-0 bg-blue-400'>
    <MenuButton />
    <Logo />
    <div className='ml-auto'>
      <Navigation />
    </div>
    <Button>Login</Button>
  </div>
);

export default Header;
