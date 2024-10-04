import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenNames } from "../screens/screenNames";
import Icon from 'react-native-vector-icons/Ionicons';
import { BlogStack, HomeStack } from "./mainstack.navigation";
import { useAppSelector } from "../hooks";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/Profile.screen";
import SearchDetail from "../screens/home/SearchDetail.screen";
import LoginScreen from "../screens/Login.screen";
import SignupScreen from "../screens/Signup.screen";
import ForgotPasswordScreen from "../screens/ForgotPassword";
import ResetPasswordScreen from "../screens/ResetPassword";
import BlogDetail from "../screens/blog/BlogDetail.screen";

const Tab = createBottomTabNavigator();

export const BottomTabsNavigation = () => {
  const { users } = useAppSelector(state => state);
  console.log("first", users)

  const Stack = createNativeStackNavigator();

  const ProfileStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          users.userToken ? (
            <Stack.Group>
              <Stack.Screen name={screenNames.ProfileScreen} component={ProfileScreen} />
              <Stack.Screen name={screenNames.ProfileBlogScreen} component={BlogDetail} />
              <Stack.Screen name={screenNames.ProfileBusinessScreen} component={SearchDetail} />
            </Stack.Group>
          ) :
            (
              <Stack.Group>
                <Stack.Screen name={screenNames.Login} component={LoginScreen} />
                <Stack.Screen name={screenNames.Signup} component={SignupScreen} />
                <Stack.Screen name={screenNames.ForgotPassword} component={ForgotPasswordScreen} />
                <Stack.Screen name={screenNames.ResetPassword} component={ResetPasswordScreen} />
              </Stack.Group>
            )
        }
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }} >
      <Tab.Screen
        name="HOME_STACK"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontWeight: 'bold',
            color:"#333333"
          },
          tabBarActiveTintColor: "#333333",
        }}
      />
      <Tab.Screen
        name="BLOG_STACK"
        component={BlogStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="newspaper" size={size} color={color} />,
          tabBarLabel: "Blog",
          tabBarLabelStyle: {
            fontWeight: 'bold',
            color:"#333333"

          },
          tabBarActiveTintColor: "#333333"
        }}
      />
      <Tab.Screen
        name={"PROFILE_STACK"}
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            fontWeight: 'bold',
            color:"#333333"

          },
          tabBarActiveTintColor: "#333333"
        }}
      />
    </Tab.Navigator>
  );
};
