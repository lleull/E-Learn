import React from "react";
import { Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { FocusAwareStatusBar } from "./FocusAwareStatusbar";
import Lottie from "lottie-react-native";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../screens/screenNames";

export const AppModal = (props) => {
  const { visible, onDismiss } = props;
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={visible} onDismiss={onDismiss} transparent>
        <FocusAwareStatusBar backgroundColor={"rgba(0,0,0,0.5)"} />
        <Pressable style={styles.container} onPress={onDismiss}>
          <Pressable style={[styles.content, { height: height / 2 }]} onPress={() => null}>
            <View>
              <View style={{ flex: 1, marginTop: 50 }}>
                <Lottie source={require('../assets/lottie/fingerprint.json')} autoPlay loop />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#000' }}>You need to login first</Text>
                <Button
                  type="solid"
                  color={"#046d76"}
                  buttonStyle={{ marginHorizontal: 100, height:50 }}
                  onPress={() => {
                    onDismiss();
                    navigation.navigate('PROFILE_STACK', { screen: screenNames.Login, params: { from: "businesses" } });
                  }}>
                  Login
                </Button>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "75%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
