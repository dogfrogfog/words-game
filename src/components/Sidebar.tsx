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

const Navigation = () => (
  <nav className='container flex flex-col gap-[25px] items-center text-xl font-bold'>
    <NavigationItem image='home'>Home</NavigationItem>
    <NavigationItem image='textbook'>Textbook</NavigationItem>
    <NavigationItem image='audioChallenge'>Audio Challenge</NavigationItem>
    <NavigationItem image='sprint'>Sprint</NavigationItem>
    <NavigationItem image='statistics'>Statistics</NavigationItem>
  </nav>
);

const Sidebar = () => (
  <aside className='w-[100px] min-w-[100px] min-h-full bg-gray-100 border-x-4 divide-double rounded pt-1'>
    <Navigation />
  </aside>
);

export default Sidebar;
