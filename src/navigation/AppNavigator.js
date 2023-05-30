// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import PokedexScreen from '../components/PokedexScreen';
// import PokemonDetailsScreen from '../components/PokemonDetailsScreen';
// import SavedPokemonScreen from '../components/SavedPokemonScreen';

// const Tab = createMaterialTopTabNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Pokedex" component={PokedexScreen} />
//         <Tab.Screen name="SavedPokemons" component={SavedPokemonScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
// Importe as dependências necessárias
import React from 'react';
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
const PokedexStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Crie o componente para o fluxo de tela da Pokedex
const PokedexFlow = () => (
  <PokedexStack.Navigator>
    <PokedexStack.Screen name="Pokedex" component={PokedexScreen} />
    {/* Outras telas relacionadas à Pokedex */}
  </PokedexStack.Navigator>
);

// Crie o componente para o fluxo de tela "Meus Pokémons"
const MyPokemonsFlow = () => (
  <PokedexStack.Navigator>
    <PokedexStack.Screen name="MyPokemons" component={MyPokemonsScreen} />
    {/* Outras telas relacionadas a "Meus Pokémons" */}
  </PokedexStack.Navigator>
);

// Crie o componente principal de navegação
const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PokedexFlow"
        component={PokedexFlow}
        options={{
          tabBarLabel: 'Pokedex',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPokemonsFlow"
        component={MyPokemonsFlow}
        options={{
          tabBarLabel: 'Meus Pokémons',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
