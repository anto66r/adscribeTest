import { action } from '@storybook/addon-actions';
import React, { ReactElement } from 'react';
import Input, {Type} from './index';
import Flex, { Direction, Horizontal } from '../Flex';

export default {
  title: 'Input',
};

export const Text = (): ReactElement => (
  <Flex direction={Direction.column} horizontal={Horizontal.left}>
    <Input id={'enabled01'} type={Type.text} onChange={action('input-change-value')} />
    <Input id={'enabled01'} type={Type.text} hasError={true} onChange={action('input-change-value')} />
    <Input id={'disabled02'} type={Type.text} disabled={true} onChange={action('input-change-value')}/>
  </Flex>
);
