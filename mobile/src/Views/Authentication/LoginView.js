import React, {useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    header: {
        marginLeft: 15,
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center"
    },
    textInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 17,
        borderRadius: 10,
        marginVertical: 5,
        borderBottomColor: "white",
        borderBottomWidth: 3,
        color: "gray",
        fontWeight: "500"
    },
    loginBtn: {
        width: "100%",
        backgroundColor: "#7367FF",
        padding: 15,
        borderRadius: 25,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        fontSize: 15,
    }
});

const LoginView = ({navigation}) => {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const passwordInputRef = useRef();

    const loginUser = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
           .catch((error) => {
            Alert.alert(
                "Forgotten password for " + email + "?",
                error,
                [
                  {
                    text: "Try again",
                    onPress: () =>  passwordInputRef.current.focus(),
                    style: "cancel"
                  },
                  { text: "Send Email", onPress: () => console.log("Send Email") }
                ],
                { cancelable: false }
              );
           });
    }

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: "white"}}>
            <TouchableOpacity style = {styles.header} onPress = {() => navigation.navigate("main")}>
                <FontAwesome5Icon name = "chevron-left" size = {30} color = "#e8e8e8"/>
            </TouchableOpacity>
            <View style = {styles.login}>
                <View>
                    <Text style = {styles.title}>🐳 iykyk</Text>
                </View>
                <View style = {{paddingVertical: 50,}}>
                    <TextInput
                        style = {styles.textInput}
                        onChangeText={text => onChangeEmail(text)}
                        value={email}
                        placeholder = "yourschoolemail@uottawa.ca"
                        autoCapitalize = "none"
                        autoFocus = {true}
                    />
                    <TextInput
                        style = {styles.textInput}
                        onChangeText={text => onChangePassword(text)}
                        value={password}
                        placeholder = "••••••••••"
                        secureTextEntry={true}
                        autoCapitalize = "none"
                        autoFocus = {false}
                        ref = {passwordInputRef}
                    />
                </View>
                <TouchableOpacity style = {styles.loginBtn} onPress = {loginUser}>
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default LoginView;