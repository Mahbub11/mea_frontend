import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  sellsList: [],
};

const slice = createSlice({
  name: "sells",
  initialState,
  reducers: {
    getSellsListRequest: (state, action) => {
      state.loading = true;
    },
    setSellsList: (state, action) => {
      state.sellsList = action.payload.payload;
    },
    setSellsListFailed: (state, action) => {
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getSellsList = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getSellsListRequest());
    axiosInstance
      .get(`${API_LEVEL}/sells/get`)
      .then((response) => {
        dispatch(
          slice.actions.setSellsList({
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

export const saveSells = (data) => async (dispatch) => {
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
export const updateSells = (data) => async (dispatch) => {
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
export const deleteSells = (id) => async (dispatch) => {
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

