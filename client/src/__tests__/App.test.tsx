import { render, screen } from '@testing-library/react';
import React from 'react';

import App from '../App';

describe('<App />', () => {
  test('should display Main page! header', () => {
    render(<App />);
    expect(screen.getByText('User')).toBeInTheDocument();
  });
});
