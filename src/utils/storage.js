import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para armazenar a lista de Pokémon
const STORAGE_KEY = 'SAVED_POKEMONS';

// Obtém a lista de Pokémon salvos do armazenamento local
export const getPokemonList = async () => {
  try {
    const savedPokemonsJSON = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedPokemonsJSON) {
      return JSON.parse(savedPokemonsJSON);
    }
    return [];
  } catch (error) {
    throw new Error('Erro ao obter a lista de Pokémon salvos do armazenamento.');
  }
};

// Adiciona um Pokémon à lista de salvos no armazenamento local
export const addPokemonToList = async (pokemon) => {
  try {
    const savedPokemons = await getPokemonList();
    savedPokemons.push(pokemon);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPokemons));
  } catch (error) {
    throw new Error('Erro ao adicionar o Pokémon à lista de salvos no armazenamento.');
  }
};

// Remove um Pokémon da lista de salvos no armazenamento local
export const removePokemonFromList = async (pokemon) => {
  try {
    const savedPokemons = await getPokemonList();
    const updatedPokemons = savedPokemons.filter((p) => p.id !== pokemon.id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPokemons));
  } catch (error) {
    throw new Error('Erro ao remover o Pokémon da lista de salvos no armazenamento.');
  }
};
