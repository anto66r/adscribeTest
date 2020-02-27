import React, { ReactNode, FunctionComponent } from 'react';
import classnames from 'classnames';

import { prefixComponents } from '../components';
import './styles.scss';

export const flexComponentName = 'flex';

type option = {
  propValue: string | boolean;
  class: string;
}

type options = {
  column?: option;
  top?: option;
  bottom?: option;
  left?: option;
  right?: option;
  multi?: option;
}

export const direction: options = {
  column: {
    propValue: 'column',
    class: 'column',
  }
}

export const vertical: options = {
  top: {
    propValue: 'top',
    class: 'top',
  },
  bottom: {
    propValue: 'bottom',
    class: 'bottom',
  }
}

export const horizontal: options = {
  left: {
    propValue: 'left',
    class: 'left',
  },
  right: {
    propValue: 'right',
    class: 'right',
  }
}

export const line: options = {
  multi: {
    propValue: true,
    class: 'multi',
  },
}

type classes = string;

export interface IFlexProps {
  direction?: string;
  vertical?: string;
  horizontal?: string;
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
    let column = '';
    if (props.direction === direction?.column?.propValue) {
      return column + direction?.column?.class;
    }

    return column;
  }

  const getAlign = (): classes => {
    let align = '';

    if (props.vertical === vertical?.bottom?.propValue) {
      align += vertical?.bottom?.class;
    }
    else if (props.vertical === vertical?.top?.propValue) {
      align += vertical?.top?.class;
    }

    if (props.vertical === vertical?.bottom?.propValue || props.vertical === vertical?.top?.propValue) {
      align += " ";
    }

    if (props.horizontal === horizontal?.left?.propValue) {
      align += horizontal?.left?.class;
    }
    else if (props.horizontal === horizontal?.right?.class) {
      align +=  horizontal?.right?.class;
    }

    return align;
  }

  const getMultiLine = (): classes => {
    if (props.multiLine && line?.multi?.class) {
      return line.multi.class;
    }

    return "";
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
