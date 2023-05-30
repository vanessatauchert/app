import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { getPokemonList, removePokemonFromList } from '../utils/storage';

const MyPokemonsScreen = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const savedList = await getPokemonList();
      setPokemonList(savedList);
    } catch (error) {
      console.error('Erro ao obter a lista de Pokémon salvos:', error);
    }
  };

  const handleRemovePokemon = async (pokemon) => {
    try {
      await removePokemonFromList(pokemon);
      fetchPokemonList(); // Atualiza a lista após a remoção do Pokémon
      console.log('Pokémon removido da lista:', pokemon);
    } catch (error) {
      console.error('Erro ao remover o Pokémon da lista:', error);
    }
  };

  const handleReload = () => {
    fetchPokemonList(); // Recarrega a lista de Pokémon
  };

  const renderPokemonItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <TouchableOpacity onPress={() => handleRemovePokemon(item)}>
          <Text>Remover</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={handleReload}>
        <Text>Atualizar Lista</Text>
      </TouchableOpacity>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemonItem}
      />
    </View>
  );
};

export default MyPokemonsScreen;
