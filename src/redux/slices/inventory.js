import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: true,
  error: null,
  inventory:null,
  purchaseHistory:null
};

const slice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    getResultRequest: (state, action) => {
      state.loading = true;
    },
    getResultRequestSuccess: (state, action) => {
      state.loading = false;
      state.inventory = action.payload.payload;
      state.purchaseHistory = action.payload.payload;
    },
    getResultRequestFailed: (state, action) => {
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const sentoInventory = (items) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());
    axiosInstance
      .post(`${API_LEVEL}/inventory/create-item`,{items:items})
      .then((response) => {
        // dispatch(
        //   slice.actions.setInvoiceList({
        //     payload: response.data.data,
        //   })
        // );
      })

      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};


