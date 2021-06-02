import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    threadPreview: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        margin: 10,
        width: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    triangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        bottom: -10,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        borderTopColor: 'white',
        left: '50%',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
});

const UserProfilePreview = (props) => {
  return (
    <View style = {styles.threadPreview}>
        <Text style = {{fontSize: 20,}}>{props.currentUserProfile.emoji ? props.currentUserProfile.emoji : "🐶"}</Text>
        <Text style = {{paddingVertical: 5, fontSize: 15,}}>{props.currentUserProfile.faculty}</Text>
        <Text style = {{paddingVertical: 10}}>Default Bio</Text>
        <TouchableOpacity style = {{backgroundColor: "#f5f5f5", padding: 10, borderRadius: 25, marginVertical: 10,}} onPress = {() => props.joinDMRoom(props.currentUserProfile.token)}>
            <Text style = {{color: "gray", paddingLeft: 5}}>Message..</Text>
        </TouchableOpacity>
        <View style = {styles.triangle}></View>
    </View>
  );
}

export default UserProfilePreview;