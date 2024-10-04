import React, { useRef, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "@rneui/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { screenNames } from "./screenNames";
import PhoneInput from "react-native-phone-number-input";
import { useApi } from "../hooks";
import { Formik } from "formik";
import * as yup from "yup";
import { register } from "../apis/auth";
import { AxiosError } from "axios";
import { handleError } from "../utils/handle-error";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../hooks";
import CustomButton from "../hooks/CustomButtom";
const SignupScreen = (props) => {
  const { navigation } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const phoneInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);

  const registerValidationSchema = yup.object().shape({
    name: yup.string().required("Fullname is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email address is required"),
    password: yup.string().required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleLoginButtonPress = () => {
    navigation.navigate(screenNames.Login);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.headerSection}>
        <Image
          source={require("../assets/logo_new.jpg")}
          style={styles.logo}
          containerStyle={styles.logoContainer}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.welcome}>WELCOME!</Text>
          <Text style={styles.join}>Join AMAKLO now</Text>
        </View>
      </View>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          comfirmPassword: "",
        }}
        onSubmit={(values) => {
          if (!phoneInput.current?.isValidNumber(values.phoneNumber)) {
            setValidPhoneNumber(false);
          } else {
            setValidPhoneNumber(true);
            setLoading(true);
            register({
              email: values.email,
              password: values.password,
              name: values.name,
              phone_number: values.phoneNumber,
            })
              .then((res) => {
                console.log("resss", res);
                setLoading(false);
                navigation.navigate(screenNames.Login, {
                  from: "Signup",
                  fullname: res.name,
                  email: res.email,
                });
              })
              .catch((err) => {
                setLoading(false);
                handleError(err);
              });
          }
        }}
        validationSchema={registerValidationSchema}
        validateOnBlur
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Input
              leftIcon={<Ionicons name="person" size={25} />}
              placeholder="Full Name"
              onChangeText={handleChange("name")}
                            style={{height:50}}           

              placeholderTextColor="#555555"

              errorMessage={errors.name}
            />
            <Input
              leftIcon={<Ionicons name="mail" size={25} />}
              placeholder="Email"
                                         style={{height:50}}           

              onChangeText={handleChange("email")}
              errorMessage={errors.email}
              placeholderTextColor="#555555"
              rightIcon={
                !errors.email ? (
                  <Ionicons name="checkmark-circle" size={25} color="green" />
                ) : (
                  <Ionicons name="warning" size={25} color="red" />
                )
              }
            />
            <View style={styles.Phonecontainer}>

            <PhoneInput
              ref={phoneInput}
              defaultCode="ET"
              style={{height:50}}           
              onChangeText={handleChange("phoneNumber")}
              flagButtonStyle={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
              }}
              textInputProps={{placeholderTextColor:"#555555"}}
              textInputStyle={styles.phoneInputTextInput}
              containerStyle={styles.phoneNumberView}
              textContainerStyle={styles.textContainerStyle}
            />
            {!phoneInput.current?.isValidNumber(values.phoneNumber) &&
              values.phoneNumber !== "" && (
                <Text
                  style={{
                    marginLeft: 20,
                    color: "red",
                    fontSize: 12,
                    marginTop: 5,
                  }}
                  >
                  Invalid Mobile Number
                </Text>
              )}
              </View>
            <Input
              leftIcon={<Ionicons name="lock-closed" size={25} />}
              placeholder="Password"
              placeholderTextColor="#555555"
              style={{height:50}}           

              rightIcon={
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={25}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              secureTextEntry={!passwordVisible}
              onChangeText={handleChange("password")}
              errorMessage={errors.password}
            />
            <Input
              leftIcon={<Ionicons name="lock-closed" size={25} />}
              placeholderTextColor="#555555"
                           style={{height:50}}           

              placeholder="Confirm password"
              rightIcon={
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={25}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              secureTextEntry={!passwordVisible}
              onChangeText={handleChange("comfirmPassword")}
              errorMessage={errors.comfirmPassword}
            />

            <Button
              type="solid"
              color="#046d76"
              buttonStyle={{ borderRadius: 10, height:50 }}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              REGISTER
            </Button>
          </>
        )}
      </Formik>
      <CustomButton onPress={handleLoginButtonPress} title="ALREADY REGISTERED? LOGIN"/>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexG: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 120,
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 20,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#046d76",
  },
  join: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#046d76",
  },
   Phonecontainer: {
    height: 60, // Set height to 50px
    // Adjust border radius as needed
  },
  phoneNumberView: {
     flex:1,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  textContainerStyle: {
   backgroundColor:"#fff",
    borderBottomWidth: 1,
    borderColor: "gray",
    flex:1
  },
    phoneInputTextInput: {
      fontSize:16,
      height:50,
           
     },
});

export default SignupScreen;
