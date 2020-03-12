import React, { ReactNode, FunctionComponent, ReactElement } from 'react';
import classnames from 'classnames'

import { prefixComponents, Class, Classes } from '../components';
import './styles.scss';

export const boxComponentName = 'box';

export interface IBoxProps {
  testId?: string;
  children?: ReactNode;
}

const Button: FunctionComponent<IBoxProps> = (props): ReactElement => {
   const getTestId = () => {
    let testId = `${prefixComponents}-${boxComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
   }

  const getClass = (): Class => {
    return `${prefixComponents}-${boxComponentName}`;
  }

  const boxClass = getClass();
  const testId = getTestId();

  return (
    <div
      className={classnames(`${boxClass}`)}
      data-testid={testId}
    >
      {props.children}
    </div>
  );
}

export default Button;
