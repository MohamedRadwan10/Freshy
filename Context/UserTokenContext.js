// Context/UserTokenContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserTokenContext = createContext();

export const UserTokenProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const data = await AsyncStorage.getItem("userData");
        if (token) setUserToken(token);
        if (data) setUserData(JSON.parse(data));
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, []);

  return (
    <UserTokenContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserTokenContext.Provider>
  );
};
