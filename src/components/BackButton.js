import React from 'react';
import Text from './text';
import theme from '../utils/theme';
import Button from './button';

const ActionButton = ({icon, onclick}) => {
  const {colors, fontSizes} = theme;
  return (
    <Button
      mr={2}
      size={40}
      bg={colors.lightBlack}
      borderRadius={10}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      onPress={onclick}>
      <Text color={colors.white}>{icon}</Text>
    </Button>
  );
};

export default ActionButton;
