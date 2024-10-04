import { Button } from '@rneui/base';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
// import Calendar from "react-native-calendar-range-picker";

export const DateFilter = (props) => {
  const { open, onDismiss, date, setDate } = props;

  const dismissModal = () => {
    setDate({ startDate: "", endDate: "" })
    onDismiss();
  }

  return (
    <Modal
      visible={open}
      onDismiss={onDismiss}
      transparent
      style={{ flex: 1 }}
    >
      <Pressable
        style={styles.container}
        onPress={onDismiss}>

        <Pressable style={styles.content}
          onPress={() => null}
        >
          <Pressable
            style={styles.closeButton}
            onPress={onDismiss}>
            <Text style={{ color: "gray", fontWeight: "bold", fontSize: 18, padding: 5 }}>Close</Text>
          </Pressable>
          {/* <Calendar
            onChange={date => setDate(date)}
            startDate={date.startDate}
            endDate={date.endDate}
          /> */}
          <View style={styles.bottomButtonsWrapper}>
            <Button
              color="#046d76"
              containerStyle={{ width: "40%", borderRadius: 10, height:50 }}
              disabled={date.startDate === "" && date.endDate === ""}
              onPress={onDismiss}
            >
              Ok
            </Button>
            <Button
              color="#046d76"
              containerStyle={{ width: "40%", borderRadius: 10, height:50 }}
              disabled={date.startDate === "" && date.endDate === ""}
              onPress={dismissModal}
            >
              Clear
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  closeButton: {
    backgroundColor: "#fff",
    alignItems: "flex-end",
    paddingRight: 20,
    width: 150,
    height: 40,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  bottomButtonsWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: "100%",
    justifyContent: 'space-around'
  },
  content: {
    backgroundColor: "#FFF",
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 20,
    paddingBottom: 30
  }
});
