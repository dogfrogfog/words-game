import Home from 'pages/home';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useState } from 'react';

const App = () => {
  const [isMenuOpen, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((prev: boolean) => !prev);
  };
  return (
    <div className='flex flex-col justify-between h-screen pt-[70px] relative'>
      <Header menuState={isMenuOpen} toggleMenu={toggleMenu} />
      <main className='flex justify-between pr-2 h-full'>
        <Sidebar menuState={isMenuOpen} />
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
