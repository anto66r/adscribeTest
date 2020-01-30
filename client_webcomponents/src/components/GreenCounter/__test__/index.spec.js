import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GreenCounter from '../';

describe('GreenCounter', () => {
  it('Renders correctly', () => {
    const { getByText } = render(<GreenCounter initCounter={3} label="The counter" />);
    expect(getByText(/The counter: 3/)).toBeTruthy();
  });
  test.each([
    [/\+1/, /The counter: 4/],
    [/-1/, /The counter: 2/]
  ])('Counter works as expected when %p is clicked', (button, text) => {
    const changeHandler = jest.fn();
    const { getByText } = render(
      <GreenCounter initCounter={3} label="The counter" onChange={changeHandler} />
    );
    fireEvent.click(getByText(button));
    expect(getByText(text)).toBeTruthy();
    expect(changeHandler).toHaveBeenCalledWith('green');
  });
});
