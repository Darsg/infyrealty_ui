import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleForm } from "../../type/permission";

const initialState: RoleForm = {
  id: undefined,
  roleName: "",
  modules: [],
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPermissionData: (state, action: PayloadAction<RoleForm>) => {
      state.id = action.payload.id;
      state.roleName = action.payload.roleName;
      state.modules = action.payload.modules;
    },
    clearPermissionData: (state) => {
      state.id = undefined;
      state.roleName = "";
      state.modules = [];
    },
  },
});

export const { setPermissionData, clearPermissionData } = permissionSlice.actions;
export default permissionSlice.reducer;
