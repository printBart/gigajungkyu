import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native';

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
    const [spiritAnimal, setSpiritAnimal] = React.useState("");

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
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🐵</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🦊</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🐯</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.row}>
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🦄</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🐻</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🐶</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.row}>
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🐹</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🐰</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.animalSelectBtn}>
                            <Text style = {styles.animalEmoji}>🐼</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style = {styles.continueButton}>
                    <Text style = {styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default AnimalPickerRegisterView;