import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  Animated,
} from 'react-native';
import Box from '../components/box';

import theme from '../utils/theme';

import bgImage from '../img/splash-bg.jpg';
import logo from '../img/Logo.png';

const SplashView: () => Node = props => {
  const {colors} = theme;
  const {navigation} = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    setTimeout(() => navigation.navigate('Home'), 1200);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(transAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, transAnim]);

  return (
    <Box
      as={SafeAreaView}
      flex={1}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      bg={colors.black}>
      <ImageBackground
        source={bgImage}
        style={{
          flex: 1,
          height: '100%',
          flexDirection: 'column',
          resizeMode: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid red',
        }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: transAnim}],
          }}>
          <Image
            style={{
              width: 120,
              height: 120,
            }}
            source={logo}
          />
        </Animated.View>
      </ImageBackground>
    </Box>
  );
};
export default SplashView;
