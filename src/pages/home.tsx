const Main = () => (
  <main className='py-2 px-2 w-full'>
    <div>Main</div>
  </main>
);

const Sidebar = () => (
  <aside className='w-[30%] min-w-[300px] min-h-full bg-gray-100 border-x-4 divide-double rounded'>
    <div className='py-2 px-2'>sidebar</div>
  </aside>
);

const Home = () => (
  <>
    <Sidebar />
    <Main />
  </>
);

export default Home;
