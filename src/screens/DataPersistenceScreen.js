import React, { useState, useEffect } from 'react';
import { View, Button, AsyncStorage, Text } from 'react-native';

const DataPersistenceScreen = () => {
  const [data, setData] = useState('');

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('key', 'data');
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        setData(value);
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Button title="Save Data" onPress={saveData} />
      <Text>{data}</Text>
    </View>
  );
};

export default DataPersistenceScreen;