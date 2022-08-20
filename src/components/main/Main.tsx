import Article from 'components/article/Article';
import Sidebar from 'components/sidebar/SideBar';

const Main = () => (
  <main className='flex justify-between px-2 h-full'>
    <Sidebar />
    <Article />
  </main>
);

export default Main;
