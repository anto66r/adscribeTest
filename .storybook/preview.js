import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);

configure(require.context('../src/components', true, /\.stories\.[tj]s.$/), module);
