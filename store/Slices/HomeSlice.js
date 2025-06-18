import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { Home: [], loading: false, isError: null };

export let getHome = createAsyncThunk("homeSlice/gethome", async () => {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  return response.data.meals;
});

let HomeSlice = createSlice({
  name: "movieSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getHome.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHome.fulfilled, (state, {payload}) => {
      state.Home = payload;
      state.loading = false;
    });

    builder.addCase(getHome.rejected, (state, {payload}) => {
      state.loading = false;
      state.isError =payload;
    });
  },
});

export default  HomeSlice.reducer;