import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppModal, FocusAwareStatusBar } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApi, useAppDispatch, useAppSelector } from '../../hooks';
import { blogDetail, toggleReactBlog } from '../../apis/blogs';
// import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Chip } from '@rneui/base';
import moment from 'moment';
import { CommentBottomSheet } from './CommentBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import LinearGradient from 'react-native-linear-gradient';
import { storeUser } from '../../utils';
import { loginAction } from '../../state/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

 const BlogDetail =  (props) => {
  const { navigation, route } = props;

  const users = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const {
    loading,
    data,
    error,
    setData,
    setRefresh,
  } = useApi({
    fn: () => blogDetail(route.params.id),
    deps: [],
  });
  const [loginModal, setLoginModal] = useState(false);

  const commentSheetRef = useRef(null);
  const insets = useSafeAreaInsets();

  const onHeartButtonPress = () => {
    if (users.userToken) {
      toggleReactBlog(users.userToken, route.params.id, 'favorite')
        .then((res) => {
          if (data) {
            setData((prev) => {
              if (prev) {
                return {
                  ...prev,
                  favourites: res.favourites,
                };
              }
              return;
            });
            const alreadyLoved = users.favorites.find(
              (fav) => fav.id === data._id
            );

            storeUser({
              ...users,
              favorites: alreadyLoved
                ? [...users.favorites.filter((fav) => fav.id !== data._id)]
                : [
                    ...users.favorites,
                    {
                      id: data._id,
                      title: data.blog_title,
                      _image: data.cover_image,
                      _date: new Date().toISOString().split('T')[0],
                      type: 'blog',
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
                          title: data.blog_title,
                          _image: data.cover_image,
                          _date: new Date().toISOString().split('T')[0],
                          type: 'blog',
                        },
                      ],
                })
              );
            });
          }
        })
        .catch((err) => {});
    } else {
      setLoginModal(true);
    }
  };

  const onLikePress = () => {
    if (users.userToken) {
      toggleReactBlog(users.userToken, route.params.id, 'like')
        .then((res) => {
          if (data) {
            setData((prev) => {
              if (prev) {
                return {
                  ...prev,
                  likes: res.likes,
                };
              }
              return;
            });
          }
        })
        .catch((err) => {});
    } else {
      setLoginModal(true);
    }
  };

  const onBackButtonPress = () => {
    navigation.goBack();
  };

  const handlePresentModalPress = useCallback(() => {
    commentSheetRef.current?.present();
  }, []);

  const userLiked = useMemo(() => {
    return data?.likes.findIndex((like) => like.user_id === users._id) !== -1;
  }, [data]);

  const userLoved = useMemo(() => {
    return data?.favourites.findIndex((fav) => fav.user_id === users._id) !== -1;
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
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
          <View style={{ flex: 1, paddingHorizontal: 25 }}>
            {/* TITLE BAR */}
            <View style={styles.titleBar}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <Text style={styles.titleText}>{data?.blog_title}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="institution" color={'#046d76'} size={13} />
                  <Text style={{ color: '#046d76', fontSize: 13, marginLeft: 7 }}>
                    {data?.business_ref.business_name}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 3,
                  }}
                >
                  <Icon name="clock-o" color={'gray'} size={13} />
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 11,
                      marginLeft: 7,
                      fontWeight: 'bold',
                    }}
                  >
                    {moment(data?.posted_date).format('lll')}
                  </Text>
                </View>
              </View>

              <View style={[styles.row]}>
                <Ionicons
                  name={userLoved ? 'heart' : 'heart-outline'}
                  color={userLoved ? 'red' : 'gray'}
                  size={30}
                  style={{ padding: 8 }}
                  onPress={onHeartButtonPress}
                />
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {data.favourites.length > 0 ? data.favourites.length : ''}
                </Text>
              </View>
            </View>

            {/* TAGS LIST */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {data?.tags.map((item, index) => (
                <View key={index} style={{ marginVertical: 3 }}>
                  <Chip
                    title={item}
                    type="solid"
                    titleStyle={{
                      color: '#046d76',
                      fontSize: 11,
                      margin: 3,
                      fontWeight: 'bold',
                    }}
                    buttonStyle={{
                      backgroundColor: 'yellow',
                      padding: 0,
                      borderColor: '#CDCD00',
                      borderWidth: 0.5,
                    }}
                    containerStyle={{ marginHorizontal: 5 }}
                  />
                </View>
              ))}
            </View>
            {/* DETAILS */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.detail}>{data.blog_content}</Text>

              <View style={styles.divider} />

              {/* LIKE AND COMMENT BUTTON */}
              <View style={[styles.row, { justifyContent: 'space-around' }]}>
                <View style={[styles.row]}>
                  <Button
                    title={'Like'}
                    icon={
                      <Icon
                        name="thumbs-up"
                        size={20}
                        color={userLiked ? '#046d76' : 'gray'}
                      />
                    }
                    style={{height:50}}
                    type="clear"
                    titleStyle={{
                      color: userLiked ? '#046d76' : 'gray',
                      marginLeft: 10,
                    }}
                    onPress={onLikePress}
                  />
                  <Text style={styles.likeText}>
                    {data.likes.length > 0 ? data?.likes.length : ''}
                  </Text>
                </View>
                <View style={[styles.row]}>
                  <Button
                    title="Comment"
                    icon={<Icon name="comment" size={20} />}
                    type="clear"
                    style={{height:50}}
                    titleStyle={{ color: 'gray', marginLeft: 10,  }}
                    onPress={handlePresentModalPress}
                  />
                  <Text style={styles.likeText}>
                    {data?.comments?.length > 0 ? data?.comments.length : ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        <AppModal visible={loginModal} onDismiss={() => setLoginModal(false)} />
      </ScrollView>
      {data && (
        <CommentBottomSheet
          refRBSheet={commentSheetRef}
          comments={data?.comments}
          blodID={data?._id}
          setData={setData}
          setLoginModal={() => setLoginModal(true)}
        />
      )}
    </View>
  );
};

export default BlogDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchResultBox: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  serviceCard: {
    width: '22%',
    height: 60,
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
  backButtonWrapper: {
    marginTop: 50,
    marginLeft: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  detail: {
    color: 'gray',
    fontSize: 14,
  },
  backButton: {
    marginTop: 50,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBar: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#046d76',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: 'gray',
    marginLeft: 5,
    fontSize: 12,
  },
  likeIconWrapper: {
    // backgroundColor: '#046d76',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  likeText: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomColor: '#E8E8DD',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
