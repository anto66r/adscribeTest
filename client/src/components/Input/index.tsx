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
  const [value, setValue] = useState(props.value ? props.value : '');

  const getTestId = () => {
    let testId = `${prefixComponents}-${inputComponentName}`;

    if (props?.testId) {
      testId += `-${props.testId}`;
    }

    return testId;
  }

  const getId = () => {
    if (props?.id) {
      return `${prefixComponents}-${inputComponentName}-${props.id}`;
    }

    return '';
  }

  const getClass = (): Class => {
    let inputClass: Class;
    inputClass = `${prefixComponents}-${inputComponentName}`;

    if (props?.hasError) inputClass = inputClass.concat(' ', States.error);
    return inputClass;
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const newValue = event?.target?.value;
    setValue(newValue);
    if (props.onChange) props.onChange(newValue);
  }

  const inputClass = getClass();
  const id = getId();
  const testId = getTestId();

  return (
    <input
      className={classnames(`${inputClass}`)}
      data-testid={testId}
      id={id}
      name={props.name ? props.name : ''}
      disabled={ props.disabled ? props.disabled : false }
      value={value}
      onChange={handleOnChange}
    />
  );
}

export default Input;
