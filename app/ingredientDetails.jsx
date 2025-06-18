import React, { useEffect } from "react";
import {
  View,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {  useRoute } from "@react-navigation/native";
import { getIngredientDetails } from "@/store/Slices/IngredientDetailsSlice";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import Results from "@/components/Results";
import { SafeAreaView } from "react-native-safe-area-context";

const IngredientDetails = () => {
  const { IngredientDetails, loading, isError } = useSelector(
    (state) => state.ingredientDetails
  );
  const dispatch = useDispatch();
  const route = useRoute();

  const { ingredientName } = route.params;

  useEffect(() => {
    if (ingredientName) {
      dispatch(getIngredientDetails(ingredientName));
    }
  }, [dispatch, ingredientName]);

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", "An error occurred while fetching data.");
    }
  }, [isError]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">

      <Header title={ingredientName} isMeals={true} />
      <Results data={IngredientDetails} />
    </SafeAreaView>
  );
};
export default IngredientDetails;
