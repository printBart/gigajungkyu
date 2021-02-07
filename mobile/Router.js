import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from './src/Views/MapView';
import ThreadView from './src/Views/ThreadView';

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapView}
        options = {{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen
      name="Profile" component={ThreadView}
      options = {{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}

export default Router;