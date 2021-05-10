import React from 'react';
import * as firebase from 'firebase';
import token from './token.json';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//views
import SplashView from './src/Views/SplashView/SplashView';
import MapView from './src/Views/MapView/MapView';
import AuthenticationStack from './src/Views/Authentication/AuthenticationStack';

var firebaseConfig = {
  apiKey: token.REACT_APP_FIREBASE_KEY,
  authDomain: token.REACT_APP_FIREBASE_DOMAIN,
  projectId: token.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: token.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: token.REACT_APP_FIREBASE_SENDER_ID,
  appId: token.REACT_APP_FIREBASE_APP_ID,
  measurementId: token.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const App = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen
          name = "splash"
          component = {SplashView}
          options = {{headerShown: false}}/>
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