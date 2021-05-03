import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import emojiList from '../GlobalFunctions/emoji.json';

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 25,
    },
    header: {
        flexDirection: "row",
        padding: 10,
    },
    closeBtn: {
        backgroundColor: "#f5f5f5",
        padding: 5,
        borderRadius: 50,
    },
    emojiContainer: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    emojiBtn: {
        padding: 5,
    }
});

const EmojiSelectorModal = (props) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={props.displayModal}>
    <SafeAreaView style = {{flex: 1}}>
      <View style = {styles.modal}>
            <View style = {styles.header}>
                <View style = {{flex: 1,}}></View>
                <TouchableOpacity style = {styles.closeBtn} onPress = {() => props.setModal(false)}>
                    <FeatherIcon name = "x" size = {20} color = "gray"/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style = {styles.emojiContainer}>
                    {emojiList.map((emoji, index) => {
                        return(
                            <TouchableOpacity key = {index} style = {styles.emojiBtn}>
                                <Text style = {{fontSize: 50}}>{emoji.emoji}</Text>
                            </TouchableOpacity>
                        )
                    })}   
                </View>      
            </ScrollView>
      </View>
      </SafeAreaView>
    </Modal>
  );
}

export default EmojiSelectorModal;