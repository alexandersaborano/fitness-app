//Configuração da navegação principal do aplicativo de fitness
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Dashboard from "../screens/Dashboard";
import Workouts from "../screens/Workouts";
import Nutrition from "../screens/Nutrition";
import Charts from "../screens/Charts";
import ImportCsv from "../screens/ImportCsv";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Dashboard">
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Treino" component={Workouts} />
        <Tab.Screen name="Nutrição" component={Nutrition} />
        <Tab.Screen name="Gráficos" component={Charts} />
        <Tab.Screen name="Import CSV" component={ImportCsv} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

