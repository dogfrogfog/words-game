import { useState } from 'react';
import { Route, ReactLocation, Outlet, Router } from '@tanstack/react-location';

import { Routes } from 'constants/routes';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Wordbook from 'pages/Wordbook';
import Home from 'pages/home';
import Statistics from 'pages/Statistics';
import Sprint from 'pages/Sprint';
import Challenge from 'pages/Challenge';
import Modal from './Modal';

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
    element: <Statistics />,
  },
  {
    path: Routes.CHALLANGE,
    element: <Challenge />,
  },
];

const App = () => {
  const [isMenuOpen, setMenu] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const toggleMenu = () => {
    setMenu((prev: boolean) => !prev);
  };
  const handleClose = () => setModalActive(false);

  return (
    <Router routes={routes} location={location}>
      <div className='flex flex-col justify-between h-screen pt-[70px] relative'>
        <Header
          handleOpen={() => setModalActive(true)}
          menuState={isMenuOpen}
          toggleMenu={toggleMenu}
        />
        <main className='flex justify-between pr-2 h-full'>
          <Sidebar menuState={isMenuOpen} />
          <Outlet />
        </main>
        <Footer />
        <Modal onClose={handleClose} visible={modalActive} />
      </div>
    </Router>
  );
};

export default App;
