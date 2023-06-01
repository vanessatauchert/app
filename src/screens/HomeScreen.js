import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleGoToPokedex = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Pokedex' }],
    });
  };

  return (
    <View>
      <Text>Bem-vindo à Pokédex!</Text>
      <Button title="Ir para a Pokédex" onPress={handleGoToPokedex} />
    </View>
  );
};

export default HomeScreen;
