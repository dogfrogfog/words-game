import React from 'react';

interface IProps {
  children: React.ReactNode;
}
const classItem = 'hover:text-orange-500 duration-300 transition-colors cursor-pointer';
const NavigationItem = ({ children }: IProps) => <span className={classItem}>{children}</span>;

export default NavigationItem;
