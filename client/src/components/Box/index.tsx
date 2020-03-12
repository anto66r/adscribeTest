import React, { ReactNode, FunctionComponent, ReactElement } from 'react';
import classnames from 'classnames';

import { prefixComponents, Class } from '../components';
import './styles.scss';

export const boxComponentName = 'box';

export interface IBoxProps {
  testId?: string;
  children?: ReactNode;
}

const Button: FunctionComponent<IBoxProps> = (props): ReactElement => {
  const getTestId = (): string => {
    let testId = `${prefixComponents}-${boxComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
  };

  const getClass = (): Class => `${prefixComponents}-${boxComponentName}`;

  const boxClass = getClass();
  const testId = getTestId();
  const { children } = props;

  return (
    <div
      className={classnames(`${boxClass}`)}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Button;
