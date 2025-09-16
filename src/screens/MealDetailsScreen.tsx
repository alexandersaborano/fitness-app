import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useNutritionStore } from "../store/useNutritionStore";
import { colors, spacing, fontSizes, radius } from "../theme/theme";
import { globalStyles } from "../theme/globalStyles";
import type { Food } from "../types";

export default function MealDetailsScreen({ route }: any) {
  const { meal, date } = route.params;
  const { removeFood, updateFoodQuantity } = useNutritionStore();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [quantityText, setQuantityText] = useState("0");

  const handleRemove = (index: number) => {
    removeFood(date, meal.id, index);
  };

  const handleStartEdit = (index: number, currentQty: number) => {
    setEditIndex(index);
    setQuantityText(currentQty.toString());
  };

  const handleConfirmEdit = () => {
    if (editIndex !== null) {
      const newQty = parseInt(quantityText) || 0;
      updateFoodQuantity(date, meal.id, editIndex, newQty);
      setEditIndex(null);
    }
  };

  const renderFoodItem = ({ item, index }: { item: Food; index: number }) => (
    <View style={styles.foodItem}>
      <View style={styles.foodRow}>
        <Text style={styles.foodName}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleRemove(index)}>
          <Text style={styles.removeText}>Remover</Text>
        </TouchableOpacity>
      </View>

      {editIndex === index ? (
        <View style={styles.editRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantityText}
            onChangeText={setQuantityText}
          />
          <Button title="OK" onPress={handleConfirmEdit} />
        </View>
      ) : (
        <TouchableOpacity onPress={() => handleStartEdit(index, item.quantity)}>
          <Text style={styles.foodQuantity}>{item.quantity}g</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.foodMacros}>
        {((item.calories * item.quantity) / 100).toFixed(0)} kcal | P:{" "}
        {((item.protein * item.quantity) / 100).toFixed(1)}g | C:{" "}
        {((item.carbs * item.quantity) / 100).toFixed(1)}g | G:{" "}
        {((item.fat * item.quantity) / 100).toFixed(1)}g
      </Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{meal.name}</Text>
      <Text style={styles.dateText}>
        {new Date(date + "T00:00:00").toLocaleDateString("pt-PT")}
      </Text>

      <FlatList
        data={meal.foods}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => renderFoodItem({ item, index })}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum alimento adicionado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontSize: fontSizes.small,
    color: colors.muted,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  foodItem: {
    backgroundColor: colors.card,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  foodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodName: {
    fontSize: fontSizes.normal,
    fontWeight: "bold",
    color: colors.text,
  },
  removeText: {
    color: colors.danger,
    fontSize: fontSizes.small,
  },
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: radius.sm,
    padding: spacing.xs,
    width: 80,
    marginRight: spacing.sm,
  },
  foodQuantity: {
    fontSize: fontSizes.normal,
    color: colors.primary,
    marginVertical: spacing.xs,
  },
  foodMacros: {
    fontSize: fontSizes.small,
    color: colors.text,
  },
  emptyText: {
    fontSize: fontSizes.normal,
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.md,
  },
});
