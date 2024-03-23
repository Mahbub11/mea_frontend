import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  invoiceList: [],
};

const slice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getInvoiceListRequest: (state, action) => {
      state.loading = true;
    },
    setInvoiceList: (state, action) => {
      state.invoiceList = action.payload.payload;
    },
    setInvoiceListFailed: (state, action) => {
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getInvoiceList = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getInvoiceListRequest());
    axiosInstance
      .get(`${API_LEVEL}/invoice/get`)
      .then((response) => {
        dispatch(
          slice.actions.setInvoiceList({
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

export const saveInvoice = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getSellsListRequest());
    axiosInstance
      .post(`${API_LEVEL}/sells/create`,data)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Sells Added'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message: error.message}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const updateInvoice = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getSellsListRequest());
    axiosInstance
      .put(`${API_LEVEL}/sells/update`,data)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Sells Edited'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message: error.message}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const deleteInvoice = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.getSellsListRequest());
    axiosInstance
      .delete(`${API_LEVEL}/sells/delete/${id}`)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Sells Deleted'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message:'Sells Deleted Failed'}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};

