import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { prefixComponents } from '../../components';
import Button, {
  buttonComponentName,
  kind,
} from '../index';

const buttonTestId = `${prefixComponents}-${buttonComponentName}`;
const buttonText = 'Click Me';
const buttonDisableAttribute = 'disabled';

describe('<Button /> ', () => {
  afterAll(cleanup);

  describe('Primary', () => {
    describe('Default behavior ', () => {
      const kindPrimaryPropValue = kind.primary?.propValue + '';
      const kindPrimaryClass = kind.primary?.class;
      const { getByTestId, unmount } = render(<Button kind={kindPrimaryPropValue}>{buttonText}</Button>);
      const buttonNode = getByTestId(buttonTestId);
      const buttonNodeClasses = buttonNode?.className;
      const buttonDisabledState = buttonNode?.getAttribute(buttonDisableAttribute);
      const enabled = null;

      it('should exists as ReactNode', () => {
        expect(buttonNode).toBeDefined();
      });

      it(`should has the default classes apply`, () => {
        expect(buttonNodeClasses).toBe(`${prefixComponents}-${buttonComponentName} ${kindPrimaryClass}`);
      });

      it('should be enabled', () => {
        expect(buttonDisabledState).toBe(enabled);
      });

      unmount();
    });

    describe('Custom behavior', () => {
      it('should be disabled if disabled prop is true', () => {
        const { getByTestId, unmount } = render(<Button disabled={true}>{buttonText}</Button>);
        const buttonNode = getByTestId(buttonTestId);
        const buttonDisabledState = buttonNode?.getAttribute(buttonDisableAttribute);
        const disabled = ""

        expect(buttonDisabledState).toBe(disabled);

        unmount();
      });

      it('should execute handler onClick if we pass a callback', () => {
        const mockHandleOnClick = jest.fn(():void => {});
        const { getByTestId, unmount } = render(<Button onClick={mockHandleOnClick}>{buttonText}</Button>);
        const buttonNode = getByTestId(buttonTestId);
        const mouseClickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })

        fireEvent( buttonNode, mouseClickEvent);
        expect(mockHandleOnClick.mock.calls.length).toBe(1);

        unmount();
      });
    });

    describe('Working like a wrapper', () => {
      it('should wrap their child with a button container', () => {
        const wrappedTestId = "child-node";
        const { getByTestId, unmount } = render(<Button><span data-testid={wrappedTestId}>{buttonText}</span></Button>);
        const buttonNode = getByTestId(buttonTestId);
        const wrappedNode = getByTestId(wrappedTestId);
        const wrappedParentNode = wrappedNode.parentNode;

        expect(buttonNode).toBeDefined();
        expect(wrappedNode).toBeDefined();
        expect(wrappedParentNode).toBe(buttonNode);

        unmount();
      });
    })
  });
});
