import React, { ReactNode, FunctionComponent } from 'react';
import classnames from 'classnames';

import { prefixComponents, Class, Classes, IOption } from '../components';
import './styles.scss';

export const flexComponentName = 'flex';

type Options = {
  column?: IOption;
  top?: IOption;
  bottom?: IOption;
  left?: IOption;
  right?: IOption;
  multi?: IOption;
}

export const direction: Options = {
  column: {
    propValue: 'column',
    class: 'column',
  }
}

export const vertical: Options = {
  top: {
    propValue: 'top',
    class: 'top',
  },
  bottom: {
    propValue: 'bottom',
    class: 'bottom',
  }
}

export const horizontal: Options = {
  left: {
    propValue: 'left',
    class: 'left',
  },
  right: {
    propValue: 'right',
    class: 'right',
  }
}

export const line: Options = {
  multi: {
    propValue: true,
    class: 'multi',
  },
}

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

  const getDirections = (): Classes => {
    const directions = [];
    if (props.direction === direction?.column?.propValue) {
      directions.push(direction?.column?.class);
    }

    return directions;
  }

  const getAligns = (): Classes => {
    const aligns = [];

    if (props.vertical === vertical?.bottom?.propValue) {
      aligns.push(vertical?.bottom?.class);
    }
    else if (props.vertical === vertical?.top?.propValue) {
      aligns.push(vertical?.top?.class);
    }

    if (props.horizontal === horizontal?.left?.propValue) {
      aligns.push(horizontal?.left?.class);
    }
    else if (props.horizontal === horizontal?.right?.class) {
      aligns.push(horizontal?.right?.class);
    }

    return aligns;
  }

  const getMultiLines = (): Classes => {
    const multiLines = [];

    if (props.multiLine && line?.multi?.class) {
      multiLines.push(line.multi.class);
    }

    return multiLines;
   }

  const getClass = (): Class => {
    const directions = getDirections();
    const aligns = getAligns();
    const multiLines = getMultiLines();
    let flexClass: Class;
    flexClass = `${prefixComponents}-${flexComponentName}`;

    if (directions.length > 0) flexClass = flexClass.concat(' ', directions.join(' '));
    if (aligns.length > 0)  flexClass = flexClass.concat(' ', aligns.join(' '));
    if (multiLines.length > 0)  flexClass = flexClass.concat(' ', multiLines.join(' '));

    return flexClass;
  }

  const flexClass = getClass();
  const testId = getTestId();

  return (
    <div
      className={classnames(`${flexClass}`)}
      data-testid={testId}
    >
      {props.children}
    </div>
  );
}

export default Flex;
