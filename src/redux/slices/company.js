import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  companyList: [],
};

const slice = createSlice({
  name: "company",
  initialState,
  reducers: {
    getCompanyListRequest: (state, action) => {
      state.loading = true;
    },
    setCompanyList: (state, action) => {
      state.companyList = action.payload.payload;
    },
    setCompanyListFailed: (state, action) => {
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getCompanyList = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getCompanyListRequest());
    axiosInstance
      .get(`${API_LEVEL}/company/get`)
      .then((response) => {
        dispatch(
          slice.actions.setCompanyList({
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

export const saveCompany = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getCompanyListRequest());
    axiosInstance
      .post(`${API_LEVEL}/company/create`,data)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Company Added'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message: error.message}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const updateCompany = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getCompanyListRequest());
    axiosInstance
      .put(`${API_LEVEL}/company/update`,data)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Company Edited'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message:'Company dited Failed'}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.getCompanyListRequest());
    axiosInstance
      .delete(`${API_LEVEL}/company/delete/${id}`)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Company Deleted'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message:'Company Deleted Failed'}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};

