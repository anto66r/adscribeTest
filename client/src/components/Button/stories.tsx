import { action } from '@storybook/addon-actions';
import React, { ReactElement } from 'react';
import Button, { Kind } from './index';
import Flex, { Direction, Horizontal } from '../Flex';

export default { title: 'Button' };

export const Primary = (): ReactElement => (
  <Flex direction={Direction.column} horizontal={Horizontal.left}>
    <Button kind={Kind.primary} onClick={action('button-click')}>
      Primary
    </Button>

    <Button kind={Kind.primary} disabled onClick={action('button-click')}>
      Primary
    </Button>
  </Flex>
);
