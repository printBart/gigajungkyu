import React from 'react';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//views
import MapView from './src/Views/MapView/MapView';
import AuthenticationStack from './src/Views/Authentication/AuthenticationStack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen
            name = "auth"
            component = {AuthenticationStack}
            options = {{headerShown: false}}/>
        <Stack.Screen
          name="router"
          component={MapView}
          options = {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;