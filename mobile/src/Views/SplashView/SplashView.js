import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import * as firebase from 'firebase';

const styles = StyleSheet.create({
    splashView: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
    },
});

const SplashView = ({navigation}) => {

    useEffect(() => {
        navigateToAuthOrMainScreen();
    }, [navigation])

    const navigateToAuthOrMainScreen = () => {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged((user) => {
                if(user != null){
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'router'}]
                    })
                } else{
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'auth'}]
                    })
                }
            })
        }, 1000)
    }

  return (
    <View style = {styles.splashView}>
      <Text style = {styles.title}>🐳 app title</Text>
    </View>
  );
}

export default SplashView;