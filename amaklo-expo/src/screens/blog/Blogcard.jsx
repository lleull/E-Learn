import React, { useMemo } from 'react';
import { TouchableOpacity, ImageBackground, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import LinearGradient from 'expo-linear-gradient';
import { useAppSelector } from '../../hooks';
import { Button, Chip } from '@rneui/base';

 const BlogCard = (props) => {
  const { blog, onPress } = props;
  const users = useAppSelector(state => state.users);

  const userLoved = useMemo(() => {
    return users.favorites.findIndex(fav => fav.id === blog._id) !== -1;
  }, [users]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <ImageBackground
        source={blog.cover_image ? { uri: blog.cover_image } : require('../../assets/default_image.jpg')}
        defaultSource={require('../../assets/default_image.jpg')}
        style={styles.cardImage}
        imageStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
      >
        {/* <LinearGradient colors={['#000000a9', '#00000010']} style={{ flex: 1, borderRadius: 15 }}>
          <View style={styles.header}>
            {
              userLoved && <Ionicons name="heart-circle" size={42} color="#FFFFFF" />
            }

            <View style={{ flexDirection: 'row' }}>
              {
                [...blog.tags].splice(0, 3).map((tag, index) => (
                  <View key={index}>
                    <Chip
                      title={tag}
                      type="solid"
                      titleStyle={{ color: '#000', fontSize: 11, margin: 5 }}
                      buttonStyle={{ backgroundColor: 'yellow', padding: 0 }}
                      containerStyle={{ marginHorizontal: 5 }}
                    />
                  </View>
                ))
              }
            </View>
          </View>
        </LinearGradient> */}
      </ImageBackground>

      <View style={{ alignSelf: 'flex-end', marginRight: 25, marginTop: 10, }}>
        <View style={styles.row}>
          <Icon name='institution' color={"gray"} size={12} />
          <Text style={[styles.businessName]}>{blog.business_ref.business_name}</Text>
        </View>
        <View style={styles.row}>
          <Icon name='clock-o' color={"gray"} size={16} />
          <Text style={styles.time}>{moment(blog.posted_date).format('ll')}</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 5, paddingHorizontal: 25 }}>
        <Text style={styles.title} numberOfLines={1}>
          {blog.blog_title}
        </Text>
        <Text style={styles.content} numberOfLines={2}>
          {blog.blog_content}
        </Text>
      </View>
      <View style={[styles.row, { paddingHorizontal: 25, marginTop: 5, justifyContent: 'space-between' }]}>
        {/* LIKES */}
        <View style={[styles.row, { marginRight: 20, }]}>
          <View style={styles.likeIconWrapper}>
            <Icon name='thumbs-up' size={18} color="#FFFFFF" />

            {
              blog.likes.length > 0
                ? <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 5 }}>{blog.likes.length}</Text>
                : null
            }
          </View>
        </View>

        {/* COMMENTS */}
        <View style={styles.row}>
          <View style={styles.likeIconWrapper}>
            <Icon name='comment' size={18} color="#FFFFFF" />
            {
              blog.comments.length > 0
                ? <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 5 }}>
                  {blog.comments.length}
                </Text>
                : null
            }
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );
}

export default BlogCard

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    marginVertical: 10
  },
  cardImage: {
    width: '100%',
    height: 190,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 15,
    flex: 1
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18
  },
  content: {
    color: 'gray',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: 'gray',
    marginLeft: 5,
    fontSize: 12
  },
  businessName: {
    color: 'gray',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  likeIconWrapper: {
    backgroundColor: '#046d76',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  likeText: {
    marginLeft: 5,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold'
  }
});
