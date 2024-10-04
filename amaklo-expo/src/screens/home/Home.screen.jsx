import { Input } from '@rneui/base';
import React, { useState } from 'react';
import { ImageStyle, StyleSheet, Text, View, ViewStyle, Image } from 'react-native';
import { FocusAwareStatusBar } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Categories } from './Categories';
import { Business } from './Business';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = (props) => {

  const { navigation } = props;
  const [searchText, setSearchText] = useState('');
  const [selectedCategoryID, setSelectedCategoryID] = useState('');
  const insets = useSafeAreaInsets();
  return (
  <View style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#046d76" barStyle="light-content" />
      {/* HEADER COMPONENT */}
      <View style={[styles.header, { paddingTop: insets.top, zIndex: 10 }]}>
        <View style={styles.logoWrapper}>
          <Image source={require('../../assets/logo-icon.png')} style={styles.logo} />
          <Image source={require('../../assets/logo-text.png')} style={{ tintColor: '#FFFFFF', width: 80, height: 20 }} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {/* SEARCH COMPONENT */}
        <View style={{ marginTop: 50 }}>
          <Input
            leftIcon={<Ionicons name="search" size={25} />}
            placeholder="Please Search"
            onChangeText={setSearchText}
            style={{height:50}}
            value={searchText}
            inputContainerStyle={styles.searchInputContainer}
            rightIcon={<Ionicons name="close" size={25} onPress={() => setSearchText('')} />}
          />
        </View>
        {/* CATEGORIES */}
        <Categories setSelectedCategoryID={setSelectedCategoryID} selectedCategoryID={selectedCategoryID} />
        {/* SEARCH RESULT */}
        <Business categoryRef={selectedCategoryID} searchText={searchText} navigation={navigation} />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#046d76',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  logoWrapper: {
    alignItems: 'center',
    backgroundColor: '#046d76',
    padding: 15,
    borderRadius: 100,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  searchInputContainer: {
    borderBottomWidth: 0,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
