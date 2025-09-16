import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors, spacing, fontSizes, radius } from "../../theme/theme";
import { globalStyles } from "../../theme/globalStyles";
import type { FoodData, Food } from "../../types";

type Props = {
  foodsData: FoodData[]; // Agora usa FoodData em vez de Food
  onAddFood: (food: Food, quantity: number) => void;
  onClose: () => void;
};

export default function AddMealForm({ foodsData, onAddFood, onClose }: Props) {
  const [searchText, setSearchText] = useState("");
  const [quantityText, setQuantityText] = useState("100");

  const filteredFoods = foodsData.filter((food) =>
    food.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = (foodData: FoodData) => {
    const quantity = parseInt(quantityText) || 100;
    const food: Food = { ...foodData, quantity }; // Adiciona quantity ao criar Food
    onAddFood(food, quantity);
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={[globalStyles.title, styles.title]}>Adicionar Alimento</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar alimento..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade (g)"
        value={quantityText}
        onChangeText={setQuantityText}
        keyboardType="numeric"
      />

      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.foodItem}
            onPress={() => handleAdd(item)}
          >
            <Text style={styles.foodName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nenhum alimento encontrado.</Text>}
      />

      <Button title="Fechar" onPress={onClose} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    maxHeight: "80%",
  },
  title: {
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  foodItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  foodName: {
    fontSize: fontSizes.normal,
    color: colors.text,
  },
});
// Formulário para adicionar alimentos às refeições, com busca e quantidade