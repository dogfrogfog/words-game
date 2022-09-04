import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContextProvider } from 'context/context';
import App from 'components/App';

import 'index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ContextProvider>
  </StrictMode>,
);
