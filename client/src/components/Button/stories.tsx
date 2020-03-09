import { action } from '@storybook/addon-actions';
import React, { ReactElement } from 'react';
import Button from './index';
import Flex from '../Flex'

export default { title: 'Button' };

export const Primary = (): ReactElement => (
  <Flex direction="column" horizontal="left">
    <Button kind="primary" onClick={action('button-click')}>
        Primary
    </Button>

    <Button kind="primary" disabled={true} onClick={action('button-click')}>
        Primary
    </Button>
  </Flex>
);
