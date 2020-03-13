import React, { ReactNode, FunctionComponent, ReactElement } from 'react';
import classnames from 'classnames';

import { prefixComponents, Class, Classes } from '../components';
import './styles.scss';

export const flexComponentName = 'flex';

export enum Vertical {
  top = 'top',
  bottom = 'bottom'
}

export enum Horizontal {
  left = 'left',
  right = 'right'
}

export enum Direction {
  column = 'column'
}

export enum Line {
  multi = 'multi'
}

export interface IFlexProps {
  direction?: Direction.column;
  vertical?: Vertical.bottom | Vertical.top;
  horizontal?: Horizontal.left | Horizontal.right;
  multiLine?: boolean;
  testId?: string;
  children?: ReactNode;
}

const Flex: FunctionComponent<IFlexProps> = (props): ReactElement => {
  // TODO: P2-134 Extract getTestId function and share as components helper
  const getTestId = (): string => {
    let testId = `${prefixComponents}-${flexComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
  };

  const getDirections = (): Classes => {
    const directions = [];
    if (props?.direction) {
      directions.push(Direction?.column);
    }

    return directions;
  };

  const getAligns = (): Classes => {
    const aligns = [];

    if (props?.vertical) {
      aligns.push(Vertical[props?.vertical]);
    }

    if (props?.horizontal) {
      aligns.push(Horizontal[props?.horizontal]);
    }

    return aligns;
  };

  const getMultiLines = (): Classes => {
    const multiLines = [];

    if (props?.multiLine) {
      multiLines.push(Line.multi);
    }

    return multiLines;
  };

  const getClass = (): Class => {
    const directions = getDirections();
    const aligns = getAligns();
    const multiLines = getMultiLines();
    let flexClass: Class;
    flexClass = `${prefixComponents}-${flexComponentName}`;

    if (directions.length > 0) flexClass = flexClass.concat(' ', directions.join(' '));
    if (aligns.length > 0) flexClass = flexClass.concat(' ', aligns.join(' '));
    if (multiLines.length > 0) flexClass = flexClass.concat(' ', multiLines.join(' '));

    return flexClass;
  };

  const flexClass = getClass();
  const testId = getTestId();
  const { children } = props;

  return (
    <div
      className={classnames(`${flexClass}`)}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Flex;
