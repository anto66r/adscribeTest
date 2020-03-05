import React from 'react';
import { screen, cleanup, render } from '@testing-library/react';

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
    render(<Flex/>);
    const flexNode = screen.getByTestId(flexTestId);

    it('should exists as ReactNode in document', () => {
      expect(flexNode).toBeInTheDocument();
    });

    it(`should has row direction with center align in one line`, () => {
      expect(flexNode).toHaveClass(`${prefixComponents}-${flexComponentName}`);
    });
  });

  describe('Custom behavior', () => {
    it('should has column direction with center align in one line', () => {
      const directionColumnPropValue = Direction.column;
      const directionColumnClass = Direction.column;
      render(<Flex direction={directionColumnPropValue}/>);
      const flexNode = screen.getByTestId(flexTestId);

      expect(flexNode).toBeInTheDocument();
      expect(flexNode).toHaveClass(`${prefixComponents}-${flexComponentName} ${directionColumnClass}`);
    });

    it('should has row direction with top left align in one line', () => {
      const horizontalLeftPropValue = Horizontal.left;
      const horizontalLeftClass = Horizontal.left;
      const verticalTopPropValue = Vertical.top;
      const verticalTopClass = Vertical.top;
      render(
        <Flex
          horizontal={horizontalLeftPropValue}
          vertical={verticalTopPropValue}
        >
        </Flex>
      );
      const flexNode = screen.getByTestId(flexTestId);

      expect(flexNode).toBeInTheDocument();
      expect(flexNode).
        toHaveClass(`${prefixComponents}-${flexComponentName} ${verticalTopClass} ${horizontalLeftClass}`);
    });

    it('should has row direction with bottom right align in one line', () => {
      const horizontalRightPropValue = Horizontal.right;
      const horizontalRightClass = Horizontal.right;
      const verticalBottomPropValue = Vertical.bottom;
      const verticalBottomClass = Vertical.bottom;
      render(
        <Flex
          horizontal={horizontalRightPropValue}
          vertical={verticalBottomPropValue}
        >
        </Flex>
      );
      const flexNode = screen.getByTestId(flexTestId);

      expect(flexNode).toBeInTheDocument();
      expect(flexNode).
        toHaveClass(`${prefixComponents}-${flexComponentName} ${verticalBottomClass} ${horizontalRightClass}`);
    });

    it('should has row direction with center align in multiple lines', () => {
      const multiLinePropValue = true;
      const multiLineClass = Line.multi;
      render(<Flex multiLine={multiLinePropValue}></Flex>);
      const flexNode = screen.getByTestId(flexTestId);

      expect(flexNode).toBeInTheDocument();
      expect(flexNode).toHaveClass(`${prefixComponents}-${flexComponentName} ${multiLineClass}`);
    });
  });

  describe('Working like a wrapper', () => {
    it('should wrap their child with a flex container', () => {
      const wrappedTestId = "child-node";
      render(<Flex><p data-testid={wrappedTestId}>Child example</p></Flex>);
      const flexNode = screen.getByTestId(flexTestId);scrollX
      const wrappedNode = screen.getByTestId(wrappedTestId);

      expect(flexNode).toBeInTheDocument();
      expect(wrappedNode).toBeInTheDocument();
      expect(flexNode).toContainElement(wrappedNode);
    });
  })
});
