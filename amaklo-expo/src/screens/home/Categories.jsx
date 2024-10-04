import React from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { Box } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApi } from '../../hooks';
import { paginateCategories } from '../../apis/categories';
import { Chip } from '@rneui/base';
import { Skeleton } from '@rneui/themed';
// import Lottie from 'lottie-react-native';

export const Categories = props => {
  const { setSelectedCategoryID, selectedCategoryID } = props;
  const { loading, data, error } = useApi({ fn: () => paginateCategories(1), deps: [] });

  return (
    <View>
      {
        (!error && loading) &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Skeleton animation="wave" style={{ width: '23%', height: 35, borderRadius: 25 }} />
          <Skeleton animation="wave" style={{ width: '23%', height: 35, borderRadius: 25 }} />
          <Skeleton animation="wave" style={{ width: '23%', height: 35, borderRadius: 25 }} />
          <Skeleton animation="wave" style={{ width: '23%', height: 35, borderRadius: 25 }} />
        </View>
      }
      {
        (!error && !loading && data) &&
        <FlatList
          data={data.docs}
          horizontal
          contentContainerStyle={{ paddingVertical: 5 }}
          renderItem={({ index, item }) => (
            <View style={{ marginHorizontal: 5, paddingBottom: 10 }}>
              <Chip
                title={item.category_name}
                color="#046d76"
                titleStyle={{ color: selectedCategoryID === item._id ? '#046d76' : 'gray', }}
                buttonStyle={{ borderColor: selectedCategoryID === item._id ? '#046d76' : 'gray', borderWidth: 1 }}
                containerStyle={{ borderColor: 'red' }}
                // size="s"
                type="outline"
                onPress={() => setSelectedCategoryID(prev => {
                  if (prev === item._id) {
                    return ""
                  } else {
                    return item._id
                  }
                })}
              />
              {/* <Box key={index} Icon={<Ionicons name={'airplane'} size={30} color="#046d76" />} /> */}
              {/* <Text style={{ color: 'gray', fontWeight: 'bold' }}>{item.category_name}</Text> */}
            </View>
          )}
        />
      }
    </View>
  )
}