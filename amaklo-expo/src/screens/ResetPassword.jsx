import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { screenNames } from './screenNames';
import { useAppDispatch } from '../hooks/redux-hooks';
import { loginAction } from '../state/user';
import { resetPassword, sendOpt } from '../apis/auth';
import { storeUser } from '../utils';
import { AxiosError } from 'axios';
import { handleError } from '../utils/handle-error';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import * as yup from 'yup';

const ResetPasswordScreen = (props) => {
  const { route, navigation } = props;
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  console.log(route.params.username);
  const ResetPasswordValidationSchema = yup.object().shape({
    comfirmation: yup.string().required('Comfirmation field is required'),
    newPassword: yup.string().required('Password field is required'),
  });

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Image source={require('../assets/logo_new.jpg')} style={styles.logo} containerStyle={styles.logoContainer} />
      <Text style={styles.titleStyle}>New Password</Text>
      <Input leftIcon={<Ionicons name="mail" size={25}  style={{height:50}}   /> } placeholder="Enter Comfirmation code" value={route.params.username} disabled />
      <Formik
        initialValues={{ comfirmation: '', newPassword: '' }}
        validationSchema={ResetPasswordValidationSchema}
        onSubmit={(values) => {
          setLoading(true);
          resetPassword({
            new_password: values.newPassword,
            username: route.params.username,
            reset_code: values.comfirmation,
          })
            .then((res) => res && setLoading(false) )
            .then((res) => res && navigation.navigate(screenNames.Login, { from: 'reset' }) )
            .catch((error) => {
              setLoading(false);
              handleError("Wrong Crendetials");
            });
        }}
        validateOnBlur
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <Input
              leftIcon={<Ionicons name="shield-checkmark" size={25} />}
              placeholder="Enter Comfirmation code"
            
              value={values.comfirmation}
                            placeholderTextColor="#555555"
                                          style={{height:50}}           


              onChangeText={handleChange('comfirmation')}
              errorMessage={errors.comfirmation}
            />
            <Input
              leftIcon={<Ionicons name="lock-closed" size={25} />}
              placeholder="********"
                            style={{height:50}}           

              value={values.newPassword}
                            placeholderTextColor="#555555"

              onChangeText={handleChange('newPassword')}
              rightIcon={<Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={25} onPress={() => setPasswordVisible(!passwordVisible)} />}
              secureTextEntry={!passwordVisible}
              errorMessage={errors.newPassword}
            />
            <Button
              type="solid"
              color="#046d76"
              buttonStyle={{ borderRadius: 10, height:50 }}
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

export default ResetPasswordScreen;
