import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const ApiScreen = () => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      console.log('Error fetching pokemons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <View>
      <FlatList
        data={pokemons}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default ApiScreen;