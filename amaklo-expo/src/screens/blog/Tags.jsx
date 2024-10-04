import { Chip } from '@rneui/base';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { allTags } from '../../apis/blogs';
import { useApi } from '../../hooks';
import { Skeleton } from "@rneui/themed";

export const Tags = (props) => {
  const { selectedTags, setSelectedTags } = props;

  const { loading, data, error, refresh, setRefresh } = useApi({ fn: () => allTags(), deps: [] });

  const onTagPress = (tag_name) => {
    setSelectedTags(prev => {
      const findTag = prev.find(item => item === tag_name);
      if (findTag) {
        const newTag = prev.filter(item => item !== tag_name);
        return [...newTag];
      }
      return [...prev, tag_name];
    });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.categoriesTitle}>Tags</Text>
      {!error && loading && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Skeleton animation="wave" style={{ width: '23%', height: 35, borderRadius: 25 }} />
          <Skeleton animation="wave" style={{ width: '23%', height: 35, borderRadius: 25 }} />
          <Skeleton animation="wave" style={{ width: '23%', height: 35, borderRadius: 25 }} />
          <Skeleton animation="wave" style={{ width: '23%', height: 35, borderRadius: 25 }} />
        </View>
      )}
      {!error && !loading && data && (
        <FlatList
          data={data}
          contentContainerStyle={{ paddingVertical: 10 }}
          horizontal
          renderItem={({ item, index }) => (
            <View key={index}>
              <Chip
                onPress={() => onTagPress(item)}
                title={item}
                type="outline"
                titleStyle={{ color: selectedTags.find(tag => tag === item) ? '#046d76' : '#9C9C9C' }}
                buttonStyle={{
                  borderColor: selectedTags.find(tag => tag === item) ? '#046d76' : '#9C9C9C'
                }}
                containerStyle={{ marginHorizontal: 5 }}
                icon={<Ionicons name="aperture-sharp" size={20} color={selectedTags.find(tag => tag === item) ? '#046d76' : '#9C9C9C'} />}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10
  },
  categoriesTitle: {
    color: '#046d76',
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
