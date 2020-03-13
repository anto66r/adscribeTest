import { create } from '@storybook/theming/create';

export const background = "#fafafa";
export const colorPrimary = "#b86ef4";

export default create({
  base: 'light',
  colorPrimary: colorPrimary,
  colorSecondary: colorPrimary,
  appBg: "white",
  appContentBg: background,
  appBorderRadius: 4,
});
