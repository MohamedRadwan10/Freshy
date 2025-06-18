// SearchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  results: [], 
  loading: false,
  isError: null,
  query: "", 
};

export let fetchSearchResults = createAsyncThunk(
  "SearchSlice/fetchSearchResults",
  async ({ query }) => {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      return data.meals || [];
    } catch (error) {
      throw error;
    }
  }
);

let SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {
    setQuery: (state, { payload }) => {
      state.query = payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, { payload }) => {
      state.results = payload;
      state.loading = false;
    });
    builder.addCase(fetchSearchResults.rejected, (state, { error }) => {
      state.loading = false;
      state.isError = error.message;
      state.results = [];
    });
  },
});

export let { setQuery, clearResults } = SearchSlice.actions;
export default SearchSlice.reducer;
