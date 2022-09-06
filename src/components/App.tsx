import { useState } from 'react';
// eslint-disable-next-line prettier/prettier, object-curly-newline
import {
  Route,
  createBrowserHistory,
  ReactLocation,
  Outlet,
  Router,
  // eslint-disable-next-line object-curly-newline
} from '@tanstack/react-location';

import { Routes } from 'constants/routes';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Wordbook from 'pages/Wordbook';
import Home from 'pages/Home';
import Statistics from 'pages/Statistics';
import Sprint from 'pages/Sprint';
import Challenge from 'pages/Challenge';
import Modal from './Modal';

const history = createBrowserHistory();
const location = new ReactLocation({
  history,
});

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
      <div className='flex flex-col justify-between pt-[68px] relative'>
        <Header
          handleOpen={() => setModalActive(true)}
          menuState={isMenuOpen}
          toggleMenu={toggleMenu}
        />
        <main className='flex justify-between h-full'>
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
