import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { Area: [], loading: false, isError: null };

export let getArea = createAsyncThunk("areaSlice/getArea", async () => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  return data.meals;
});

let AreaSlice = createSlice({
  name: "areaSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getArea.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getArea.fulfilled, (state, { payload }) => {
      state.Area = payload;
      state.loading = false;
    });

    builder.addCase(getArea.rejected, (state, { payload }) => {
      state.loading = false;
      state.isError = payload;
    });
  },
});

export default AreaSlice.reducer;