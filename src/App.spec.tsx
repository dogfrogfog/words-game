import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from 'components/App';

describe('Component: App', () => {
  it('should successfully render component', () => {
    render(<App />);
  });
  it('contains "Logo"', () => {
    render(<App />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });
});
