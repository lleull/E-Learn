import React, { useMemo, useState } from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AppModal, FocusAwareStatusBar } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AirbnbRating } from '@rneui/themed';
import { useApi, useAppDispatch, useAppSelector } from '../../hooks';
import { businessDetail, toggleReactBusiness } from '../../apis/business';
// import Lottie from 'lottie-react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { storeUser } from '../../utils';
import { loginAction } from '../../state/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchDetail = (props) => {
  const { navigation, route } = props;
  const [loginModal, setLoginModal] = useState(false);

  const users = useAppSelector(state => state.users);
  const { loading, data, error, setData, setRefresh } = useApi({
    fn: () => businessDetail(route.params.id),
    deps: [],
  });
  const dispatch = useAppDispatch();

  const onHeartButtonPress = () => {
    if (users.userToken) {
      toggleReactBusiness(users.userToken, route.params.id, 'favorite')
        .then((res) => {
          if (data) {
            setData((prev) => {
              if (prev) {
                return {
                  ...prev,
                  favorites: res.favorites,
                };
              }
            });

            const alreadyLoved = users.favorites.find((fav) => fav.id === data._id);

            storeUser({
              ...users,
              favorites: alreadyLoved
                ? [...users.favorites.filter((fav) => fav.id !== data._id)]
                : [
                    ...users.favorites,
                    {
                      id: data._id,
                      title: data.business_name,
                      _image: data.cover_image,
                      _date: new Date().toISOString().split('T')[0],
                      type: 'business',
                    },
                  ],
            }).then(() => {
              dispatch(
                loginAction({
                  ...users,
                  favorites: alreadyLoved
                    ? [...users.favorites.filter((fav) => fav.id !== data._id)]
                    : [
                        ...users.favorites,
                        {
                          id: data._id,
                          title: data.business_name,
                          _image: data.cover_image,
                          _date: new Date().toISOString().split('T')[0],
                          type: 'business',
                        },
                      ],
                }),
              );
            });
          }
        })
        .catch((err) => {});
    } else {
      setLoginModal(true);
    }
  };

  const onRateGiven = (rate) => {
    if (users.userToken) {
      toggleReactBusiness(users.userToken, route.params.id, 'rate', rate).then((res) => {
        if (data) {
          setData((prev) => {
            if (prev) {
              return {
                ...prev,
                business_rates: res.business_rates,
                rates: res.rates,
                rate_count: res.rate_count,
              };
            }
          });
        }
      });
    } else {
      setLoginModal(true);
    }
  };

  const phoneCall = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.openURL(phoneNumber);
  };

  const openMail = (email) => {
    let mail = `mailto:${email}`;
    Linking.openURL(mail);
  };

  const openBrowser = (url) => {
    Linking.openURL(url);
  };

  const userRated = useMemo(() => {
    const userRatedObject = data?.business_rates.find((fav) => fav.user_id === users._id);
    if (userRatedObject) {
      return userRatedObject.rate;
    } else {
      return 0;
    }
  }, [data]);

  const onBackButtonPress = () => {
    navigation.goBack();
  };
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container}>
      <FocusAwareStatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={
          data?.cover_image
            ? { uri: data?.cover_image }
            : require('../../assets/default_image.jpg')
        }
        defaultSource={require('../../assets/default_image.jpg')}
        style={styles.searchResultBox}
        imageStyle={{ borderRadius: 15, paddingTop: insets.top }}
      >
        {/* <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.4)']}
          style={styles.backButtonWrapper}
        >
          <Ionicons
            name="chevron-back"
            color="#FFFFFF"
            size={35}
            onPress={onBackButtonPress}
          />
        </LinearGradient> */}
      </ImageBackground>
      {!loading && error && (
        <View style={{ flex: 1, justifyContent: 'center', marginTop: 40 }}>
          <View style={{ alignItems: 'center' }}>
            {/* <Lottie
              source={require('../../assets/lottie/error.json')}
              autoPlay
              loop
              style={{ width: '100%', height: 100 }}
            /> */}
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={{
                marginTop: 25,
                fontWeight: 'bold',
                fontSize: 15,
                color: '#555555',
              }}
            >
              Oops! Something went wrong
            </Text>
                           <CustomButton title="Press here to refresh" onPress={() => {setRefresh(true);}} />

          </View>
        </View>
      )}
      {!error && loading && (
        <View style={{ flex: 1, alignItems: 'center' }}>
          {/* <Lottie
            source={require('../../assets/lottie/loading.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          /> */}
        </View>
      )}
      {!error && !loading && data && (
        <>
          <View style={styles.businessWrapper}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: data.business_logo }}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.businessName}>{data.business_name}</Text>
              </View>
              <Text style={{ color: 'gray', fontWeight: 'bold' }}>
                {data.address}
              </Text>
            </View>

            <Ionicons
              name={
                data.favorites.findIndex((item) => item.user_id === users._id) !==
                -1
                  ? 'heart'
                  : 'heart-outline'
              }
              size={30}
              color={
                data.favorites.findIndex((item) => item.user_id === users._id) !==
                -1
                  ? 'red'
                  : 'gray'
              }
              style={{ padding: 8 }}
              onPress={onHeartButtonPress}
            />
            <Text style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}>
              {data.favorites.length > 0 ? data.favorites.length : ''}
            </Text>
          </View>

          <View style={styles.ratingWrapper}>
            <AirbnbRating
              size={20}
              defaultRating={userRated}
              ratingContainerStyle={{ alignItems: 'flex-start' }}
              showRating={false}
              onFinishRating={(rate) => onRateGiven(rate)}
              isDisabled={!users.userToken}
            />
            {data.rates && (
              <View style={styles.row}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'gray',
                    marginRight: 5,
                  }}
                >
                  {Math.round((data.rates / data.rate_count) * 10) / 10}/5
                </Text>
                <AirbnbRating
                  count={1}
                  size={20}
                  showRating={false}
                  isDisabled
                />
              </View>
            )}
          </View>
          {data.about && (
            <View
              style={{
                paddingHorizontal: 30,
                paddingBottom: 20,
              }}
            >
              <Text style={styles.detailTitle}>About</Text>
              <Text style={styles.aboutText}>{data.about}</Text>
            </View>
          )}

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 30,
              marginBottom: 15,
            }}
          />

          <View style={styles.detailWrapper}>
            <Text style={styles.detailTitle}>Detail</Text>
            <TouchableOpacity
              style={styles.row}
              onPress={() => openMail(data.email)}
            >
              <Ionicons name="mail" size={18} />
              <Text style={{ color: 'gray', marginLeft: 10, fontSize: 14 }}>
                {data.email}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => phoneCall(data.phone_number)}
            >
              <Ionicons name="call" size={18} />
              <Text
                style={{
                  color: 'gray',
                  marginLeft: 10,
                  fontSize: 14,
                  marginVertical: 10,
                }}
              >
                {data.phone_number}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => openBrowser(data.website)}
            >
              <Ionicons name="globe-outline" size={18} />
              <Text style={{ color: 'gray', marginLeft: 10, fontSize: 14 }}>
                {data.website}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 30,
              marginBottom: 15,
            }}
          />

          <Text style={styles.servicesTitle}>Services</Text>
          <View style={styles.servicesWrapper}>
            {data.business_services.map((item, index) => (
              <View key={index} style={styles.serviceCard}>
                <Image
                  source={{ uri: item.service_image }}
                  style={{ width: 35, height: 35 }}
                />
                <Text
                  style={{
                    color: '#046d76',
                    fontWeight: 'bold',
                    fontSize: 11,
                    paddingHorizontal: 3,
                  }}
                  numberOfLines={2}
                >
                  {item.service_name}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
      <AppModal
        visible={loginModal}
        onDismiss={() => setLoginModal(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  businessWrapper: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchResultBox: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  serviceCard: {
    width: '30%',
    height: 75,
    backgroundColor: '#FFF',
    margin: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  backButtonWrapper: {
    marginTop: 50,
    marginLeft: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  detailWrapper: {
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    color: 'gray',
  },
  aboutText: {
    color: 'gray',
    fontSize: 14,
  },
  businessName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 30,
  },
  servicesTitle: {
    paddingBottom: 10,
    paddingHorizontal: 30,
    fontWeight: 'bold',
    fontSize: 23,
    color: 'gray',
  },
  ratingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

export default SearchDetail;
