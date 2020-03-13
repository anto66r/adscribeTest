import React, { ReactNode, FunctionComponent, ReactElement } from 'react';
import classnames from 'classnames';

import { prefixComponents, Class, Classes } from '../components';
import './styles.scss';

// TODO: P2-129 Create box secondary theme to adscribe
// TODO: P2-130 Create box component tests

export const boxComponentName = 'box-wrapper';

export enum Type {
  primary = 'primary',
  secondary = 'secondary',
}

export interface IBoxProps {
  type?: Type.primary | Type.secondary;
  testId?: string;
  children?: ReactNode;
}

const Box: FunctionComponent<IBoxProps> = (props): ReactElement => {
  const getTestId = (): string => {
    let testId = `${prefixComponents}-${boxComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
  };

  const getTypes = (): Classes => {
    const types = [];

    if (props?.type) {
      types.push(Type[props?.type]);
    }

    return types;
  };

  const getClass = (): Class => {
    const types = getTypes();
    let boxClass: Class;
    boxClass = `${prefixComponents}-${boxComponentName}`;

    if (types.length > 0) boxClass = boxClass.concat(' ', types.join(' '));

    return boxClass;
  };

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

export default Box;
