import Home from 'pages/home';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

const App = () => (
  <div className='flex flex-col justify-between h-screen pt-[70px] relative'>
    <Header />
    <main className='flex justify-between pr-2 h-full'>
      <Sidebar />
      <Home />
    </main>
    <Footer />
  </div>
);

export default App;
