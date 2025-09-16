// Tipos existentes
export type FoodData = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Food = FoodData & {
  quantity: number;
};

export type Meal = {
  id: string;
  name: string;
  foods: Food[];
};

// Tipos para navegação
export type NutritionStackParamList = {
  NutritionHome: undefined;
  MealDetails: { meal: Meal };
  AddFood: { mealId: string };
};
