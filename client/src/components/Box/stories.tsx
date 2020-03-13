import React, { ReactElement } from 'react';
import Box, { Type } from './index';
import Flex, { Direction, Horizontal } from '../Flex';

export default {
  title: 'Box',
};

const styles = {
  width: '300px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const Secondary = (): ReactElement => (
  <Flex direction={Direction.column} horizontal={Horizontal.left}>
    <Box type={Type.secondary}>
      <div style={styles}>
        <p>Box secondary</p>
      </div>
    </Box>
  </Flex>
);
