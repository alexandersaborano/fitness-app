import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors, spacing, fontSizes, radius } from "../theme/theme";
import { globalStyles } from "../theme/globalStyles";
import type { Food } from "../types";

type Props = {
  route: {
    params: {
      meal: {
        id: string;
        name: string;
        foods: Food[];
      };
    };
  };
};

export default function MealDetailsScreen({ route }: Props) {
  const { meal } = route.params;

  const totalCalories = meal.foods.reduce((sum, f) => sum + (f.calories * f.quantity) / 100, 0).toFixed(0);
  const totalProtein = meal.foods.reduce((sum, f) => sum + (f.protein * f.quantity) / 100, 0).toFixed(1);
  const totalCarbs = meal.foods.reduce((sum, f) => sum + (f.carbs * f.quantity) / 100, 0).toFixed(1);
  const totalFat = meal.foods.reduce((sum, f) => sum + (f.fat * f.quantity) / 100, 0).toFixed(1);

  const renderFoodItem = ({ item }: { item: Food }) => (
    <View style={styles.foodItem}>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodQuantity}>{item.quantity}g</Text>
      <Text style={styles.foodMacros}>
        {((item.calories * item.quantity) / 100).toFixed(0)} kcal | 
        P: {((item.protein * item.quantity) / 100).toFixed(1)}g | 
        C: {((item.carbs * item.quantity) / 100).toFixed(1)}g | 
        G: {((item.fat * item.quantity) / 100).toFixed(1)}g
      </Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{meal.name}</Text>
      
      <View style={styles.totalsCard}>
        <Text style={styles.totalsTitle}>Totais</Text>
        <Text style={styles.totalsText}>
          Calorias: {totalCalories} kcal | Proteína: {totalProtein}g | 
          Carbs: {totalCarbs}g | Gordura: {totalFat}g
        </Text>
      </View>

      <Text style={styles.foodsTitle}>Alimentos:</Text>
      <FlatList
        data={meal.foods}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderFoodItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum alimento adicionado ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  totalsCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  totalsTitle: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  totalsText: {
    fontSize: fontSizes.normal,
    color: colors.text,
  },
  foodsTitle: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  foodItem: {
    backgroundColor: colors.card,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  foodName: {
    fontSize: fontSizes.normal,
    fontWeight: "bold",
    color: colors.text,
  },
  foodQuantity: {
    fontSize: fontSizes.small,
    color: colors.muted,
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
// Tela de detalhes da refeição, mostrando alimentos e totais nutricionais