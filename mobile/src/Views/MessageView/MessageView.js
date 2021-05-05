import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Modal
} from 'react-native';

import MessageContainer from './Components/MessageContainer';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
});

const MessageModal = (props) => {
  return (
    <Modal
        transparent={true}
        visible={props.visible ? true : false}
    >
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{backgroundColor: "white", flex: 1, margin: 10, marginTop: 0, borderRadius: 10}}>
                <View style= {{padding: 20, flexDirection: "row", justifyContent: "flex-end"}}>
                    <TouchableOpacity style = {styles.header} onPress = {() => props.setVisible(false)}>
                        <Icon name = "send" size={27}/>
                    </TouchableOpacity>
                </View>
                {[1,2,3].map((user, index) => {
                    return(
                        <MessageContainer
                            key = {index}/>
                    )
                })}
            </View>
        </SafeAreaView>
    </Modal>
  );
}

export default MessageModal;