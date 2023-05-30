import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  webContainer: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    textAlign: 'center',
  },
});

export default styles;
