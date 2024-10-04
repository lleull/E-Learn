import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { paginateBusiness } from '../../apis/business';
import { useApi, useAppSelector } from '../../hooks';
import { screenNames } from '../screenNames';
import { seen } from '../../apis/commom';

export const Business = (props) => {
  const { categoryRef, searchText, navigation } = props;

  const { loading, data, error, refresh, setRefresh, setData } = useApi({ fn: () => paginateBusiness(1, searchText, categoryRef), deps: [categoryRef, searchText] });
  const users = useAppSelector(state => state.users);

  const fetchMore = () => {
    if (data) {
      if (data.pages > data.page) {
        paginateBusiness(data.page + 1, searchText, categoryRef)
          .then(res => setData(prev => {
            if (prev) {
              return {
                ...prev,
                docs: [...prev.docs, ...res.docs],
                limit: res.limit,
                page: res.page,
                pages: res.pages,
                total: res.total
              };
            }
          }));
      }
    }
  };

  const renderIsLikedIcon = (isLiked) => {
    if (users.userToken && (isLiked !== -1)) {
      return <Ionicons name="heart-circle" size={30} color="#FFFFFF" />;
    }
  };

  const onBusinessPress = (id) => {
    seen({ _clicked: "business", _ref: id })
      .then(() => navigation.navigate(screenNames.SearchDetail, { id: id }));
  };

  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: "#046d76" }}>Businesses</Text>
      </View>
      {
        (!loading && error) &&
        <View style={{ flex: 1, }}>
          <View style={{ flex: 1, marginTop: 100 }}>
            {/* Add your error animation or UI here */}
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ marginTop: 25, fontWeight: 'bold', fontSize: 15, color: '#555555' }}>
              Oops! Something went wrong
            </Text>
                           <CustomButton title="Press here to refresh" onPress={() => {setRefresh(true);}} />

          </View>
        </View>
      }
      {
        (!error && loading) &&
        <View style={{ flex: 1 }}>
          {/* Add your loading animation or UI here */}
        </View>
      }
      {
        (!loading && !error && data) &&
        <FlatList
          data={data?.docs}
          renderItem={({ item, index }) => {
            return (
            <TouchableOpacity onPress={() => onBusinessPress(item._id)} key={index}>
              <ImageBackground
                source={item.cover_image ? { uri: item.cover_image } : require('../../assets/default_image.jpg')}
                defaultSource={require('../../assets/default_image.jpg')}
                style={styles.searchResultBox}
                imageStyle={{ borderRadius: 15 }}
              >
                {/* Add your gradient or UI overlay here */}
              </ImageBackground>
            </TouchableOpacity>
          )}}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => setRefresh(true)} />}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {/* Add your empty state UI here */}
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 50, color: 'gray' }}>
                Pull down to refresh
              </Text>
            </View>
          }
          onEndReachedThreshold={0.2}
          onEndReached={fetchMore}
          ListFooterComponent={() => {
            if (data && data.pages > data.page) {
              return <ActivityIndicator color={'#046d76'} size={30} />;
            } else {
              return (
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray', textAlign: 'center' }}>No more Business</Text>
              );
            }
          }}
        />
      }
    </View>
  );
}

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
    paddingHorizontal: 25
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
    shadowColor: "#000",
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
    paddingHorizontal: 10
  },
  searchResultBox: {
    // width: 250,
    height: 200,
    borderRadius: 15,
    margin: 5
  }
});
