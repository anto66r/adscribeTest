import React, { ReactNode, FunctionComponent } from 'react';
import classnames from 'classnames';

import { prefixComponents } from '../components';
import './styles.scss';

export const flexComponentName = 'flex';

export enum Vertical {
  top = "top",
  bottom = "bottom"
}

export enum Horizontal {
  left = "left",
  right = "right"
}

export enum Direction {
  column = "column"
}

export enum Line {
  multi = "multi"
}

type classes = string;

export interface IFlexProps {
  direction?: Direction.column;
  vertical?: Vertical.bottom | Vertical.top;
  horizontal?: Horizontal.left | Horizontal.right;
  multiLine?: boolean;
  testId?: string;
  children?: ReactNode;
}

const Flex: FunctionComponent<IFlexProps> = (props) => {
  const getTestId = () => {
    let testId = `${prefixComponents}-${flexComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
  }

  const getDirection = (): classes => {
    if (props?.direction) {
      return Direction[props?.direction];
    }

    return '';
  }

  const getAlign = (): classes => {
    let align = '';

    if (props?.vertical) {
      align += Vertical[props?.vertical] + ' ';
    }

    if (props?.horizontal) {
      align += Horizontal[props?.horizontal];
    }

    return align;
  }

  const getMultiLine = (): classes => {
    if (props?.multiLine) {
      return Line.multi;
    }

    return '';
   }

  const getClassesName = (): classes => {
    const direction = getDirection();
    const align = getAlign();
    const multiline = getMultiLine();

    return `${prefixComponents}-${flexComponentName}${direction ? ' ' + direction : ''}${align ? ' ' + align : ''}${multiline ? ' ' + multiline : ''}`
  }

  const classesName = getClassesName();
  const testId = getTestId();

  return (
    <div
      className={classnames(`${classesName}`)}
      data-testid={testId}
    >
      {props.children}
    </div>
  );
}

export default Flex;
