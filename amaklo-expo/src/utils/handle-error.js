const Toast = require("react-native-toast-message");

export const handleError = (error) => {
  if (error.message === "Network Error") {
    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: 'Please check your internet connection.'
    });
  } else {
    Toast.show({
      type: 'error',
      text1: 'Oops!',
      text2: error.response?.data.message
    });
    // switch (error.response?.status) {
    //   case 401:
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Oops!',
    //       text2: 'Something went wrong.please try again.'
    //     });
    //     break;
    //   case 400:
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Oops!',
    //       text2: 'Something went wrong.please try again.'
    //     });
    //     break;
    //   default:
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Oops!',
    //       text2: 'Something went wrong.please try again.'
    //     });
    //     break;
    // }
  }
};
