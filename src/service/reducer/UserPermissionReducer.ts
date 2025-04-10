import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PermissionDetails {
  [key: string]: {
    value: boolean;
  };
}

interface SubModule {
  id: number;
  parent_id: number | null;
  module_id: number;
  module_name: string;
  permission_details: PermissionDetails;
  sub_modules: SubModule[];
}

interface Module {
  id: number;
  parent_id: number | null;
  module_id: number;
  module_name: string;
  permission_details: PermissionDetails;
  sub_modules: SubModule[];
}

export interface RoleForm {
  id?: number;
  roleName: string;
  modules: Module[];
}

interface UserPermissionState {
  data: RoleForm | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserPermissionState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch user permission
export const fetchUserPermission = createAsyncThunk<RoleForm, void, { rejectValue: string }>(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise<RoleForm>((resolve) => {
        setTimeout(() => {
          resolve({
            id: 1,
            roleName: "Admin",
            modules: [
              {
                id: 1,
                parent_id: null,
                module_id: 1,
                module_name: "Dashboard",
                permission_details: {
                  View: { value: true },
                },
                sub_modules: [
                  {
                    id: 3,
                    parent_id: 1,
                    module_id: 1,
                    module_name: "Project",
                    permission_details: {
                      View: { value: true },
                      Create: { value: false },
                      Update: { value: false },
                      Delete: { value: false },
                    },
                    sub_modules: [
                      {
                        id: 8,
                        parent_id: 3,
                        module_id: 1,
                        module_name: "Tower",
                        permission_details: {
                          View: { value: true },
                          Create: { value: false },
                          Update: { value: false },
                          Delete: { value: false },
                        },
                        sub_modules: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: 2,
                parent_id: null,
                module_id: 2,
                module_name: "Users",
                permission_details: {
                  View: { value: false },
                  Create: { value: false },
                },
                sub_modules: [],
              },
              {
                id: 3,
                parent_id: null,
                module_id: 3,
                module_name: "Settings",
                permission_details: {
                  View: { value: true },
                },
                sub_modules: [
                  {
                    id: 18,
                    parent_id: 3,
                    module_id: 3,
                    module_name: "Preferences",
                    permission_details: {
                      View: { value: true },
                      Edit: { value: true },
                    },
                    sub_modules: [],
                  },
                ],
              },
              {
                id: 4,
                parent_id: null,
                module_id: 4,
                module_name: "Reports",
                permission_details: {
                  View: { value: false },
                },
                sub_modules: [
                  {
                    id: 23,
                    parent_id: 4,
                    module_id: 4,
                    module_name: "Monthly Reports",
                    permission_details: {
                      View: { value: false },
                      Export: { value: false },
                    },
                    sub_modules: [
                      {
                        id: 26,
                        parent_id: 23,
                        module_id: 4,
                        module_name: "Finance",
                        permission_details: {
                          View: { value: false },
                          Print: { value: false },
                        },
                        sub_modules: [],
                      },
                    ],
                  },
                ],
              },
            ],
          });
        }, 1000);
      });
    } catch {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

// Create slice
const userPermissionSlice = createSlice({
  name: "userPermission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPermission.fulfilled, (state, action: PayloadAction<RoleForm>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load user data";
      });
  },
});

export default userPermissionSlice.reducer;
