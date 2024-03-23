import { createSlice, current } from "@reduxjs/toolkit";
import { ShowNotification } from "../actions";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  projectList: [],
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProjectListRequest: (state, action) => {
      state.loading = true;
    },
    setProjectList: (state, action) => {
      state.projectList = action.payload.payload;
    },
    setProjectListFailed: (state, action) => {
      state.error = action.payload.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

export const getProjectList = (sentences) => async (dispatch) => {
  try {
    dispatch(slice.actions.getProjectListRequest());
    axiosInstance
      .get(`${API_LEVEL}/project/get`)
      .then((response) => {
        dispatch(
          slice.actions.setProjectList({
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

export const saveProject = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getProjectListRequest());
    axiosInstance
      .post(`${API_LEVEL}/project/create`,data)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Project Added'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message: error.message}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const updateProject = (data) => async (dispatch) => {
  try {
    dispatch(slice.actions.getProjectListRequest());
    axiosInstance
      .put(`${API_LEVEL}/project/update`,data)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Project Edited'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message: error.message}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};
export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.getProjectListRequest());
    axiosInstance
      .delete(`${API_LEVEL}/project/delete/${id}`)
      .then((response) => {
         dispatch(ShowNotification({severity: 'success',message:'Project Deleted'}))
        
      })

      .catch((error) => {
        console.log(error);
        dispatch(ShowNotification({severity: 'error',message:'Project Deleted Failed'}))
      });


  } catch (error) {
    dispatch(ShowNotification({ severity: "error", message: error.message }));
  }
};

