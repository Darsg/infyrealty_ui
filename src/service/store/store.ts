import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../reducer/UserInfoReducer";
import userPermissionReducer from "../reducer/permissionSlice";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    userPermission: userPermissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
