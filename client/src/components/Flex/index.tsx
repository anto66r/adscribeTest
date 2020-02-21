import React, { ReactNode, FunctionComponent } from 'react';
import classnames from 'classnames';
import './styles.scss';

const prefixComponents = 'ads';
const flexComponentName = 'flex';

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

const direction: options = {
  column: {
    propValue: 'column',
    class: 'column',
  }
}

const vertical: options = {
  top: {
    propValue: 'top',
    class: 'top',
  },
  bottom: {
    propValue: 'bottom',
    class: 'bottom',
  }
}

const horizontal: options = {
  left: {
    propValue: 'left',
    class: 'left',
  },
  right: {
    propValue: 'right',
    class: 'right',
  }
}

const line: options = {
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
  children?: ReactNode;
}

const Flex: FunctionComponent<IFlexProps> = (props) => {
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

  return (
    <div
      className={classnames(`${classesName}`)}
    >
      {props.children}
    </div>
  );
}

export default Flex;
