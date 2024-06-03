import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: true,
  error: null,
  inventory: null,
  purchaseHistory: null,
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
      state.inventory = action.payload;

      console.log( action.payload)

    },
    getResultRequestPurchaseHistorySuccess: (state, action) => {
      state.loading = false;
      state.purchaseHistory = action.payload;

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
      .post(`${API_LEVEL}/inventory/create-item`, { items: items })
      .then((response) => {
        dispatch(ShowNotification({ severity: "success", message:'Item Added' }));
      })

      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};

export const getInventory = (items) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());
    axiosInstance
      .get(`${API_LEVEL}/inventory/get`)
      .then((response) => {
        dispatch(
          slice.actions.getResultRequestSuccess(response.data.data,)
        );
      })

      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const getPurchaseList = (items) => async (dispatch) => {
  try {
    dispatch(slice.actions.getResultRequest());
    axiosInstance
      .get(`${API_LEVEL}/inventory/get-purchase`)
      .then((response) => {
        dispatch(
          slice.actions.getResultRequestPurchaseHistorySuccess
          (response.data.data)
        );
      })

      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};


