import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Box from '../components/box';
import Text from '../components/text';

import theme from '../utils/theme';
import {Logo} from '../components/icons';

const SplashView: () => Node = props => {
  const {colors} = theme;
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => navigation.navigate('Home'), 1200);
  }, []);

  return (
    <Box
      as={SafeAreaView}
      flex={1}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      bg={colors.black}>
      <Box
        size={200}
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Logo color={colors.red} width={200} height={150} />
      </Box>
    </Box>
  );
};
export default SplashView;
