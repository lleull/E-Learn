import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Input, Image } from "@rneui/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { screenNames } from "./screenNames";
import { useAppDispatch } from "../hooks/redux-hooks";
import { loginAction } from "../state/user";
import { login } from "../apis/auth";
import { storeUser } from "../utils";
import { AxiosError } from "axios";
import { handleError } from "../utils/handle-error";
import { useAppSelector } from "../hooks/redux-hooks";
import Toast from "react-native-toast-message";
import { Formik } from "formik";
import * as yup from "yup";
import CustomButton from "../hooks/CustomButtom";

const LoginScreen = (props) => {
  const { navigation, route } = props;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const users = useAppSelector(state => state.users);

  const handleRegisterButtonPress = () => {
    navigation.navigate(screenNames.Signup);
  };

  const loginValidationSchema = yup.object().shape({
    username: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  useEffect(() => {
    console.log("users==", users);
  }, [users]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Image
        source={require("../assets/logo_new.jpg")}
        style={styles.logo}
        containerStyle={styles.logoContainer}
      />
      <View style={{ marginBottom: 15 }}>
        {route.params &&
          route.params.from === "signup" &&
          route.params.fullname &&
          route.params.email && (
            <>
              <Text style={styles.welcomeText}>
                Welcome, {route.params.fullname}
              </Text>
              <Text style={[styles.welcomeText, { fontSize: 14 }]}>
                You are registered successfully! please login
              </Text>
            </>
          )}
        {route.params && route.params.from === "reset" && (
          <>
            <Text style={[styles.welcomeText, { fontSize: 14 }]}>
              Your password is reset successfully.
            </Text>
          </>
        )}
      </View>
      <Formik
        initialValues={{
          username:
            route.params && route.params.email ? route.params.email : "",
          password: "",
        }}
        validationSchema={loginValidationSchema}
        validateOnBlur
        onSubmit={(values) => {
          setLoading(true);
          login({ username: values.username, password: values.password })
            .then((res) => {
              console.log("res=asdf=as===============df", res);
              storeUser(res)
                .then((res) => {
                  console.log("res=asdf=asdf", res);
                  dispatch(loginAction(res));
                })
                .catch((e) => console.log("Error While Storing User Data", e));
            })
            .then(() => {
              navigation.goBack();
            })
            .catch((err) => {
              handleError(err);
            })
            .finally(() => setLoading(false));
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Input
              leftIcon={<Ionicons name="mail" size={25} />}
              placeholder="Enter you email"
              value={values.username}  
              style={{height:50}}           
              placeholderTextColor="#555555"
              onChangeText={handleChange("username")}
              errorMessage={errors.username}
              rightIcon={
                !errors.username ? (
                  <Ionicons name="checkmark-circle" size={25} color="green" />
                ) : (
                  <Ionicons name="warning" size={25} color="red" />
                )
              }
            />
            <Input
              leftIcon={<Ionicons name="lock-closed" size={25} />}
              placeholder="********"
              placeholderTextColor="#333333"
              style={{height:50}}           

              value={values.password}
              onChangeText={handleChange("password")}
              rightIcon={
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={25}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              secureTextEntry={!passwordVisible}
              errorMessage={errors.password}
            />
            <Button
              type="solid"
              color="#046d76"Input
              buttonStyle={{ borderRadius: 10 , height:50}}
              onPress={handleSubmit}
              disabled={loading}
            >
              LOG IN
            </Button>
          </>
        )}
      </Formik>

        <CustomButton onPress={handleRegisterButtonPress} title="REGISTER" loading={loading}/>
        <CustomButton onPress={() => navigation.navigate(screenNames.ForgotPassword)} title="FORGOT PASSWORD? RESET" loading={loading}/>

    
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
  },
  logo: {
    width: 200,
    height: 250,
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 25,
  },
  welcomeText: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 18,
    textAlign: "center",
  },

});

export default LoginScreen;
