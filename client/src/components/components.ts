export const prefixComponents = 'ads';

export type Classes = string;

interface IOption {
  propValue: string | boolean;
  class: string;
}

export type Options = {
  column?: IOption;
  top?: IOption;
  bottom?: IOption;
  left?: IOption;
  right?: IOption;
  multi?: IOption;
}
