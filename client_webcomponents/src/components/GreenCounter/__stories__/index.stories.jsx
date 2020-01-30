import React from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import GreenCounter from '..';

export const withText = () => (
  <GreenCounter
    label={text('Label', 'Counter')}
    initCounter={number('Initial value', 1)}
    onChange={action('onChange')}
  />
);

export default { title: 'Components/Green Counter', decorators: [withKnobs] };
