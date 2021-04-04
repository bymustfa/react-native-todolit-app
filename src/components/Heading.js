import React from 'react';
import Text from './text';
import theme from '../utils/theme';

const Heading = ({title}) => {
  const {colors, fontSizes} = theme;
  return (
    <Text color={colors.white} fontSize={fontSizes.h1} fontWeight="bold">
      {title}
    </Text>
  );
};

export default Heading;
