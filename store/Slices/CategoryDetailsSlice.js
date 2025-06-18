import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { 
  CategoriesDetails: [], 
  loading: false, 
  isError: null 
};

export const getCategoriesDetails = createAsyncThunk(
  "categoriesDetailsSlice/getcategoriesDetails",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
      );
      return data.meals;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CategoriesDetailsSlice = createSlice({
  name: "categoriesDetailsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesDetails.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(getCategoriesDetails.fulfilled, (state, action) => {
        state.CategoriesDetails = action.payload;
        state.loading = false;
      })
      .addCase(getCategoriesDetails.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload || action.error.message;
      });
  },
});

export default CategoriesDetailsSlice.reducer;