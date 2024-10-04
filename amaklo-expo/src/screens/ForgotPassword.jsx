import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { screenNames } from './screenNames';
import { useAppDispatch } from '../hooks/redux-hooks';
import { sendOpt } from '../apis/auth';
import { storeUser } from '../utils';
import { AxiosError } from 'axios';
import { handleError } from '../utils/handle-error';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import * as yup from 'yup';

const ForgotPasswordScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const forgotPasswordValidationSchema = yup.object().shape({
    username: yup
      .string()
      .email('Email address is invalid')
      .required('Email is required'),
  });

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Image source={require('../assets/logo_new.jpg')} style={styles.logo} containerStyle={styles.logoContainer} />
      <Text style={styles.titleStyle}>Reset Your Password</Text>
      <Formik
        initialValues={{ username: '' }}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={values => {
          setLoading(true);
          sendOpt(values.username)
            .then(() => setLoading(false))
            .then(() => navigation.navigate(screenNames.ResetPassword, { username: values.username }))
            .catch(error => {
              setLoading(false);
              handleError(error);
            });
        }}
        validateOnBlur
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <Input
              leftIcon={<Ionicons name='mail' size={25} />}
              placeholder="Enter you email"
                            placeholderTextColor="#555555"
              style={{height:50}}
              value={values.username}
              onChangeText={handleChange('username')}
              rightIcon={
                !errors.username ? (
                  <Ionicons name='checkmark-circle' size={25} color="green" />
                ) : (
                  <Ionicons name='warning' size={25} color="red" />
                )
              }
              errorMessage={errors.username}
            />
            <Button
              type="solid"
              color={'#046d76'}
              buttonStyle={{ borderRadius: 10 , height:50}}
              onPress={handleSubmit}
              disabled={loading}
            >
              RESET
            </Button>
          </>
        )}
      </Formik>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
  },
  logo: {
    width: 200,
    height: 250,
  },
  logoContainer: {
    alignSelf: 'center',
    marginTop: 25,
  },
  titleStyle: {
    fontSize: 22,
    color: '#046d76',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ForgotPasswordScreen;
