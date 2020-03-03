import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { prefixComponents } from '../../components';
import Button, {
  buttonComponentName,
} from '../index';

const buttonTestId = `${prefixComponents}-${buttonComponentName}`;

xdescribe('<Fex /> ', () => {
  afterAll(cleanup);

  describe('Default behavior ', () => {
    const { getByTestId, unmount } = render(<Button></Button>);
    const buttonNode = getByTestId(buttonTestId);
    const buttonNodeClasses = buttonNode?.className;

    it('should exists as ReactNode', () => {
      expect(buttonNode).toBeDefined();
    });

    it(`should has row direction with center align in one line`, () => {
      expect(buttonNodeClasses).toBe(`${prefixComponents}-${buttonComponentName}`);
    });

    unmount()
  });

});
