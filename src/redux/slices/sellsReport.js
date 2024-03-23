import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  sellsReportList: [],
  billList:[]
};

const slice = createSlice({
  name: "sellsReport",
  initialState,
  reducers: {
    getSellsReportListRequest: (state, action) => {
      state.loading = true;
    },
    setSellsReportList: (state, action) => {
      state.sellsReportList = action.payload.payload;
    },
    setBilledList: (state, action) => {
      state.billList = action.payload.payload;
    },
    setSellsReportListFailed: (state, action) => {
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getSellsReportList = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getSellsReportListRequest());
    axiosInstance
      .get(`${API_LEVEL}/sells-report/get`)
      .then((response) => {
        dispatch(
          slice.actions.setSellsReportList({
            payload: response.data.data,
          })
        );
        dispatch(
          slice.actions.setBilledList({
            payload: response.data.data.filter((val)=> val.status!==4 && val.status!==2),
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

export const saveSellsReport = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getSellsReportListRequest());
    axiosInstance
      .post(`${API_LEVEL}/sells-report/create`, data)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Bill Report Added",
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
export const updateSellsReport = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getSellsReportListRequest());
    axiosInstance
      .put(`${API_LEVEL}/sells-report/update`, data)
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
export const deleteSellsReport = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.getSellsReportListRequest());
    axiosInstance
      .delete(`${API_LEVEL}/sells-report/delete/${id}`)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Sells Report Deleted",
          })
        );
      })

      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({
            severity: "error",
            message: "Sells Report Deleted Failed",
          })
        );
      });
  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
