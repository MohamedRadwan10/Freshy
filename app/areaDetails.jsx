import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAreaDetails } from "@/store/Slices/AreaDetailsSlice";
import {
  View,
  Alert,
} from "react-native";
import Header from "@/components/Header";
import { useRoute } from "@react-navigation/native";
import Loading from "@/components/Loading";
import Results from "@/components/Results";
import { SafeAreaView } from "react-native-safe-area-context";

const AreaDetails = () => {
  const route = useRoute();
  const { areaName } = route.params;
  let dispatch = useDispatch();

  let { AreaDetails, loading, isError } = useSelector(
    (state) => state.areaDetails
  );

  useEffect(() => {
    if (areaName) {
      dispatch(getAreaDetails(areaName));
    }
  }, [dispatch, areaName]);

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", "An error occurred while fetching data.");
    }
  }, [isError]);

  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title={areaName} isMeals={true} />
      <Results data={AreaDetails} />
    </SafeAreaView>
  );
};
export default AreaDetails;
