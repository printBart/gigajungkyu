import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import * as firebase from 'firebase';
import token from './token.json';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//views
import SplashView from './src/Views/SplashView/SplashView';
// import MapView from './src/Views/MapView/MapView';
import AuthenticationStack from './src/Views/Authentication/AuthenticationStack';

const styles = StyleSheet.create({
});

var firebaseConfig = {
  apiKey: token.REACT_APP_FIREBASE_KEY,
  authDomain: token.REACT_APP_FIREBASE_DOMAIN,
  projectId: token.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: token.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: token.REACT_APP_FIREBASE_SENDER_ID,
  appId: token.REACT_APP_FIREBASE_APP_ID,
  measurementId: token.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const TemplateView = () => {
  return (
    <View>
      <Text>Template Views</Text>
    </View>
  );
}

export default TemplateView;