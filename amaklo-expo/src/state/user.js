const { createSlice, PayloadAction } = require('@reduxjs/toolkit');

const initialState = {
  _id: '',
  address: '',
  avatar: '',
  email: '',
  fullName: '',
  userTitle: '',
  isVerified: false,
  organizationCode: '',
  permissionGroup: [],
  permissions: [],
  phoneNumber: '',
  realm: '',
  userCode: '',
  userName: '',
  userToken: '',
  favoriteBlogs: [],
  favoriteBusinesses: [],
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, payload) => ({
      ...state,
      ...payload.payload,
    }),
    logout: (state) => ({
      ...state,
      ...initialState,
    }),
  },
});

 export const userReducer = userSlice.reducer;
export const { login: loginAction, logout: logoutAction } = userSlice.actions;
