import React from 'react';
import Text from './text';
import theme from '../utils/theme';
import Button from './button';
import Box from './box';

import {Check, Square, Edit} from './icons';

const ListItem = ({text, status, id}) => {
  const {colors} = theme;
  return (
    <Box p={2} flexDirection="row" justifyContent="flex-end">
      <Box
        width="100%"
        bg={colors.lightBlack}
        borderRadius={10}
        p={3}
        flexDirection="row"
        justifyContent="space-around">
        <Button
          size={24}
          borderRadius={5}
          mr={3}
          onPress={() => console.log('Status change ' + id)}>
          {status ? (
            <Check color={colors.darkPink} />
          ) : (
            <Square color={colors.pink} />
          )}
        </Button>

        <Button onPress={() => console.log('Edit ' + id)} width="90%">
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
