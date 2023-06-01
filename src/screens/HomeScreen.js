import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleGoToPokedex = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Pokedex' }],
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/Poke.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Bem-vindo!</Text>
        <Button title="Ir para a Pokédex" onPress={handleGoToPokedex} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
