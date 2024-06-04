import { createSlice } from "@reduxjs/toolkit";
import { API_LEVEL } from "../../config";
import axiosInstance from "../../utils/axios";
import { ShowNotification } from "../actions";

// ----------------------------------------------------------------------

const initialState = {
  userInfo: null,
  loading: false,
  error: null,

};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoadRequest: (state) => {
      state.loading = true;
    },
    LoadRequestSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
   
    LoadRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:
export const getUserInfo = (data) => async (dispatch) => {
  try {
  
    dispatch(slice.actions.LoadRequest());
    axiosInstance
      .get(`${API_LEVEL}/auth/getuser`)
      .then((res) => {
        dispatch(slice.actions.LoadRequestSuccess(res.data.user));
      })

      .catch((error) => {
        dispatch(slice.actions.LoadRequestFailed(error.detail));
        // dispatch(
        //   ShowNotification({ severity: "error", message: 'Something went Wrong!' })
        // );

        console.log(error);
      });
  } catch (error) {}
};

