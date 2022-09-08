import { ReactNode } from 'react';

interface IPageTitleProps {
  children: ReactNode;
}

const PageTitle = ({ children }: IPageTitleProps) => (
  <div className='text-2xl font-bold'>{children}</div>
);

export default PageTitle;
