import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Main from 'components/main/Main';
import React from 'react';

const App = () => (
  <div className='flex flex-col justify-between h-screen pt-[70px] relative'>
    <Header />
    <Main />
    <Footer />
  </div>
);

export default App;
