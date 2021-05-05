import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

const styles = StyleSheet.create({
    receiverBubble:{
        flexDirection: "row",
        alignItems:"flex-end",
        marginVertical: 10,
        marginRight: 35,
    },
    receiverBubbleView: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 10,
    },
    messageText:{
        fontSize: 17,
        fontWeight: "400",
        color: "#3C3C3D"
    },
    profilepic:{
        width: 30,
        height: 35,
        borderRadius:10,
        marginRight: 10,
    }
});

const ReceiverBubble = () => {
  return (
    <View style = {styles.receiverBubble}>
        <Text style = {{fontSize: 35}}>🦁</Text>
        <View style = {styles.receiverBubbleView}>
            <Text style = {styles.messageText}>Template Views
            asdf
            asdfasdfasdasdfsadfasdfasdfasdfasdfsadf
             asdf asdf asdf asdasdf sadfasdfsadf asdfasd fasdf dasf</Text>
        </View>
    </View>
  );
}

export default ReceiverBubble;