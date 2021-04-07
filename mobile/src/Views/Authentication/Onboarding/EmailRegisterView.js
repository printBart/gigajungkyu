import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native';

//icons
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    emailOnboardingView: {
        flex: 1,
        padding: 10,
    },
    headerText: {
        fontWeight: "400",
        fontSize: 25,
        color: "#3C3C3D",
        marginLeft: 5,
    },
    headerDescription: {
        fontWeight: "400",
        fontSize: 15,
        color: "#3C3C3D",
        paddingVertical: 10,
    },
    textInput: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 17,
        borderRadius: 10,
        marginTop: 15,
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

const EmailRegisterView = ({navigation, route}) => {
    const [email, onChangeEmail] = React.useState("");
    const [validIndicator, onChangeValidIndicator] = React.useState(false);

    const submitEmail = () => {
        //if(validateEmail(email)){
            navigation.navigate('otc', {
                ...route.params,
                email,
            });
        // } else {
        //     onChangeValidIndicator(true);
        // }
    }

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: "white",}}>
            <View style = {styles.emailOnboardingView}>
                <TouchableOpacity style = {styles.header} onPress = {() => navigation.navigate("main")}>
                    <FontAwesome5Icon name = "chevron-left" size = {30} color = "#e8e8e8"/>
                </TouchableOpacity>
                <View style = {{paddingHorizontal: 25, paddingVertical: 10,}}>
                    <Text style = {styles.headerText}>Enter your UBC Email</Text>
                    <TextInput
                        style={[styles.textInput, validIndicator && {borderBottomColor: "#ff5c5c"}]}
                        onChangeText={text => {onChangeEmail(text), onChangeValidIndicator((val) => val && false)}}
                        value={email}
                        maxLength = {320}
                        placeholder = "yourschoolemail@ubc.ca"
                        autoCapitalize = "none"
                        autoFocus = {true}
                    />
                    {validIndicator &&
                    <Text style = {styles.validText}>Please enter a valid uOttawa email</Text>}
                    <TouchableOpacity style = {styles.continueButton} onPress = {submitEmail}>
                        <Text style = {styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default EmailRegisterView;