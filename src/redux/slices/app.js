import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { CloseNotification, ForceBlurFalse, ShowNotification, ToggleBlury } from "../actions";
// import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";

// ----------------------------------------------------------------------

const initialState = {
  common: {
    loading: true,
    error: null,
    blury: false,
    open:false,
    severity:null,
    message:[],
   
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {

   
  },

  extraReducers(builder) {
    builder.addCase(ShowNotification, (state,action)=>{
      state.common.open = true;
      state.common.severity = action.payload.severity;
      state.common.message = action.payload.message;
      
    }).addCase(CloseNotification,(state,action)=>{
      state.common.open = false;
      state.common.message = null;
    })
    builder.addCase(ToggleBlury, (state, action) => {
      state.common.blury = !state.common.blury;
    });
    builder.addCase(ForceBlurFalse, (state, action) => {
      state.common.blury = false
    });
  },
});

// Reducer
export default slice.reducer;


