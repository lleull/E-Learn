import React from "react";
import { StyleSheet, View } from "react-native";

export const Box = (props) => {
  const { containerStyle, Icon } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      {Icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 90,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    margin: 5,
  },
});
