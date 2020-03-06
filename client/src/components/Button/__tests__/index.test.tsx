import React from 'react';
import { screen, cleanup, render, fireEvent } from '@testing-library/react';

import { prefixComponents } from '../../components';
import Button, {
  buttonComponentName,
  Kind,
} from '../index';

const buttonTestId = `${prefixComponents}-${buttonComponentName}`;
const buttonText = 'Click Me';
const buttonDisableAttribute = 'disabled';

describe('<Button /> ', () => {
  afterAll(cleanup);

  describe('Primary', () => {
    describe('Default behavior ', () => {
      const kindPrimaryPropValue = Kind.primary;
      const kindPrimaryClass = Kind.primary;
      render(<Button kind={kindPrimaryPropValue}>buttonText</Button>);
      const buttonNode = screen.getByTestId(buttonTestId);

      it('should exists as ReactNode', () => {
        expect(buttonNode).toBeInTheDocument();
      });

      it(`should has the default classes apply`, () => {
        expect(buttonNode).toHaveClass(`${prefixComponents}-${buttonComponentName} ${kindPrimaryClass}`);
      });

      it('should be enabled', () => {
        expect(buttonNode).toBeEnabled();
      });
    });

    describe('Custom behavior', () => {
      it('should be disabled if disabled prop is true', () => {
        render(<Button disabled={true}>buttonText</Button>);
        const buttonNode = screen.getByTestId(buttonTestId);

        expect(buttonNode).toBeInTheDocument();
        expect(buttonNode).toBeDisabled();
      });

      it('should execute handler onClick if we pass a callback', () => {
        const mockHandleOnClick = jest.fn(():void => {});
        render(<Button onClick={mockHandleOnClick}>buttonText</Button>);
        const buttonNode = screen.getByTestId(buttonTestId);
        const leftClick = { button: 1 }

        fireEvent.click(buttonNode, leftClick);
        expect(buttonNode).toBeInTheDocument();
        expect(mockHandleOnClick.mock.calls.length).toBe(1);
      });
    });

    describe('Working like a wrapper', () => {
      it('should wrap their child with a button container', () => {
        const wrappedTestId = "child-node";
        const { getByTestId, unmount } = render(<Button><span data-testid={wrappedTestId}>buttonText</span></Button>);
        const buttonNode = getByTestId(buttonTestId);
        const wrappedNode = getByTestId(wrappedTestId);

        expect(buttonNode).toBeInTheDocument();
        expect(wrappedNode).toBeInTheDocument();
        expect(buttonNode).toContainElement(wrappedNode);
      });
    })
  });
});
