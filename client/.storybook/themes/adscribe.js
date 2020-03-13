import { create } from '@storybook/theming/create';

export const background = "#111618";
export const colorPrimary = "#2AB6A0";

export default create({
  base: 'dark',
  colorPrimary: colorPrimary,
  colorSecondary: colorPrimary,
  textColor: 'white',
  barTextColor: 'white',
  barSelectedColor: colorPrimary,
  barBg: background,
  inputBg: colorPrimary,
  inputBorder: colorPrimary,
  inputTextColor: 'white',
  inputBorderRadius: 0,
  appBg: background,
  appContentBg: background,
  appBorderColor: 'black',
  appBorderRadius: 0,
});
