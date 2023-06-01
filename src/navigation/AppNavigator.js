import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Importe as telas que serão navegadas
import HomeScreen from '../screens/HomeScreen';
import PokedexScreen from '../screens/PokedexScreen';
import MyPokemonsScreen from '../screens/MyPokemonsScreen';

// Crie as pilhas de navegação para cada fluxo de tela
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Crie o componente principal de navegação
const AppNavigator = () => {
  const navigationRef = useRef(null);

  const resetMyPokemonsScreen = () => {
    navigationRef.current?.reset({
      index: 0,
      routes: [{ name: 'MyPokemons' }],
    });
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: getTabBarLabel(route),
          tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Pokedex"
          component={PokedexScreen}
        />
        <Tab.Screen
          name="MyPokemons"
          component={MyPokemonsScreen}
          listeners={() => ({
            tabPress: () => {
              resetMyPokemonsScreen();
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Função auxiliar para retornar o label da aba
const getTabBarLabel = (route) => {
  // ...
};

// Função auxiliar para retornar o ícone da aba
const getTabBarIcon = (route, color, size) => {
  // ...
};

export default AppNavigator;
