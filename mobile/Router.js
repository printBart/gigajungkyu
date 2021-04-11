import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//components
import MapView from './src/Views/MapView/MapView';
import MessageView from './src/Views/MessageView/MessageView';

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapView}
      />
      <Tab.Screen
      name="Message" component={MessageView}
      />
    </Tab.Navigator>
  );
}

export default Router;