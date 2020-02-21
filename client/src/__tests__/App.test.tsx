import { render } from '@testing-library/react';
import React from 'react';

import App from '../App';

describe('<App />', () => {
  test('should display Main page! header', () => {
    const { getByText } = render(<App />);
    expect(getByText('Login')).toBeTruthy();
  });
});
