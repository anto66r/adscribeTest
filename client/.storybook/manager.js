import { addons } from '@storybook/addons';
import adscribe from './themes/adscribe';
import sixZeroFive from './themes/605';

let theme;
console.warn(process.env.STORYBOOK_THEME)
if (process.env.STORYBOOK_THEME === 'adscribe') {
  theme = adscribe;
} else if (process.env.STORYBOOK_THEME === '605') {
  theme = sixZeroFive;
}

addons.setConfig({
  theme,
});
