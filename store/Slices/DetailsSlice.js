
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  meal: null,
  status: 'idle',
  error: null
};

export const fetchMealDetails = createAsyncThunk(
  'meals/fetchMealDetails',
  async (mealId) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    return response.data.meals ? response.data.meals[0] : null;
  }
);

const mealDetailsSlice = createSlice({
  name: 'mealDetails',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMealDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMealDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meal = action.payload;
      })
      .addCase(fetchMealDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default mealDetailsSlice.reducer;