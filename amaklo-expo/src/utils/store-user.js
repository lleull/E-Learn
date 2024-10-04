import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeUser = async (user) => {
  try {
    console.log("JsonData", user);
    const jsonUser = JSON.stringify(user);
    await AsyncStorage.setItem("@user", jsonUser);
    return user;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem("@user");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // Handle error reading value
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("@user");
    return true;
  } catch (error) {
    // Handle error
  }
};
