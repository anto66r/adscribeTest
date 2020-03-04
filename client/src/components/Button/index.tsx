import React, { ReactNode, FunctionComponent, ReactElement } from 'react';
import classnames from 'classnames';

import { prefixComponents, Class, Classes, Option } from '../components';
import './styles.scss';

export const buttonComponentName = 'button';

type Options = {
  primary?: Option;
  big?: Option;
  small?: Option;
  button?: Option;
  reset?: Option;
  submit?: Option;
  name?: Option;
  formId?: Option;
  disabled?: Option;
}

export const kind: Options = {
  primary: {
    propValue: 'primary',
    class: 'primary',
  }
}

export const type: Options = {
  button: {
    propValue: 'button',
  },
  submit: {
    propValue: 'submit',
  },
  reset: {
    propValue: 'reset',
  }
}

export const size: Options = {
  big: {
    propValue: 'big',
    class: 'big',
  },
  small: {
    propValue: 'small',
    class: 'small',
  },
}

export const disabled: Option = {
  propValue: 'primary',
  class: 'primary'
}

export interface IButtonProps {
  kind?: string;
  type?: string;
  size?: string;
  testId?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const Button: FunctionComponent<IButtonProps> = (props): ReactElement => {
   const getTestId = () => {
    let testId = `${prefixComponents}-${buttonComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
  }

  const getKinds = (): Classes => {
    const kinds = [];

    if (props.kind === kind?.primary?.propValue) {
      kinds.push(kind?.primary?.class);
    }

    return kinds;
  }

  const getClass = (): Class => {
    const types = getKinds();
    let buttonClass: Class;
    buttonClass = `${prefixComponents}-${buttonComponentName}`;

    if (types.length > 0) buttonClass = buttonClass.concat(' ', types.join(' '));

    return buttonClass;
  }

  const handleClick = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();
    if(props.onClick) props.onClick()
  }

  const buttonClass = getClass();
  const testId = getTestId();
  console.log(props.disabled);

  return (
    <button
      className={classnames(`${buttonClass}`)}
      data-testid={testId}
      disabled={props.disabled ? props.disabled : false}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
