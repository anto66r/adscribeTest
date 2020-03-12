import React, { ReactElement } from 'react';
import Box, { Type } from './index';
import Flex, { Direction, Horizontal } from '../Flex';

export default { title: 'Button' };

export const Primary = (): ReactElement => (
  <Flex direction={Direction.column} horizontal={Horizontal.left}>
    <Box type={Type.secondary}>
      Primary
    </Box>
  </Flex>
);
