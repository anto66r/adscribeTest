import React from 'react';
import { screen, cleanup, render, fireEvent } from '@testing-library/react';

import { prefixComponents } from '../../components';
import Input, {
  inputComponentName,
  Type,
  States,
} from '../index';

const inputIdPrefix = `${prefixComponents}-${inputComponentName}`;
const inputTestId = `${prefixComponents}-${inputComponentName}`;
const inputDefaultCLass = `${prefixComponents}-${inputComponentName}`;
const inputId = "1";

describe('<Input /> ', () => {
  afterAll(cleanup);

  describe('Primary', () => {
    describe('Default behavior ', () => {
      const typePropValue = Type.text;
      render(<Input type={typePropValue} />);
      const inputNode = screen.getByTestId(inputTestId);

      it('should exists as ReactNode', () => {
        expect(inputNode).toBeInTheDocument();
      });

      it(`should has the default classes apply`, () => {
        expect(inputNode).toHaveClass(inputDefaultCLass);
      });

      it('should be enabled', () => {
        expect(inputNode).toBeEnabled();
      });
    });

    describe('Custom behavior', () => {
      const typePropValue = Type.text;

      it('should be disabled if disabled prop is true', () => {
        render(<Input id={inputId} type={typePropValue} disabled={true}/>);
        const inputNode = screen.getByTestId(inputTestId);

        expect(inputNode).toBeInTheDocument();
        expect(inputNode).toBeDisabled();
      });

      it('should has correct id if pass anyone in props', () => {
        render(<Input id={inputId} type={typePropValue} />);
        const inputNode = screen.getByTestId(inputTestId);

        expect(inputNode).toBeInTheDocument();
        expect(inputNode).toHaveAttribute('id', `${inputIdPrefix}-${inputId}`);
      });

      it('should has an initial value if pass anyone in props', () => {
        const inputIdInitialValue = 'Test';
        render(<Input type={typePropValue} value={inputIdInitialValue}/>);
        const inputNode = screen.getByTestId(inputTestId);

        expect(inputNode).toBeInTheDocument();
        expect(inputNode).toHaveValue(inputIdInitialValue);
      });

      it('should has an error class if hasError prop is true', () => {
        render(<Input type={typePropValue} hasError={true}/>);
        const inputNode = screen.getByTestId(inputTestId);

        expect(inputNode).toBeInTheDocument();
        expect(inputNode).toHaveClass(`${inputDefaultCLass} ${States.error}`);
      });

      it('should execute handler onChange if we pass a callback returning the new value', () => {
        const mockHandleOnChange = jest.fn(():void => {});
        render(<Input type={typePropValue} onChange={mockHandleOnChange} />);
        const inputNode = screen.getByTestId(inputTestId);
        const inputNewTarget = { target: { value: 'test' } }

        fireEvent.change(inputNode, inputNewTarget);
        expect(inputNode).toBeInTheDocument();
        expect(mockHandleOnChange).toHaveBeenCalledTimes(1);
      });
    });
  });
});
