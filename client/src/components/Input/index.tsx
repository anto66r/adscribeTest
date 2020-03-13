import React, { useState, FunctionComponent, ReactElement } from 'react';
import classnames from 'classnames';

import { prefixComponents, Class } from '../components';
import './styles.scss';

export const inputComponentName = 'input';

export enum Type {
  text = 'text',
}

export enum States {
  error = 'error',
}
export interface IButtonProps {
  type: Type.text;
  value?: string;
  testId?: string;
  id?: string;
  name?: string;
  required?: boolean;
  size?: number;
  list?: string;
  minlength?: number;
  placeholder?: string;
  readonly?: boolean;
  spellcheck?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  onChange?: (newValue: string) => void;
}

const Input: FunctionComponent<IButtonProps> = (props): ReactElement => {
  const { value: initValue } = props;
  const [value, setValue] = useState(initValue || '');

  // TODO: P2-134 Extract getTestId function and share as components helper
  const getTestId = (): string => {
    let testId = `${prefixComponents}-${inputComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
  };

  const getId = (): string => {
    if (props?.id) {
      return `${prefixComponents}-${inputComponentName}-${props.id}`;
    }

    return '';
  };

  // TODO: P2-135 Extract getClass function and share as components helper
  const getClass = (): Class => {
    let inputClass: Class;
    inputClass = `${prefixComponents}-${inputComponentName}`;

    if (props?.hasError) inputClass = inputClass.concat(' ', States.error);
    return inputClass;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const newValue = event?.target?.value;
    setValue(newValue);
    if (props.onChange) props.onChange(newValue);
  };

  const inputClass = getClass();
  const id = getId();
  const testId = getTestId();
  const { name, placeholder, disabled } = props;

  return (
    <input
      className={classnames(`${inputClass}`)}
      data-testid={testId}
      id={id}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default Input;
