import React, { useState } from "react";
import { View, Text, FlatList, Button, Modal, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealCard from "../components/cards/MealCard";
import AddMealForm from "../components/forms/AddMealForm";
import MealDetailsScreen from "./MealDetailsScreen";
import SelectMealModal from "../components/modals/SelectMealModal";
import foodsData from "../data/foods.json";
import { globalStyles } from "../theme/globalStyles";
import type { Food, Meal, FoodData, NutritionStackParamList } from "../types";

const Stack = createNativeStackNavigator<NutritionStackParamList>();

// Refeições fixas iniciais
const initialMeals: Meal[] = [
  { id: "breakfast", name: "Pequeno Almoço", foods: [] },
  { id: "snack1", name: "1º Lanche", foods: [] },
  { id: "lunch", name: "Almoço", foods: [] },
  { id: "snack2", name: "2º Lanche", foods: [] },
  { id: "dinner", name: "Jantar", foods: [] },
  { id: "supper", name: "Ceia", foods: [] },
];

function NutritionHomeScreen({ navigation }: any) {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [selectMealVisible, setSelectMealVisible] = useState(false);

  const handleMealPress = (meal: Meal) => {
    navigation.navigate("MealDetails", { meal });
  };

  const handleAddFoodToMeal = (mealId: string, food: Food) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === mealId
          ? { ...meal, foods: [...meal.foods, food] }
          : meal
      )
    );
  };

  return (
    <View style={globalStyles.container}>
      
      
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealCard 
            meal={item} 
            onPress={() => handleMealPress(item)}
          />
        )}
      />
      
      <Button 
        title="Adicionar Alimento" 
        onPress={() => setSelectMealVisible(true)} 
      />

      <SelectMealModal
        visible={selectMealVisible}
        meals={meals}
        onSelectMeal={(mealId) => {
          setSelectMealVisible(false);
          navigation.navigate("AddFood", { mealId });
        }}
        onClose={() => setSelectMealVisible(false)}
        onAddFood={handleAddFoodToMeal}
      />
    </View>
  );
}

export default function Nutrition() {
  return (
    <Stack.Navigator initialRouteName="NutritionHome">
      <Stack.Screen 
        name="NutritionHome" 
        component={NutritionHomeScreen}
        options={{ title: "Nutrição" }}
      />
      <Stack.Screen 
        name="MealDetails" 
        component={MealDetailsScreen}
        options={{ title: "Detalhes da Refeição" }}
      />
    </Stack.Navigator>
  );
}
//tela principal de nutrição com navegação entre refeições e detalhes