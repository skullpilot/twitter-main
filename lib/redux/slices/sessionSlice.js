import {
  createAsyncThunk,
  createSelector,
  createSlice
} from "@reduxjs/toolkit";

import axios from "axios";
import { API_ENDPOINT } from "../../../config";

export const createSession = createAsyncThunk(
  "session/createSession",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_ENDPOINT}/session`, user);
      return data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    token:
      typeof window !== "undefined" && localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null,
    logging: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [createSession.pending]: (state) => {
      delete state.error;
      state.logging = true;
    },
    [createSession.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.logging = false;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    [createSession.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.logging = false;
    }
  }
});

export const selectSession = createSelector(
  (state) => ({
    token: state.session.token,
    logging: state.session.logging,
    error: state.session.error
  }),
  (state) => state
);

export default sessionSlice.reducer;
