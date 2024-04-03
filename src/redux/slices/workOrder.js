import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  workOrder: [],
};

const slice = createSlice({
  name: "workOrder",
  initialState,
  reducers: {
    getWorkOrderRequest: (state, action) => {
      state.loading = true;
    },
    setWorkOrderList: (state, action) => {
      state.workOrder = action.payload.payload;
    },
    setWorkOrderRequestFailed: (state, action) => {
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getWorkOrderList = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getWorkOrderRequest());
    axiosInstance
      .get(`${API_LEVEL}/work-order/get`)
      .then((response) => {
        dispatch(
          slice.actions.setWorkOrderList({
            payload: response.data.data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};

export const saveWorkOrder = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getWorkOrderRequest());
    axiosInstance
      .post(`${API_LEVEL}/work-order/create`, data)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Work Order Added",
          })
        );
      })

      .catch((error) => {
        dispatch(
          ShowNotification({ severity: "error", message: error.message })
        );
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const updateworkOrder = (data) => async (dispatch) => {

  console.log(data)
  try {
    dispatch(slice.actions.getWorkOrderRequest());
    axiosInstance
      .put(`${API_LEVEL}/work-order/update`, data)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Bill Info Saved",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({ severity: "error", message: error.message })
        );
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const deleteWorkOrder = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.getWorkOrderRequest());
    axiosInstance
      .delete(`${API_LEVEL}/work-order/delete/${id}`)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Work Order Deleted",
          })
        );
      })

      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Work Order Deleted Failed",
          })
        );
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
