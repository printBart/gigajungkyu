import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import * as firebase from "firebase";

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    emailOnboardingView: {
        flex: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 25,
        color: "#3C3C3D",
        paddingLeft: 5,
        textAlign: "center"
    },
    animalSelectorView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    row:{
        flexDirection: "row"
    },
    animalSelectBtn: {
        backgroundColor: "#f5f5f5",
        width: 75,
        height: 75,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10,
    },
    animalEmoji: {
        fontSize: 50,
    },
    continueButton: {
        marginTop: 25,
        backgroundColor: "#7367FF",
        padding: 10,
        borderRadius: 25,
        marginHorizontal: 20,
    },
    continueButtonText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white"
    },
});

const AnimalPickerRegisterView = ({route, navigation}) => {
    const [loading, setLoading] = React.useState(false);
    const [spiritAnimal, setSpiritAnimal] = React.useState("");

    const registerUser = () => {
        setLoading(true);
        firebase.auth()
        .createUserWithEmailAndPassword(route.params.email, route.params.password)
        .then((user) => {
            console.log('User account created & signed in!');
            registerUser();
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
    }

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: "white",}}>
            <View style = {styles.emailOnboardingView}>
                <TouchableOpacity style = {styles.header} onPress = {() => navigation.goBack()}>
                    <FontAwesome5Icon name = "chevron-left" size = {30} color = "#e8e8e8"/>
                </TouchableOpacity>
                <View style = {{paddingHorizontal: 25, paddingVertical: 10,}}>
                    <Text style = {styles.headerText}>Choose your spirit animal</Text>
                </View>
                <View style = {styles.animalSelectorView}>
                    <View style = {styles.row}>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🐵" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🐵")}>
                            <Text style = {styles.animalEmoji}>🐵</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🦊" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🦊")}>
                            <Text style = {styles.animalEmoji}>🦊</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🐯" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🐯")}>
                            <Text style = {styles.animalEmoji}>🐯</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.row}>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🦄" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🦄")}>
                            <Text style = {styles.animalEmoji}>🦄</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🐻" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🐻")}>
                            <Text style = {styles.animalEmoji}>🐻</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🐶" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🐶")}>
                            <Text style = {styles.animalEmoji}>🐶</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.row}>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🐹" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🐹")}>
                            <Text style = {styles.animalEmoji}>🐹</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🐰" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🐰")}>
                            <Text style = {styles.animalEmoji}>🐰</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {[styles.animalSelectBtn, spiritAnimal === "🐼" && {backgroundColor: "#7367FF"}]} onPress = {() => setSpiritAnimal("🐼")}>
                            <Text style = {styles.animalEmoji}>🐼</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style = {styles.continueButton} onPress = {registerUser}>
                    <Text style = {styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default AnimalPickerRegisterView;