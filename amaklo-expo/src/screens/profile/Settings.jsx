import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { Button, Divider, Input } from '@rneui/base';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Formik } from 'formik';
import { updateUser } from '../../apis/users';
import { storeUser } from '../../utils';
import { loginAction } from '../../state/user';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';
import { handleError } from '../../utils/handle-error';

const Settings = (props) => {
  const { } = props;
  const users = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <Divider />
      <Formik
        initialValues={{
          fullname: users.fullName,
          phoneNumber: users.phoneNumber,
          email: users.email,
          address: users.address,
          title: users.userTitle,
        }}
        onSubmit={values => {
          updateUser(users.userToken, users._id,
            {
              name: values.fullname,
              address: values.address,
              title: values.title,
            })
            .then(res => {
              storeUser({
                ...users,
                fullName: res.fullName,
                address: res.address,
                userTitle: res.userTitle,
              })
                .then(() => {
                  dispatch(loginAction({ ...users, fullName: res.fullName, address: res.address, userTitle: res.userTitle }));
                })
                .then(() => {
                  Toast.show({
                    type: 'success',
                    text1: 'Sucess',
                    text2: 'Profile is updated successfully!',
                  });
                });
            });
        }}
      >
        {({ handleChange, handleSubmit, values, dirty, resetForm, isSubmitting }) => (
          <>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              {/* <Picker 
                selectedValue={values.title} 
                onValueChange={handleChange("title")} 
                placeholder="Title"
                style={{flex: 1, marginTop: 10}}
              >
                <Picker.Item label="Mr" value="Mr" color="#000000"/>
                <Picker.Item label="Mrs" value="Mrs" color="#000000"/>
                <Picker.Item label="Miss" value="Miss" color="#000000"/>
                <Picker.Item label="Ms" value="Ms" color="#000000"/>
                <Picker.Item label="Dr" value="Dr" color="#000000"/>
                <Picker.Item label="Prof" value="Prof" color="#000000"/>
                <Picker.Item label="Prof Dr" value="Prof Dr" color="#000000"/>
                <Picker.Item label="Rev" value="Rev" color="#000000"/>
                <Picker.Item label="Rev Dr" value="Rev Dr" color="#000000"/>
              </Picker> */}
            </View>
            <Divider width={1} style={{ marginHorizontal: 10 }} />
            <Input
              leftIcon={<Ionicons name='person' size={25} color="rgba(0,0,0,0.75)" />}
              placeholder="Full Name"
              value={values.fullname}
              placeholderTextColor="#333333"
              onChangeText={handleChange('fullname')}
              style={{ marginTop: 20 }}
            />
            <Input
              leftIcon={<Ionicons name='call' size={25} />}
              placeholder="Phone Number"
              value={values.phoneNumber}              
              placeholderTextColor="#333333"

              disabled
            />
            <Input
              leftIcon={<Ionicons name='mail' size={25} />}
              placeholder="Email"
                            placeholderTextColor="#333333"

              value={values.email}
              disabled
            />
            <Input
              leftIcon={<EvilIcons name="location" size={24} color="black" />}
              placeholder="Address"
                            placeholderTextColor="#333333"

              value={values.address}
              onChangeText={handleChange('address')}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                color={'#046d76'}
                containerStyle={{ width: '45%', height:50 }}
                onPress={handleSubmit}
                disabled={!dirty || isSubmitting}
                loading={isSubmitting}
              >
                Save
              </Button>
              <Button
                color={'#046d76'}
                containerStyle={{ width: '45%',height:50 }}
                disabled={!dirty || isSubmitting}
                onPress={() => resetForm()}
              >
                Clear
              </Button>
            </View>
          </>
        )}
      </Formik>
      <Text style={styles.title}>Change Password</Text>

      <Formik
        initialValues={{
          current_password: '',
          updated_password: '',
        }}
        onSubmit={(values, { resetForm }) => {
          changePassword({
            token: users.userToken,
            username: users.email,
            current_password: values.current_password,
            updated_password: values.updated_password,
          })
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Sucess',
                text2: 'Password is changed successfully!',
              });
            })
            .then(() => resetForm())
            .catch((err) => {
              resetForm();
              handleError(err);
            });
        }}
      >
        {({ values, handleChange, isSubmitting, handleSubmit }) => (
          <View style={{ marginBottom: 25 }}>
            <Input
              label="Current Password"
              rightIcon={
                <Ionicons
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={25}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
              placeholder="*************"
              value={values.current_password}
              onChangeText={handleChange('current_password')}
              secureTextEntry={hidePassword}
            />
            <Input
              label="New Password"
              rightIcon={
                <Ionicons
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={25}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
              placeholder="*************"
              value={values.updated_password}
              onChangeText={handleChange('updated_password')}
              secureTextEntry={hidePassword}
            />
            <Button
              containerStyle={{ width: '50%', height:50 }}
              color="#046d76"
              disabled={!values.current_password || !values.updated_password || isSubmitting}
              loading={isSubmitting}
              onPress={handleSubmit}
            >
              Change Password
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: '#046d76',
    padding: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Settings;
