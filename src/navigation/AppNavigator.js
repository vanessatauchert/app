import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import PokedexScreen from '../screens/PokedexScreen';
import MyPokemonsScreen from '../screens/MyPokemonsScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const navigationRef = React.useRef(null);

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
        <Tab.Screen name="Pokedex" component={PokedexStack} />
        <Tab.Screen name="MyPokemons" component={MyPokemonsScreen} listeners={() => ({
          tabPress: () => {
            resetMyPokemonsScreen();
          },
        })} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const getTabBarLabel = (route) => {
 
};

const getTabBarIcon = (route, color, size) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Pokedex') {
    iconName = 'book'; // Nome do ícone personalizado
  } else if (route.name === 'MyPokemons') {
    iconName = 'list';
  }

  // Retorna o ícone personalizado
  return <Icon name={iconName} size={size} color={color} />;
};



const PokedexStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pokedex" component={PokedexScreen} />
      <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
