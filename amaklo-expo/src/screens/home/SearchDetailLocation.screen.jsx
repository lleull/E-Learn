import React from "react";
import { StyleSheet, View } from "react-native";
import { FocusAwareStatusBar } from "../../components";

function SearchDetailLocation(props) {
  const { navigation } = props;

  // const onMapIconPress = () => {
  //   console.log("yes")
  // }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});

export default SearchDetailLocation;
