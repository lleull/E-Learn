import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FocusAwareStatusBar } from '../../components';
import { screenNames } from '../screenNames';
import { paginateBlogs } from '../../apis/blogs';
import Lottie from 'lottie-react-native';
import { Tags } from './Tags';
import  BlogCard  from './Blogcard';
import { DateFilter } from './DateFilter';
import { seen } from '../../apis/commom';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '@rneui/base';
import { useApi } from '../../hooks';
import CustomButton from '../../hooks/CustomButtom';



const BlogScreen = (props) => {
  const { navigation } = props;
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const { loading, data, error, refresh, setRefresh, setData } = useApi({
    fn: () =>
      paginateBlogs(1, searchText, selectedTags, {
        startDate: date.startDate,
        endDate: date.endDate ? date.endDate : '',
      }),
    deps: [selectedTags, searchText, date],
  });
  const insets = useSafeAreaInsets();

  const fetchMore = () => {
    if (data) {
      if (data.pages > data.page) {
        paginateBlogs(data.page + 1, '', selectedTags, date).then((res) =>
          setData((prev) => {
            if (prev) {
              return {
                ...prev,
                docs: [...prev.docs, ...res.docs],
                limit: res.limit,
                page: res.page,
                pages: res.pages,
                total: res.total,
              };
            }
          }),
        );
      }
    }
  };

  const handlePresentModalPress = () => {
    setOpenDateFilter(true);
  };

  const handleBlogPress = (id) => {
    seen({ _clicked: 'blog', _ref: id }).then(() =>
      navigation.navigate(screenNames.BlogDetail, { id: id }),
    );
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#046d76" barStyle="light-content" />
      <View
        style={[
          styles.header,
          { paddingTop: insets.top, height: 80 + insets.top },
        ]}>
        <Text style={styles.title}>Blogs</Text>
        <Ionicons
          name="calendar"
          size={30}
          color="#FFFFFF"
          onPress={handlePresentModalPress}
        />
      </View>

      {/* SEARCH COMPONENT */}
      {/* <View style={[styles.searchWrapper, { paddingTop: insets.top }]}>
        <Input
          leftIcon={<Ionicons name="search" size={25} color="gray" />}
          placeholder="search blogs"
          placeholderTextColor={'gray'}
          onChangeText={setSearchText}
          value={searchText}
          inputContainerStyle={styles.searchInputContainer}
          rightIcon={
            <Ionicons
              name="close"
              size={25}
              onPress={() => setSearchText('')}
              color="gray"
            />
          }
        />
      </View> */}

      <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      {!loading && error && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: 100 }}>
            <Lottie
              source={require('../../assets/lottie/error.json')}
              autoPlay
              loop
            />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={{
                marginTop: 25,
                fontWeight: 'bold',
                fontSize: 15,
                color: '#555555',
              }}>
              Oops! Something went wrong
            </Text>
            <CustomButton title="Press here to refresh" onPress={() => {
                setRefresh(true);
              }} />
            {/* <TouchableOpacity
            >
              <Text
                style={{
                  marginTop: 25,
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: '#555555',
                }}>
                Press here to refresh
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      )}
      {!error && loading && (
        <View style={{ flex: 1, marginBottom: 100 }}>
          <Lottie
            source={require('../../assets/lottie/loading.json')}
            autoPlay
            loop
          />
        </View>
      )}
      {!loading && !error && data?.docs && (
        <FlatList
          data={data?.docs}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                setRefresh(true);
              }}
            />
          }
          renderItem={({ item, index }) => (
            <BlogCard
              blog={item}
              key={index}
              onPress={() => handleBlogPress(item._id)}
            />
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Lottie
                source={require('../../assets/lottie/empty.json')}
                autoPlay
                loop
                style={{ width: '100%', height: 250 }}
              />
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginTop: 50,
                  color: 'gray',
                }}>
                Pull down to refresh
              </Text>
            </View>
          }
          // onEndReachedThreshold={0.2}
          // onEndReached={fetchMore}
          ListFooterComponent={() => {
            if (data && data.pages > data.page) {
              return <ActivityIndicator color={'#046d76'} size={30} />;
            } else {
              return (
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'gray',
                    textAlign: 'center',
                  }}>
                  No more blogs
                </Text>
              );
            }
          }}
        />
      )}
      <DateFilter
        open={openDateFilter}
        onDismiss={() => setOpenDateFilter(false)}
        date={date}
        setDate={setDate}
      />
    </View>
  );
};

export default BlogScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  categoriesTitle: {
    color: '#046d76',
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    width: '100%',
    height: 330,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 10,
  },
  searchInputContainer: {
    borderBottomWidth: 0,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchWrapper: {
    position: 'absolute',
    width: '100%',
    marginTop: 55,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    backgroundColor: '#046d76',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
