import Home from 'components/pages/home';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import React from 'react';

const App = () => (
  <div className='flex flex-col justify-between h-screen pt-[70px] relative'>
    <Header />
    <Home />
    <Footer />
  </div>
);

export default App;
