import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Screen1 from './Screen1';
import Screen2 from './Screen2';
import DataPersistenceScreen from './DataPersistenceScreen';
import ApiScreen from './ApiScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="DataPersistence" component={DataPersistenceScreen} />
        <Tab.Screen name="API" component={ApiScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;