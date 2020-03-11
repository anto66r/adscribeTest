import { addons } from '@storybook/addons';
import adscribe from './themes/adscribe';
import sixZeroOne from './themes/605';

let theme;
console.warn(process.env.STORYBOOK_THEME)
if (process.env.STORYBOOK_THEME === 'adscribe') {
  console.warn('ADSCRIBE');
  theme = adscribe;
} else if (process.env.STORYBOOK_THEME === '605') {
  console.warn('605');
  theme = sixZeroOne;
}

addons.setConfig({
  theme,
});
