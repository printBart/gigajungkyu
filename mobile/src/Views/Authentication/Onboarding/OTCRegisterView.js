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
    },
    headerDescription: {
        fontWeight: "400",
        fontSize: 15,
        color: "#3C3C3D",
        paddingVertical: 10,
    },
    resendView:{
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginLeft: 10,

        elevation: 3,
        padding: 5,
        borderRadius: 5,
    },
    resendText:{
        fontWeight: "600",
        color: "gray"
    },
    textInput: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 17,
        borderRadius: 10,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1.5,
    },
    continueButton: {
        marginTop: 25,
        backgroundColor: "#7367FF",
        padding: 10,
        borderRadius: 25,
    },
    continueButtonText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white"
    },
    validText: {
        marginLeft: 10,
        marginTop: 5,
        color: "#ff5c5c"
    }
});

const OTCRegisterView = ({navigation, route}) => {
    const [passcode, onChangePasscode] = React.useState("");
    const [validIndicator, onChangeValidIndicator] = React.useState(false);

    const onChangePasscodeInputChecker = (text) => {
        onChangePasscode(text);
        const valid = true;
        if(text.length === 4){
            if(valid){
                navigation.navigate("password", {...route.params});
            }
            else{
                onChangePasscode("");
                onChangeValidIndicator(true)
            }
        }
    }

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: "white",}}>
            <View style = {styles.emailOnboardingView}>
                <TouchableOpacity style = {styles.header} onPress = {() => navigation.goBack()}>
                    <FontAwesome5Icon name = "chevron-left" size = {30} color = "#e8e8e8"/>
                </TouchableOpacity>
                <View style = {{paddingHorizontal: 25, paddingVertical: 10,}}>
                    <Text style = {styles.headerText}>My code is </Text>
                    <View style = {{flexDirection: "row", alignItems: "center"}}>
                        <Text style = {styles.headerDescription}>{route.params.email}</Text>
                        <TouchableOpacity style = {styles.resendView}>
                            <Text style = {styles.resendText}>Resend</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styles.textInput, validIndicator && {borderBottomColor: "#ff5c5c"}]}
                        onChangeText={text => onChangePasscodeInputChecker(text)}
                        value={passcode}
                        placeholder = "0000"
                        keyboardType = "numeric"
                        maxLength = {4}
                        autoFocus = {true}
                    />
                    {validIndicator &&
                        <Text style = {styles.validText}>Wrong code. Please try again</Text>}
                    <TouchableOpacity style = {[styles.continueButton,  passcode.length <4 && {backgroundColor: "#e8e8e8"}]}>
                        <Text style = {styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default OTCRegisterView;