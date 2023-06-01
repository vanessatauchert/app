import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';

import { getPokemonList, removePokemonFromList } from '../utils/storage.js';

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

const MyPokemonScreen = () => {
  const [savedPokemons, setSavedPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedPokemons();
  }, []);

  const loadSavedPokemons = async () => {
    try {
      const savedPokemonList = await getPokemonList();
      setSavedPokemons(savedPokemonList);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar os Pokémon salvos:', error);
    }
  };

  const handleRemoveFromMyPokemons = async (pokemon) => {
    try {
      await removePokemonFromList(pokemon);
      console.log('Pokémon removido:', pokemon);
      loadSavedPokemons();
    } catch (error) {
      console.error('Erro ao remover o Pokémon:', error);
    }
  };

  const getTypeColor = (type) => {
    const color = typeColors[type];
    return color || '#fff'; // Retorna branco como cor padrão caso o tipo não tenha uma cor definida
  };

  const renderPokemonItem = ({ item }) => {
    const cardStyle = {
      marginBottom: 10,
      flex: 1,
      margin: 8,
      borderRadius: 8,
      backgroundColor: getTypeColor(item.type[0]), // Obter a cor com base no primeiro tipo do Pokémon
    };

    const cardImageStyle = {
      height: 200,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    };

    const removeButtonStyle = {
      backgroundColor: '#BC4132',
      marginTop: 10,
    };

    const removeButtonTextStyle = {
      color: '#FFFFFF',
    };

    const handleRemoveButtonPress = () => {
      handleRemoveFromMyPokemons(item);
    };

    return (
      <Card style={cardStyle}>
        <Card.Cover source={{ uri: item.image }} style={cardImageStyle} resizeMode="contain" />
        <Card.Content>
          <Title>{item.name}</Title>
          <Button onPress={handleRemoveButtonPress} style={removeButtonStyle} labelStyle={removeButtonTextStyle}>
            Remover
          </Button>
        </Card.Content>
      </Card>
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  const handleRefresh = () => {
    setLoading(true);
    loadSavedPokemons();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={handleRefresh} style={{ margin: 16 }}>
        Atualizar
      </Button>
      <FlatList
        data={savedPokemons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderPokemonItem}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default MyPokemonScreen;
