import React from 'react';
import Text from './text';
import theme from '../utils/theme';
import Button from './button';
import Box from './box';

import {Check, Square, Edit} from './icons';
import Input from './input';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ListItem = ({text, status, id, statusChange, ...props}) => {
  const {colors} = theme;
  return (
    <Box
      p={2}
      flexDirection="row"
      justifyContent="flex-end"
      position="relative"
      {...props}>
      <Box
        bg={colors.red}
        width={3}
        height="50%"
        position="absolute"
        right={2}
        top="40%"
        zIndex={3}
      />
      <Box
        width="100%"
        bg={colors.lightBlack}
        borderRadius={10}
        p={3}
        flexDirection="row"
        justifyContent="space-around">
        <Button size={24} borderRadius={5} mr={3} onPress={statusChange}>
          {status ? (
            <Check color={colors.darkPink} />
          ) : (
            <Square color={colors.pink} />
          )}
        </Button>

        <Button width="90%">
          <Text
            color={status ? colors.gray : colors.white}
            style={{textDecorationLine: status ? 'line-through' : 'none'}}>
            {text}
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default ListItem;
