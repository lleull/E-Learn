import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from '../screens/screenNames';
import SearchDetail from '../screens/home/SearchDetail.screen';
import SearchDetailLocation from '../screens/home/SearchDetailLocation.screen';
import ProfileScreen from '../screens/profile/Profile.screen';
import LoginScreen from '../screens/Login.screen';
import SignupScreen from '../screens/Signup.screen';
import BlogScreen from '../screens/blog/Blog.screen';
import BlogDetail from '../screens/blog/BlogDetail.screen';
import HomeScreen from '../screens/home/Home.screen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={screenNames.SearchDetail} component={SearchDetail} />
      <Stack.Screen name={screenNames.SearchDetailLocation} component={SearchDetailLocation} />
    </Stack.Navigator>
  );
};

export const BlogStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.BlogScreen} component={BlogScreen} />
      <Stack.Screen name={screenNames.BlogDetail} component={BlogDetail} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen name={screenNames.Login} component={LoginScreen} />
      <Stack.Screen name={screenNames.Signup} component={SignupScreen} />
    </Stack.Navigator>
  );
};


