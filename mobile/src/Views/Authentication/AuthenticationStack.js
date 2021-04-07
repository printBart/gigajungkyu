import React from 'react';

//navigation
import { createStackNavigator } from '@react-navigation/stack';

import {
  StyleSheet,
} from "react-native";
import AuthenticationView from './AuthenticationView';
import LoginView from './LoginView';
import EmailRegisterView from './Onboarding/EmailRegisterView';
import OTCRegisterView from './Onboarding/OTCRegisterView';
import PasswordRegisterView from './Onboarding/PasswordRegisterView';
import AnimalPickerRegisterView from './Onboarding/AnimalPickerRegisterView';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="main" component={AuthenticationView} />
            <Stack.Screen name="login" component={LoginView} />
            <Stack.Screen name="email" component={EmailRegisterView} />
            <Stack.Screen name = "otc" component = {OTCRegisterView} />
            <Stack.Screen name = "password" component = {PasswordRegisterView} />
            <Stack.Screen name = "animalpicker" component = {AnimalPickerRegisterView}/>
        </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
});

export default AuthenticationStack;