import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
    emojiSelector: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        opacity: 1,
        padding: 10,
        borderRadius: 25,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    emoji: {
        fontSize: 30
    }
});

const EmojiSelector = (props) => {
  return (
    <View style = {styles.emojiSelector}>
        <TouchableOpacity onPress = {() => props.setCurrentEmoji("😀")}>
            <Text style = {styles.emoji}>😀</Text>
        </TouchableOpacity >
        <TouchableOpacity onPress = {() => props.setCurrentEmoji("😄")}>
            <Text style = {styles.emoji}>😄</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => props.setCurrentEmoji("😣")}>
            <Text style = {styles.emoji}>😣</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => props.setCurrentEmoji("😚")}>
            <Text style = {styles.emoji}>😚</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => props.setCurrentEmoji("😝")}>
            <Text style = {styles.emoji}>😝</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => props.setCurrentEmoji("🥳")}>
            <Text style = {styles.emoji}>🥳</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => props.setCurrentEmoji("🤝")}>
            <Text style = {styles.emoji}>🤝</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => props.setCurrentEmoji("👏")}>
            <Text style = {styles.emoji}>👏</Text>
        </TouchableOpacity>
    </View>
  );
}

export default EmojiSelector;