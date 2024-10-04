import { Button } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { commentBlog } from '../../apis/blogs';
import { useAppSelector } from '../../hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import { handleError } from '../../utils/handle-error';

export const SendComment = (props) => {
  const { blogID,setData, scrollbottom,setLoginModal } = props;
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);

  const users = useAppSelector(state => state.users);

  const handleSendPress = () => {
    if (users.userToken) {
      setIsSending(true);
      commentBlog(users.userToken, blogID, comment)
        .then(res => {
          setData(prev => {
            scrollbottom()
            if (prev) {
              return {
                ...prev,
                comments: res?.comments
              }
            }
          });
          setIsSending(false);
        })
        .catch(err => {
          handleError(err);
          setIsSending(false);
        });
    } else {
      setLoginModal();
    }
  };

  return (
    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#E8E8DD', paddingHorizontal: 10 }}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Write your comment...'
                        placeholderTextColor="#333333"


          style={{ paddingBottom: 10, color: "gray" , height:50}}
          onChangeText={setComment}
          value={comment}
        />
      </View>
      <Button
        title='send'
        titleStyle={{ color: '#046d76', marginLeft: 10, height:50}}
        type="clear"
        icon={<Icon name="send" size={15} color={comment === "" ? "gray" : "#046d76"} />}
        disabled={comment === "" || isSending}
        onPress={handleSendPress}
        loading={isSending}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    borderRadius: 15,
  }
});
