import React from 'react';
import {Alert} from 'react-native';
import Text from './text';
import theme from '../utils/theme';
import Button from './button';
import Box from './box';

import {Delete} from './icons';

const Card = ({
  title,
  total,
  complete,
  colorName,
  navigation,
  id,
  deleteFn,
}) => {
  const {colors, fontSizes} = theme;
  return (
    <Box width="50%" p={2} position="relative">
      <Button
        onPress={() => navigation.navigate('Detail', {id: id, title: title})}
        bg={colors.lightBlack}
        borderRadius={25}
        border={'1px solid ' + colors.gray}
        p={22}>
        <Box
          size={46}
          bg={colors[colorName]}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          borderRadius={10}
          mb={30}>
          <Text fontSize={fontSizes.h2} color={colors.white} fontWeight="bold">
            {title.charAt(0)}
          </Text>
        </Box>
        <Text color={colors.white} fontSize={fontSizes.h2} mb={2}>
          {title}
        </Text>
        <Text color={colors.white}>
          {complete}/{total}{' '}
          <Text fontSize={fontSizes.h6} color={colors.lightGray}>
            Tamamlandı
          </Text>
        </Text>
        <Button
          position="absolute"
          bottom={2}
          right={2}
          zIndex={2}
          onPress={() =>
            Alert.alert(
              'Sil',
              'Bu liste öğesini silmek istediğinize eminmisiniz?',
              [
                {
                  text: 'İptal',
                  style: 'cancel',
                },
                {
                  text: 'Evet Sil!',
                  onPress: () => deleteFn(),
                },
              ],
            )
          }>
          <Delete width={20} color={colors.lightGray} />
        </Button>
      </Button>
    </Box>
  );
};

export default Card;
