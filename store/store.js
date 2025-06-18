import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/CategorySlice";
import CategoriesDetailsReducer from "./Slices/CategoryDetailsSlice";
import mealDetailsReducer from "./Slices/DetailsSlice";
import HomeReducer from "./Slices/HomeSlice";
import SearchReducer from "./Slices/SearchSlice";
import IngredientReducer from "./Slices/IngredientSlice";
import IngredientDetailsReducer from "./Slices/IngredientDetailsSlice";
import AreaReducer from "./Slices/AreaSlice";
import AreaDetailsReducer from "./Slices/AreaDetailsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    categoriesDetails: CategoriesDetailsReducer,
    mealDetails: mealDetailsReducer,
    home: HomeReducer,
    search: SearchReducer,
    ingredient: IngredientReducer,
    ingredientDetails: IngredientDetailsReducer,
    area: AreaReducer,
    areaDetails: AreaDetailsReducer,
  },
});
