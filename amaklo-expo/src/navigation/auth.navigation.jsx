import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from '../screens/screenNames';
import LoginScreen from '../screens/Login.screen';
import SignupScreen from '../screens/Signup.screen';

const Stack = createNativeStackNavigator();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.Login} component={LoginScreen} />
      <Stack.Screen name={screenNames.Signup} component={SignupScreen} />
    </Stack.Navigator>
  );
};
