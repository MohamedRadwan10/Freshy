import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { IngredientDetails: [], loading: false, isError: null };

export let getIngredientDetails = createAsyncThunk(
  "IngredientDetailsSlice/getIngredientDetails",
  async (name) => {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
    );
    return data.meals;
  }
);

let IngredientDetailseSlice = createSlice({
  name: "areaDetailsSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getIngredientDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIngredientDetails.fulfilled, (state, { payload }) => {
      state.IngredientDetails = payload;
      state.loading = false;
    });

    builder.addCase(getIngredientDetails.rejected, (state, { payload }) => {
      state.isError = payload;
      state.loading = false;
    });
  },
});

export default IngredientDetailseSlice.reducer;
