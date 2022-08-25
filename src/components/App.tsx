import { useState } from 'react';
import Home from 'pages/home';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Modal from './Modal';

const App = () => {
  const [modalActive, setModalActive] = useState(false);
  const handleOnClose = () => setModalActive(false);

  return (
    <div className='flex flex-col justify-between h-screen pt-[70px] relative'>
      <Header handleOpen={() => setModalActive(true)} />
      <main className='flex justify-between px-2 h-full'>
        <Home />
      </main>
      <Footer />
      <Modal onClose={handleOnClose} visible={modalActive} />
    </div>
  );
};

export default App;
