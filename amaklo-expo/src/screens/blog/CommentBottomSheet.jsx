import React, { useMemo, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from '@rneui/base';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetFlatList
} from '@gorhom/bottom-sheet';
import { SendComment } from './SendComment';
import moment from 'moment';

export const CommentBottomSheet = (props) => {
  const { refRBSheet, comments, blodID, setData, setLoginModal } = props;
  const snapPoints = useMemo(() => ['50%', '75%'], []);
  
    // Scroll to the bottom when comments change
   const scrollbottom =  () =>{
     if (refRBSheet.current) {
      refRBSheet.current.scrollToEnd({ animated: true });
    }
   }
  
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={refRBSheet}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={BottomSheetBackdrop}
          enablePanDownToClose={true}
         
        >
          {/* COMMENTS */}
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Text style={styles.commentText}>{comments?.length > 0 ? comments?.length : ''} Comments</Text>
            {
              (comments && comments?.length > 0) &&
              <BottomSheetFlatList
                data={comments}
                renderItem={({ item, index }) => (
                  <>
                    <View key={index} style={{ flex: 1, flexDirection: 'row'}}>
                      {
                        item.user_avatar 
                        ? 
                        <Avatar
                          size={35}
                          rounded
                          title={item.user_name[0].toUpperCase()}
                          containerStyle={{ backgroundColor: '#00a7f7' }}
                          source={{uri: item.user_avatar}}
                        />
                        :
                        <Avatar
                          size={35}
                          rounded
                          title={item.user_name[0].toUpperCase()}
                          containerStyle={{ backgroundColor: '#00a7f7' }}
                        />
                      }
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'gray'}}>{item.user_name}</Text>
                        <Text style={{ color: 'gray' }}>
                          {item.comment}
                        </Text>
                        <Text style={{ color: 'gray', textAlign: "right"}}>
                          {moment(item.comment_at).fromNow()}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.divider} />
                  </>
                )}
              />
            }
          </View>
            <SendComment blogID={blodID} scrollbottom={scrollbottom} setData={setData} setLoginModal={setLoginModal}/>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 20
  },
  divider: {
    borderBottomColor: '#E8E8DD',
    borderBottomWidth: 1,
    marginVertical: 10
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  commentText: {
    textAlign: 'center',
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10
  }
});
