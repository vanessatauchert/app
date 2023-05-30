import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const PokemonItem = ({ pokemon, onAddToMyPokemons }) => {
  const handleAddToMyPokemons = () => {
    onAddToMyPokemons(pokemon);
  };

  return (
    <View>
      <Text>{pokemon.name}</Text>
      <Image source={{ uri: pokemon.image }} />
      {/* Botão para adicionar o Pokémon aos salvos */}
      <TouchableOpacity onPress={handleAddToMyPokemons}>
        <Text>Adicionar aos Salvos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PokemonItem;
