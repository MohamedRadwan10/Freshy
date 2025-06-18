import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { AreaDetails: [], loading: false, isError: null };

export let getAreaDetails = createAsyncThunk(
  "areaDetailsSlice/getAreaDetails",
  async (name) => {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
    );
    return data.meals;
  }
);

let AreaDetailseSlice = createSlice({
  name: "areaDetailsSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAreaDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAreaDetails.fulfilled, (state, { payload }) => {
      state.AreaDetails = payload;
      state.loading = false;
    });

    builder.addCase(getAreaDetails.rejected, (state, { payload }) => {
      state.isError = payload;
      state.loading = false;
    });
  },
});
export default AreaDetailseSlice.reducer;
