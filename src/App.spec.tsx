import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

describe('Component: App', () => {
  it('renders without crashing', () => {
    const div = createRoot(document.createElement('div'));
    div.render(<App />);
  });
  it('contains "Hello world!"', () => {
    const { getByText } = render(<App />);
    const textElement = getByText(/hello world/i);
    expect(textElement).toBeInTheDocument();
  });
});
