import type { ReactNode } from 'react';
import home from 'assets/svg/home.svg';
import textbook from 'assets/svg/book.svg';
import audioChallenge from 'assets/svg/audio.svg';
import sprint from 'assets/svg/sprint.svg';
import statistics from 'assets/svg/statistics.svg';

interface ISidebarProps {
  menuState: boolean;
}
interface IMenuImages {
  audioChallenge: string;
  home: string;
  textbook: string;
  sprint: string;
  statistics: string;
}

const menuImages: IMenuImages = {
  audioChallenge,
  home,
  textbook,
  sprint,
  statistics,
};

interface INavigationItemProps {
  children: ReactNode;
  image: keyof IMenuImages;
}

const NavigationItem = ({ children, image }: INavigationItemProps) => (
  <div className='group hover:text-orange-500 duration-300 transition-colors cursor-pointer flex flex-col items-center'>
    <div className='w-[50px] h-[50px]'>
      <img
        src={menuImages[image]}
        alt={image}
        className='h-[50px] object-contain group-hover:scale-75 transition-transform duration-500'
      />
    </div>
    <span className='text-center'>{children}</span>
  </div>
);

const Sidebar = ({ menuState }: ISidebarProps) => {
  const asideWidth = menuState ? 'max-w-[110px]' : 'max-w-0';
  const asideClass = `min-h-full bg-gray-100 border-x-4 divide-double rounded pt-1 overflow-hidden transition-all duration-500 ${asideWidth} md:max-w-[110px]`;
  return (
    <aside className={asideClass}>
      <nav className='container flex flex-col gap-[25px] items-center h-full text-xl font-bold'>
        <NavigationItem image='home'>Home</NavigationItem>
        <NavigationItem image='textbook'>Textbook</NavigationItem>
        <NavigationItem image='audioChallenge'>Audio Challenge</NavigationItem>
        <NavigationItem image='sprint'>Sprint</NavigationItem>
        <NavigationItem image='statistics'>Statistics</NavigationItem>
      </nav>
    </aside>
  );
};

export default Sidebar;
