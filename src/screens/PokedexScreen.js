import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import axios from 'axios';
import { addPokemonToList, getPokemonList } from '../utils/storage';

const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState([]);
  const [savedPokemons, setSavedPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
    loadSavedPokemons();
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
            type: response.data.types[0].type.name,
          };
        })
      );
      setPokemons(pokemonData);
    } catch (error) {
      console.error('Erro ao buscar os Pokémon:', error);
    }
  };

  const loadSavedPokemons = async () => {
    try {
      const savedPokemonList = await getPokemonList();
      setSavedPokemons(savedPokemonList);
    } catch (error) {
      console.error('Erro ao carregar os Pokémon salvos:', error);
    }
  };

  const handleAddToMyPokemons = async (pokemon) => {
    try {
      await addPokemonToList(pokemon);
      console.log('Pokémon adicionado:', pokemon);
      loadSavedPokemons(); // Busca novamente a lista de Pokémon salvos
    } catch (error) {
      console.error('Erro ao adicionar o Pokémon:', error);
    }
  };

  const renderPokemonItem = ({ item }) => {
    const isSaved = savedPokemons.some((p) => p.id === item.id);

    // Mapear o tipo de Pokémon para a cor de fundo correspondente
    const typeColors = {
      grass: '#8ED752',
      fire: '#FF9C54',
      water: '#4A90DA',
      electric: '#FBE273',
      ice: '#9BD8D8',
      fighting: '#D56723',
      poison: '#B97FC9',
      ground: '#F7DE3F',
      flying: '#94B2C7',
      psychic: '#F366B9',
      bug: '#A3B556',
      rock: '#C5B489',
      ghost: '#6970C5',
      dark: '#5A5366',
      dragon: '#6F35FC',
      steel: '#D1D3D4',
      fairy: '#EC8FE6',
      normal: '#9DA0AA',
    };

    const cardStyle = {
      ...styles.card,
      backgroundColor: typeColors[item.type] || '#fff',
    };

    return (
      <Card style={cardStyle}>
        <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
        <Card.Content>
          <Title style={styles.cardTitle}>{item.name}</Title>
          <Button onPress={() => handleAddToMyPokemons(item)}>
            {isSaved ? 'Salvo' : 'Salvar'}
          </Button>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.listColumns}
        renderItem={renderPokemonItem}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  listColumns: {
    justifyContent: 'space-between',
  },
  card: {
    margin: 10,
    width: '48%',
    borderRadius: 10,
    elevation: 3,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
};

export default PokedexScreen;
