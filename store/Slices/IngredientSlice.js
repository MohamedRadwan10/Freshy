import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { 
  Ingredient: [], 
  loading: false, 
  isError: null 
};

export const getIngredient = createAsyncThunk(
  "ingredientSlice/getIngredient",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=`
      );
      return data.meals?.slice(0, 24) || []; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const IngredientSlice = createSlice({
  name: "ingredientSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getIngredient.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(getIngredient.fulfilled, (state, { payload }) => {
        state.Ingredient = payload;
        state.loading = false;
      })
      .addCase(getIngredient.rejected, (state, { payload }) => {
        state.loading = false;
        state.isError = payload; 
      });
  },
});

export default IngredientSlice.reducer;