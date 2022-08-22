import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('Component: App', () => {
  it('should successfully render component', () => {
    render(<App />);
  });
  it('contains "Hello world!"', () => {
    render(<App />);
    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });
});
