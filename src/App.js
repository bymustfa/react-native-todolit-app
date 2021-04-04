import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeView from './views/home';
import DetailView from './views/detail';
import NewList from './views/newList';

import theme from './utils/theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.black}
        // hidden={true}
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Detail" component={DetailView} />
        <Stack.Screen name="NewList" component={NewList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
