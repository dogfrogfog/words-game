import { useState } from 'react';
import { Route, ReactLocation, Outlet, Router } from '@tanstack/react-location';
import Routes from 'constants/routes';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import Wordbook from 'pages/Wordbook';
import Home from 'pages/Home';
import Statictics from 'pages/Statistics';
import Sprint from 'pages/Sprint';
import Challange from 'pages/Challenge';

const location = new ReactLocation();

const routes: Route[] = [
  {
    path: Routes.HOME,
    element: <Home />,
  },
  {
    path: Routes.WORDBOOK,
    element: <Wordbook />,
  },
  {
    path: Routes.SPRINT,
    element: <Sprint />,
  },
  {
    path: Routes.STATICTICS,
    element: <Statictics />,
  },
  {
    path: Routes.CHALLANGE,
    element: <Challange />,
  },
];

const App = () => {
  const [isMenuOpen, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((prev: boolean) => !prev);
  };
  return (
    <Router routes={routes} location={location}>
      <div className='flex flex-col justify-between min-h-screen pt-[68px] relative'>
        <Header menuState={isMenuOpen} toggleMenu={toggleMenu} />
        <main className='flex justify-between h-full'>
          <Sidebar menuState={isMenuOpen} />
          <Outlet />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
