import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

import { Class, Classes, prefixComponents } from '../components';
import './styles.scss';

export const buttonComponentName = 'button';

export enum Kind {
  primary = 'primary',
}

export enum Type {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export enum Size {
  big = 'big',
  small = 'small',
}

export interface IButtonProps {
  kind?: Kind.primary;
  type?: Type.button | Type.reset | Type.submit;
  size?: Size.big | Size.small;
  testId?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const Button: FunctionComponent<IButtonProps> = (props): ReactElement => {
  // TODO: P2-134 Extract getTestId function and share as components helper
  const getTestId = (): string => {
    let testId = `${prefixComponents}-${buttonComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
  };

  const getKinds = (): Classes => {
    const kinds = [];

    if (props?.kind) {
      kinds.push(Kind[props?.kind]);
    }

    return kinds;
  };

  // TODO: P2-135 Extract getClass function and share as components helper
  const getClass = (): Class => {
    const types = getKinds();
    let buttonClass: Class;
    buttonClass = `${prefixComponents}-${buttonComponentName}`;

    if (types.length > 0) buttonClass = buttonClass.concat(' ', types.join(' '));

    return buttonClass;
  };

  const handleClick = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();
    if (props.onClick) props.onClick();
  };

  const buttonClass = getClass();
  const testId = getTestId();
  const { disabled, children } = props;

  return (
    <button
      className={classnames(`${buttonClass}`)}
      data-testid={testId}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
