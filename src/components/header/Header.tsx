import Button from 'components/button/button';
import Logo from 'components/logo/Logo';
import Navigation from 'components/Navigation/Navigation';
import React from 'react';

const Header = () => (
  <div className='flex gap-[40px] items-center justify-between w-full py-4 px-8 fixed top-0 left-0 bg-blue-400'>
    <Logo />
    <div className='ml-auto'>
      <Navigation />
    </div>
    <Button>Login</Button>
  </div>
);

export default Header;
