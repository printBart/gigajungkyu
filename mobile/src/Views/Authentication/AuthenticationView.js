import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    loginView: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    middleView:{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
    },
    bottomView: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    createAccount: {
        width: "100%",
        backgroundColor: "#7367FF",
        padding: 15,
        borderRadius: 25,
    },
    signIn: {
        width: "100%",
        padding: 12.5,
        borderRadius: 25,
        marginVertical: 20,
        backgroundColor: "#f5f5f5",
        
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "gray"
    }
});

const AuthenticationView = ({navigation}) => {
  return (
    <View style = {styles.loginView}>
        <View style={{flex: 0.5}}></View>
        <View style={styles.middleView}>
            <Text style = {styles.title}>🐳 app name</Text>
        </View>
        <View style = {styles.bottomView}>
            <TouchableOpacity style = {styles.createAccount} onPress = {() => navigation.navigate('email')}>
                <Text style = {[styles.buttonText, {color: "white", fontSize: 15}]}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.signIn} onPress = {() => navigation.navigate('login')}>
                <Text style = {[styles.buttonText, {color: "gray", fontSize: 15}]}>SIGN IN</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default AuthenticationView;