import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Tab, TabView} from '@rneui/base';
import { FocusAwareStatusBar } from '../../components';
import  Favourite  from './Favourite';
import { MaterialIcons } from '@expo/vector-icons';

import  Settings  from './Settings';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeUser, storeUser } from '../../utils';
import { loginAction, logoutAction } from '../../state/user';
// import { launchImageLibrary } from 'react-native-image-picker';
import SignOut from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = (props) => {
  const { navigation } = props;
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const insets = useSafeAreaInsets();

  const onLogOutPress = () => {
    Alert.alert('Log out', 'Are you sure?', [
      {
        onPress: () => null,
        text: 'No',
        style: 'destructive',
      },
      {
        onPress: () => {
          removeUser().then(res => {
            if (res) {
              dispatch(logoutAction());
            }
          });
        },
        style: 'default',
        text: 'Yes',
      },
    ]);
  };

  const onCameraButtonPress = () => {
    // launchImageLibrary({
    //   mediaType: 'photo',
    // }).then(res => {
    //   let formData = new FormData();
    //   if (res.assets?.length) {
    //     formData.append('avatar', {
    //       uri: res.assets[0].uri,
    //       name: res.assets[0].fileName,
    //       type: res.assets[0].type,
    //     });
    //     setLoading(true);
    //     axios
    //       .post('http://164.92.136.51:17182/amakloapi/_v1/users/uploadavatar', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           Authorization: `Bearer ${users.userToken}`,
    //         },
    //       })
    //       .then(res => {
    //         storeUser({
    //           ...users,
    //           avatar: res.data.avatar,
    //         }).then(() => {
    //           dispatch(loginAction({ ...users, avatar: res.data.avatar }));
    //         });
    //         setLoading(false);
    //       })
    //       .catch(err => {
    //         setLoading(false);
    //       });
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#046d76" barStyle="light-content" />
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Avatar
              source={
                users.avatar
                  ? { uri: users.avatar }
                  : require('../../assets/avatar.jpeg')
              }
              size={80}
              rounded
            />
            {loading && (
              <ActivityIndicator style={{ position: 'absolute' }} size="large" />
            )}
          </View>
          <TouchableOpacity
            style={styles.cameraWrapper}
            activeOpacity={0.8}
            onPress={onCameraButtonPress}>
            <Ionicons name="camera" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginLeft: 25 }}>
          <Text style={styles.fullName}>{users.fullName}</Text>
          <Text style={{ color: '#FFF', fontSize: 13 }}>{users.email}</Text>
        </View>
        <SignOut
          name="logout"
          size={20}
          color="#FFFFFF"
          onPress={onLogOutPress}
        />
      </View>
      <Tab
        containerStyle={{ backgroundColor: '#046d76', height: 44 }}
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#FFFFFF',
          height: 3,
        }}>
        <Tab.Item
          title="Settings"
          iconRight
          icon={
            <Ionicons
              name="settings-outline"
              size={25}
              color={index === 0 ? '#FFFFFF' : '#767D80'}
            />
          }
          titleStyle={{ color: index === 0 ? '#FFFFFF' : '#767D80' }}
          containerStyle={{ backgroundColor: '#046d76' }}></Tab.Item>
        <Tab.Item
          title="Favourite"
          iconRight
          icon={
          <MaterialIcons name="favorite-border" size={24} color="white" />          }
          titleStyle={{ color: index === 1 ? '#FFFFFF' : '#767D80' }}
          containerStyle={{ backgroundColor: '#046d76' }}></Tab.Item>
      </Tab>
      <TabView
        value={index}
        onChange={() =>setIndex}
        animationType="spring"
        containerStyle={{ backgroundColor: '#fff' }}>
        <TabView.Item style={{ backgroundColor: '#FFFFFF', width: '100%' }}>
          <Settings />
        </TabView.Item>
        <TabView.Item title="Favourite" style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      
          {/* <Favourite /> */}
        </TabView.Item>
      </TabView>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#046d76',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cameraWrapper: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#046d76',
    position: 'absolute',
    marginLeft: 50,
    marginTop: 51,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  fullName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen