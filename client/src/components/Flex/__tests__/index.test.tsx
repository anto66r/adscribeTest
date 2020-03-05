import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { prefixComponents } from '../../components';
import Flex, {
  flexComponentName,
  Direction,
  Horizontal,
  Vertical,
  Line,
} from '../index';

const flexTestId = `${prefixComponents}-${flexComponentName}`;

describe('<Flex /> ', () => {
  afterAll(cleanup);

  describe('Default behavior ', () => {
    const { getByTestId, unmount } = render(<Flex></Flex>);
    const flexNode = getByTestId(flexTestId);
    const flexNodeClasses = flexNode?.className;

    it('should exists as ReactNode', () => {
      expect(flexNode).toBeDefined();
    });

    it(`should has row direction with center align in one line`, () => {
      expect(flexNodeClasses).toBe(`${prefixComponents}-${flexComponentName}`);
    });

    unmount()
  });

  describe('Custom behavior', () => {
    it('should has column direction with center align in one line', () => {
      const directionColumnPropValue = Direction.column;
      const directionColumnClass = Direction.column;
      const { getByTestId, unmount } = render(<Flex direction={directionColumnPropValue}></Flex>);
      const flexNode = getByTestId(flexTestId);
      const flexNodeClasses = flexNode?.className;

      expect(flexNode).toBeDefined();
      expect(flexNodeClasses).toBe(`${prefixComponents}-${flexComponentName} ${directionColumnClass}`);

      unmount()
    });

    it('should has row direction with top left align in one line', () => {
      const horizontalLeftPropValue = Horizontal.left;
      const horizontalLeftClass = Horizontal.left;
      const verticalTopPropValue = Vertical.top;
      const verticalTopClass = Vertical.top;
      const { getByTestId, unmount } = render(
        <Flex
          horizontal={horizontalLeftPropValue}
          vertical={verticalTopPropValue}
        >
        </Flex>
      );
      const flexNode = getByTestId(flexTestId);
      const flexNodeClasses = flexNode?.className;

      expect(flexNode).toBeDefined();
      expect(flexNodeClasses).
        toBe(`${prefixComponents}-${flexComponentName} ${verticalTopClass} ${horizontalLeftClass}`);

      unmount()
    });

    it('should has row direction with bottom right align in one line', () => {
      const horizontalRightPropValue = Horizontal.right;
      const horizontalRightClass = Horizontal.right;
      const verticalBottomPropValue = Vertical.bottom;
      const verticalBottomClass = Vertical.bottom;
      const { getByTestId, unmount } = render(
        <Flex
          horizontal={horizontalRightPropValue}
          vertical={verticalBottomPropValue}
        >
        </Flex>
      );
      const flexNode = getByTestId(flexTestId);
      const flexNodeClasses = flexNode?.className;

      expect(flexNode).toBeDefined();
      expect(flexNodeClasses).
        toBe(`${prefixComponents}-${flexComponentName} ${verticalBottomClass} ${horizontalRightClass}`);

      unmount()
    });

    it('should has row direction with center align in multiple lines', () => {
      const multiLinePropValue = true;
      const multiLineClass = Line.multi;
      const { getByTestId, unmount } = render(<Flex multiLine={multiLinePropValue}></Flex>);
      const flexNode = getByTestId(flexTestId);
      const flexNodeClasses = flexNode?.className;

      expect(flexNode).toBeDefined();
      expect(flexNodeClasses).toBe(`${prefixComponents}-${flexComponentName} ${multiLineClass}`);

      unmount()
    });
  });

  describe('Working like a wrapper', () => {
    it('should wrap their child with a flex container', () => {
      const wrappedTestId = "child-node";
      const { getByTestId, unmount } = render(<Flex><p data-testid={wrappedTestId}>Child example</p></Flex>);
      const flexNode = getByTestId(flexTestId);scrollX
      const wrappedNode = getByTestId(wrappedTestId);
      const wrappedParentNode = wrappedNode.parentNode;

      expect(flexNode).toBeDefined();
      expect(wrappedNode).toBeDefined();
      expect(wrappedParentNode).toBe(flexNode);

      unmount();
    });
  })
});
