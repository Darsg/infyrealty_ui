
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk<UserData, void, { rejectValue: string }>(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise<UserData>((resolve) => {
        setTimeout(() => {
          resolve({
            name: "BigScal Technologies Pvt Ltd.",
            email: "darsh@example.com",
            facebook_link: "https://www.facebook.com/darsh.dobariya",
            twitter_link: "https://twitter.com/darsh_dobariya",
            instagram_link: "https://www.instagram.com/darsh_dobariya",
            linkedin_link: "https://www.linkedin.com/in/darsh-dobariya",
            phone_number: "+91 1234567890",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            address1: "123 Main St, City, State, 12345",
            address2: "456 Elm St, City, State, 67890",
            region: "Katargam",
            city: "Surat",
            state: "Gujarat",
            country: "India",
            postal_code: "123456",
            gstin: "GSTIN123456"
          });
        }, 1000);
      });
    } catch {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

interface UserData {
  name: string;
  email: string;
  facebook_link: string;
  twitter_link: string;
  instagram_link: string;
  linkedin_link: string;
  phone_number: string;
  bio: string;
  address1: string;
  address2: string;
  region: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  gstin: string;
}

// State type
interface UserInfoState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserInfoState = {
  data: null,
  loading: false,
  error: null,
};

// Create slice
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserInfoState>) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load user data";
      });
  },
});

export default userInfoSlice.reducer;
