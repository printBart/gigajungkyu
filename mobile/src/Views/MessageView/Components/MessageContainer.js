import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    }
});

const MessageContainer = () => {
  return (
    <TouchableOpacity style = {styles.messageContainer}>
        <Text style = {{fontSize: 40}}>🦊</Text>
        <Text style = {{fontSize: 15, color: "gray", paddingLeft: 10,}}>Hey how are you doin? ∙ 12:35pm</Text>
    </TouchableOpacity>
  );
}

export default MessageContainer;