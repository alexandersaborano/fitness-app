import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import AddMealForm from "../forms/AddMealForm";
import foodsData from "../../data/foods.json";
import { colors, spacing, fontSizes, radius } from "../../theme/theme";
import { globalStyles } from "../../theme/globalStyles";
import type { Meal, Food, FoodData } from "../../types";

type Props = {
  visible: boolean;
  meals: Meal[];
  onSelectMeal: (mealId: string) => void;
  onClose: () => void;
  onAddFood: (mealId: string, food: Food) => void;
};

export default function SelectMealModal({ visible, meals, onSelectMeal, onClose, onAddFood }: Props) {
  const [selectedMealId, setSelectedMealId] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleMealSelect = (mealId: string) => {
    setSelectedMealId(mealId);
    setShowAddForm(true);
  };

  const handleAddFood = (food: Food, quantity: number) => {
    const foodWithQuantity = { ...food, quantity };
    onAddFood(selectedMealId, foodWithQuantity);
    setShowAddForm(false);
    onClose();
  };

  if (showAddForm) {
    return (
      <Modal visible={visible} animationType="slide">
        <AddMealForm
          foodsData={foodsData as FoodData[]}
          onAddFood={handleAddFood}
          onClose={() => {
            setShowAddForm(false);
            onClose();
          }}
        />
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Selecionar Refeição</Text>
        
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.mealButton}
              onPress={() => handleMealSelect(item.id)}
            >
              <Text style={styles.mealButtonText}>{item.name}</Text>
              <Text style={styles.mealCount}>
                {item.foods.length} {item.foods.length === 1 ? 'alimento' : 'alimentos'}
              </Text>
            </TouchableOpacity>
          )}
        />
        
        <Button title="Cancelar" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mealButton: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  mealButtonText: {
    fontSize: fontSizes.normal,
    fontWeight: "bold",
    color: colors.text,
  },
  mealCount: {
    fontSize: fontSizes.small,
    color: colors.muted,
  },
});
// Modal para selecionar uma refeição e adicionar alimentos a ela