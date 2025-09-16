import { create } from "zustand";
import type { DailyMeals, Food, Meal } from "../types";

// Função para obter refeições padrão
const getDefaultMeals = (): Meal[] => [
  { id: "breakfast", name: "Pequeno Almoço", foods: [] },
  { id: "snack1", name: "1º Lanche", foods: [] },
  { id: "lunch", name: "Almoço", foods: [] },
  { id: "snack2", name: "2º Lanche", foods: [] },
  { id: "dinner", name: "Jantar", foods: [] },
  { id: "supper", name: "Ceia", foods: [] },
];

interface NutritionState {
  dailyMeals: DailyMeals;
  currentDate: string;
  setCurrentDate: (date: string) => void;
  addFood: (date: string, mealId: string, food: Food) => void;
  removeFood: (date: string, mealId: string, index: number) => void;
  updateFoodQuantity: (
    date: string,
    mealId: string,
    index: number,
    quantity: number
  ) => void;
}

export const useNutritionStore = create<NutritionState>((set) => ({
  dailyMeals: {},
  currentDate: new Date().toISOString().split("T")[0],

  setCurrentDate: (date: string) => {
    set({ currentDate: date });
  },

  addFood: (date: string, mealId: string, food: Food) => {
    set((state) => {
      // Inicializa com padrão caso não exista
      const dayMeals = state.dailyMeals[date] || getDefaultMeals();
      const updatedMeals = dayMeals.map((m) => ({ ...m }));
      const idx = updatedMeals.findIndex((m) => m.id === mealId);
      if (idx !== -1) {
        updatedMeals[idx].foods.push(food);
      }
      return { dailyMeals: { ...state.dailyMeals, [date]: updatedMeals } };
    });
  },

  removeFood: (date: string, mealId: string, index: number) => {
    set((state) => {
      const dayMeals = state.dailyMeals[date] || getDefaultMeals();
      const updatedMeals = dayMeals.map((m) => ({ ...m }));
      const idx = updatedMeals.findIndex((m) => m.id === mealId);
      if (idx !== -1) {
        updatedMeals[idx].foods.splice(index, 1);
      }
      return { dailyMeals: { ...state.dailyMeals, [date]: updatedMeals } };
    });
  },

  updateFoodQuantity: (
    date: string,
    mealId: string,
    index: number,
    quantity: number
  ) => {
    set((state) => {
      const dayMeals = state.dailyMeals[date] || getDefaultMeals();
      const updatedMeals = dayMeals.map((m) => ({ ...m }));
      const idx = updatedMeals.findIndex((m) => m.id === mealId);
      if (idx !== -1 && updatedMeals[idx].foods[index]) {
        updatedMeals[idx].foods[index].quantity = quantity;
      }
      return { dailyMeals: { ...state.dailyMeals, [date]: updatedMeals } };
    });
  },
}));
