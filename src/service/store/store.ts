import { configureStore } from "@reduxjs/toolkit";
import userPermissionReducer from "../reducer/permissionSlice";

const store = configureStore({
  reducer: {
    userPermission: userPermissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
