import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const menuItems = [
  { title: "Area", path: "area" },
  { title: "Ingredient", path: "ingredient" },
];

const ModelHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => setIsVisible(!isVisible);

  return (
    <View className="relative">

      <TouchableOpacity 
        onPress={toggleMenu}
        accessibilityLabel="Open menu"
        accessibilityRole="button"
      >
        <FontAwesome name="list-ul" size={28} color="#fbbf24" />
      </TouchableOpacity>


      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleMenu}
        statusBarTranslucent={true}
      >

        <Pressable 
          onPress={toggleMenu}
          className="flex-1 bg-black/20"
          testID="menu-overlay"
        >

          <View className="absolute top-24 right-6">
            <View className="bg-amber-500 rounded-lg w-48 shadow-lg">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.path}
                  onPress={() => {
                    navigation.navigate(item.path);
                    setIsVisible(false);
                  }}
                  className={`py-3 px-4 ${index !== menuItems.length - 1 ? "border-b border-amber-400" : ""}`}
                  accessibilityLabel={`Navigate to ${item.title}`}
                  accessibilityRole="button"
                >
                  <Text className="text-white text-center font-semibold text-lg">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ModelHeader;