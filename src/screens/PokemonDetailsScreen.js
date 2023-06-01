import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PokedexDetailsScreen = ({ route }) => {
  const { pokemon } = route.params;

  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatBarColor = (baseStat) => {
    if (baseStat >= 100) {
      return '#3CB371'; // Green
    } else if (baseStat >= 60) {
      return '#FFA500'; // Orange
    } else {
      return '#FF4500'; // Red
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: typeColors[pokemon.types[0].type.name] }]}>
          {capitalizeFirstLetter(pokemon.name)}
        </Text>
        <View style={[styles.typeBadge, { backgroundColor: typeColors[pokemon.types[0].type.name] }]}>
          <Text style={styles.type}>{capitalizeFirstLetter(pokemon.types[0].type.name)}</Text>
        </View>
      </View>
      <Text style={styles.info}>Peso: {pokemon.weight} kg</Text>
      <Text style={styles.info}>Altura: {pokemon.height} cm</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades:</Text>
        <View style={styles.abilitiesContainer}>
          {pokemon.abilities.map((ability, index) => (
            <Text key={index} style={styles.ability}>
              {capitalizeFirstLetter(ability.ability.name)}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status:</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Text style={styles.statName}>HP</Text>
            <View style={[styles.statBar, { width: pokemon.stats[0].base_stat, backgroundColor: getStatBarColor(pokemon.stats[0].base_stat) }]} />
            <Text style={styles.statValue}>{pokemon.stats[0].base_stat}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statName}>Attack</Text>
            <View style={[styles.statBar, { width: pokemon.stats[1].base_stat, backgroundColor: getStatBarColor(pokemon.stats[1].base_stat) }]} />
            <Text style={styles.statValue}>{pokemon.stats[1].base_stat}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statName}>Defense</Text>
            <View style={[styles.statBar, { width: pokemon.stats[2].base_stat, backgroundColor: getStatBarColor(pokemon.stats[2].base_stat) }]} />
            <Text style={styles.statValue}>{pokemon.stats[2].base_stat}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statName}>Special Attack</Text>
            <View style={[styles.statBar, { width: pokemon.stats[3].base_stat, backgroundColor: getStatBarColor(pokemon.stats[3].base_stat) }]} />
            <Text style={styles.statValue}>{pokemon.stats[3].base_stat}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statName}>Special Defense</Text>
            <View style={[styles.statBar, { width: pokemon.stats[4].base_stat, backgroundColor: getStatBarColor(pokemon.stats[4].base_stat) }]} />
            <Text style={styles.statValue}>{pokemon.stats[4].base_stat}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statName}>Speed</Text>
            <View style={[styles.statBar, { width: pokemon.stats[5].base_stat, backgroundColor: getStatBarColor(pokemon.stats[5].base_stat) }]} />
            <Text style={styles.statValue}>{pokemon.stats[5].base_stat}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F1F1F1',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
  },
  type: {
    fontSize: 16,
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ability: {
    fontSize: 16,
    marginBottom: 4,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  statsContainer: {
    marginTop: 8,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statName: {
    fontSize: 16,
    marginRight: 8,
  },
  statBar: {
    height: 10,
    borderRadius: 4,
  },
  statValue: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PokedexDetailsScreen;
