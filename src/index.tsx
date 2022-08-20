import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'index.css';

const App = () => (
  <div className='App'>
    <h1 className='text-5xl font-bold text-green-400'>Hello world!</h1>
  </div>
);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default App;
