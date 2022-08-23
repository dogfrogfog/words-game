import type { ReactNode } from 'react';

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

export default DevelopersLink;
