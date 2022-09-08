import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-location';

import home from 'assets/svg/home.svg';
import wordbook from 'assets/svg/book.svg';
import audioChallenge from 'assets/svg/audio.svg';
import sprint from 'assets/svg/sprint.svg';
import statistics from 'assets/svg/statistics.svg';

import { Routes } from 'constants/routes';

interface ISidebarProps {
  menuState: boolean;
}
interface IMenuImages {
  audioChallenge: string;
  home: string;
  wordbook: string;
  sprint: string;
  statistics: string;
}

const menuImages: IMenuImages = {
  audioChallenge,
  home,
  wordbook,
  sprint,
  statistics,
};

interface ILinkItemProps {
  children: ReactNode;
  image: keyof IMenuImages;
  route: Routes;
  query?: string;
}

const LinkItem = ({ children, image, route, query = '' }: ILinkItemProps) => {
  const to = !query ? `${route}` : `${route}${query}`;
  return (
    <Link
      to={to}
      className='group hover:text-orange-500 duration-300 transition-colors cursor-pointer flex flex-col items-center'
    >
      <div className='w-[50px] h-[50px] text-center'>
        <img
          src={menuImages[image]}
          alt={image}
          className='h-[50px] object-contain group-hover:scale-75 transition-transform duration-500 inline-block'
        />
      </div>
      <span className='text-center'>{children}</span>
    </Link>
  );
};

LinkItem.defaultProps = {
  query: '',
};

const Sidebar = ({ menuState }: ISidebarProps) => {
  const asideWidth = menuState ? 'max-w-[110px]' : 'max-w-0';
  const asideClass = `min-h-full bg-gray-100 border-x-4 divide-double rounded pt-1 overflow-hidden transition-all duration-500 ${asideWidth} md:max-w-[110px]`;
  return (
    <aside className={asideClass}>
      <nav className='container flex flex-col gap-[25px] items-center h-full text-xl font-bold'>
        <LinkItem route={Routes.HOME} image='home'>
          Home
        </LinkItem>
        <LinkItem route={Routes.WORDBOOK} image='wordbook'>
          Wordbook
        </LinkItem>
        <LinkItem route={Routes.CHALLENGE} image='audioChallenge'>
          Audio Challenge
        </LinkItem>
        <LinkItem route={Routes.SPRINT} image='sprint' query='?from=menu'>
          Sprint
        </LinkItem>
        <LinkItem route={Routes.STATISTICS} image='statistics'>
          Statistics
        </LinkItem>
      </nav>
    </aside>
  );
};

export default Sidebar;
