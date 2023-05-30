import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import axios from 'axios';
import { addPokemonToList } from '../utils/storage';

const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const results = response.data.results;
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.front_default,
          };
        })
      );
      setPokemons(pokemonData);
    } catch (error) {
      console.error('Erro ao buscar os Pokémon:', error);
    }
  };

  const handleAddToMyPokemons = async (pokemon) => {
    try {
      await addPokemonToList(pokemon);
      console.log('Pokémon adicionado:', pokemon);
      fetchPokemons();
    } catch (error) {
      console.error('Erro ao adicionar o Pokémon:', error);
    }
  };

  const renderPokemonItem = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image }} style={styles.image} />
        <Card.Content>
          <Title style={styles.name}>{item.name}</Title>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => handleAddToMyPokemons(item)}>Salvar</Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderPokemonItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default PokedexScreen;
