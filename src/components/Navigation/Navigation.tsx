import React from 'react';
import NavigationItem from './NavigationItem';

const Navigation = () => (
  <nav className='container flex gap-[50px] justify-between items-center text-xl font-bold'>
    <NavigationItem>Home</NavigationItem>
    <NavigationItem>Page1</NavigationItem>
    <NavigationItem>Page2</NavigationItem>
  </nav>
);

export default Navigation;
