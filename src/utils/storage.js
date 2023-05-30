import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar a lista de Pokémon no AsyncStorage
export const savePokemonList = async (pokemonList) => {
  try {
    await AsyncStorage.setItem('pokemonList', JSON.stringify(pokemonList));
    console.log('Lista de Pokémon salva com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar a lista de Pokémon:', error);
  }
};

// Função para recuperar a lista de Pokémon do AsyncStorage
export const getPokemonList = async () => {
  try {
    const savedPokemonList = await AsyncStorage.getItem('pokemonList');

    if (savedPokemonList) {
      return JSON.parse(savedPokemonList);
    }

    return [];
  } catch (error) {
    console.error('Erro ao recuperar a lista de Pokémon:', error);
    return [];
  }
};

// Função para adicionar um novo Pokémon à lista e salvar no AsyncStorage
export const addPokemonToList = async (pokemon) => {
  try {
    const pokemonList = await getPokemonList();
    pokemonList.push(pokemon);
    await savePokemonList(pokemonList);
    console.log('Pokémon adicionado à lista com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar o Pokémon à lista:', error);
  }
};

// Função para remover um Pokémon da lista e salvar no AsyncStorage
export const removePokemonFromList = async (pokemon) => {
  try {
    const pokemonList = await getPokemonList();
    const updatedList = pokemonList.filter((p) => p.id !== pokemon.id);
    await savePokemonList(updatedList);
    console.log('Pokémon removido da lista com sucesso!');
  } catch (error) {
    console.error('Erro ao remover o Pokémon da lista:', error);
  }
};

// Função para limpar a lista de Pokémon no AsyncStorage
export const clearPokemonList = async () => {
  try {
    await AsyncStorage.removeItem('pokemonList');
    console.log('Lista de Pokémon limpa com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar a lista de Pokémon:', error);
  }
};
