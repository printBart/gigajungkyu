import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//components
import MapView from './src/Views/MapView/MapView';
import ThreadView from './src/Views/ThreadView/ThreadView';

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapView}
        options = {{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-pin" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen
      name="Profile" component={ThreadView}
      options = {{
        tabBarLabel: 'Thread',
        tabBarIcon: ({ color, size }) => (
          <Icon name="th-list" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}

export default Router;