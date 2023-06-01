import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import axios from 'axios';
import Color from 'color';

import {
  addPokemonToList,
  removePokemonFromList,
  getPokemonList,
} from '../utils/storage.js';

const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState([]);
  const [savedPokemons, setSavedPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    fetchPokemons();
    loadSavedPokemons();
  }, []);

  const fetchPokemons = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url || 'https://pokeapi.co/api/v2/pokemon');
      const results = response.data.results;
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return {
            id: response.data.id,
            name: response.data.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
            type: response.data.types[0].type.name,
            isSaved: false,
          };
        })
      );
      const filteredPokemonData = pokemonData.filter(
        (pokemon) => !savedPokemons.some((savedPokemon) => savedPokemon.id === pokemon.id)
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...filteredPokemonData]);
      setNextPageUrl(response.data.next);
      setLoading(false);
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
      const isAlreadySaved = savedPokemons.some((p) => p.id === pokemon.id);
      if (isAlreadySaved) {
        setShowSaveMessage(true);
      } else {
        await addPokemonToList(pokemon);
        console.log('Pokémon adicionado:', pokemon);
        setSavedPokemons((prevSavedPokemons) => [...prevSavedPokemons, pokemon]);
        setPokemons((prevPokemons) =>
          prevPokemons.map((p) => (p.id === pokemon.id ? { ...p, isSaved: true } : p))
        );
      }
    } catch (error) {
      console.error('Erro ao adicionar o Pokémon:', error);
    }
  };

  const handleRemoveFromMyPokemons = async (pokemon) => {
    try {
      await removePokemonFromList(pokemon);
      console.log('Pokémon removido:', pokemon);
      setSavedPokemons((prevSavedPokemons) =>
        prevSavedPokemons.filter((p) => p.id !== pokemon.id)
      );
      setPokemons((prevPokemons) =>
        prevPokemons.map((p) => (p.id === pokemon.id ? { ...p, isSaved: false } : p))
      );
    } catch (error) {
      console.error('Erro ao remover o Pokémon:', error);
    }
  };

  const renderPokemonItem = ({ item }) => {
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
      backgroundColor: typeColors[item.type] || '#fff',
      marginBottom: 10,
      flex: 1,
      margin: 8,
      borderRadius: 8,
    };

    const cardImageStyle = {
      backgroundColor: Color(cardStyle.backgroundColor).lighten(0.3).hex(),
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    };

    const saveButtonStyle = {
      backgroundColor: item.isSaved ? '#E46E60' : '#BC4132',
      marginTop: 10,
    };

    const saveButtonTextStyle = {
      color: item.isSaved ? '#fff' : '#000',
    };

    const saveButtonLabel = item.isSaved ? 'Salvo' : 'Salvar';

    const handleSaveButtonPress = () => {
      if (item.isSaved) {
        handleRemoveFromMyPokemons(item);
      } else {
        handleAddToMyPokemons(item);
      }
    };

    return (
      <Card style={cardStyle}>
        <Card.Cover
          source={{ uri: item.image }}
          style={[cardImageStyle, { aspectRatio: 1 }]}
          resizeMode="contain"
        />
        <Card.Content>
          <Title>{item.name}</Title>
          {showSaveMessage && (
            <Text style={{ color: 'red' }}>Este Pokémon já foi salvo</Text>
          )}
          <Button
            onPress={handleSaveButtonPress}
            style={saveButtonStyle}
            labelStyle={saveButtonTextStyle}
          >
            {saveButtonLabel}
          </Button>
        </Card.Content>
      </Card>
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  const handleLoadMore = () => {
    if (nextPageUrl) {
      fetchPokemons(nextPageUrl);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderPokemonItem}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default PokedexScreen;
