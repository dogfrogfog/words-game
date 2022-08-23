import RssIcon from 'assets/svg/rs_school_js.svg';
import type { ReactNode } from 'react';

const developers = {
  Slanx: 'https://github.com/Slanx',
  NikitaKakurin: 'https://github.com/NikitaKakurin',
  Thelastandrew: 'https://github.com/thelastandrew',
};

interface IDevelopersLinkProps {
  children: ReactNode;
  href: string;
}

const DevelopersLink = ({ children, href }: IDevelopersLinkProps) => (
  <a
    href={href}
    target='_blank'
    className='uppercase no-underline text-lg
  transition-colors duration-300 hover:text-slate-500 cursor-pointer'
    rel='noreferrer'
  >
    {children}
  </a>
);

const Footer = () => (
  <footer className='flex justify-between gap-[10px] py-3 px-3 bg-blue-400'>
    <div className='flex gap-[10px] items-center'>
      <span className='uppercase text-lg'>
        <span className='border-r-2 border-black pr-1 mr-1'>© 2022 APPName</span>
        Разработчики:
      </span>
      {Object.entries(developers).map(([name, link]) => (
        <DevelopersLink href={link}>{name}</DevelopersLink>
      ))}
    </div>
    <a href='http://' target='_blank' className='w-[100px]' rel='noreferrer'>
      <img src={RssIcon} alt='RSSchool-logo' className='object-contain cursor-pointer' />
    </a>
  </footer>
);

export default Footer;
