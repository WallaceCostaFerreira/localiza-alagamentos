import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from 'react-native';
import theme from './src/constants/theme'

const Stack = createStackNavigator()

import Principal from './src/screens/Principal';
import Historico from './src/screens/Historico';
import StatisticHistorico from './src/screens/ScreamHistorico/StatisticHistorico';



export default function App() {
  return (
    <>
    <StatusBar
      barStyle = "dark-content"
      hidden = {false}
      backgroundColor = {theme.colors.secondary}
      translucent = {false}
      networkActivityIndicatorVisible = {true}
    />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen 
          name="Principal"
          component={Principal}
          options={{ headerShown:false, }}
        />
        <Stack.Screen 
          name="ScreamHistorico"
          component={StatisticHistorico}
          options={{ headerShown:false, }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
  );
}
