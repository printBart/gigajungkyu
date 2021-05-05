import React, { useRef } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    SafeAreaView
} from 'react-native';

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    privateMessageView: {
        flex: 1,
        backgroundColor: "#fbfaff"
    },
    privateMessageBody: {
        flex: 1,
        padding: 10
    },
    messageInputView: {
        flexDirection: "row",
        backgroundColor: "#f5f5f5",
        marginTop: 10,
        padding: 10,
    }
});

import Icon from 'react-native-vector-icons/Feather';
import ReceiverBubble from './ReceiverBubble';
import SenderBubble from './SenderBubble';
import IonIcons from 'react-native-vector-icons/Ionicons';

const PrivateMessageView = (props) => {
    const scrollView = useRef();
    const [message, onChangeMessage] = React.useState("");
  return (
    <Modal
    transparent={true}
    visible={props.visible ? true : false}>
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{backgroundColor: "white", flex: 1, margin: 10, marginTop: 0, borderRadius: 10}}>
                <View style= {{padding: 20, flexDirection: "row", justifyContent: "flex-end"}}>
                    <TouchableOpacity style = {styles.header} onPress = {() => props.setVisible(false)}>
                        <Icon name = "send" size={27}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.privateMessageView}>
            <ScrollView
                style = {styles.privateMessageBody}
                ref={scrollView }
                onContentSizeChange={() => scrollView.current.scrollToEnd({animated: false})}
            >
                <SenderBubble />
                <ReceiverBubble />
                <SenderBubble />
                <ReceiverBubble />
                <SenderBubble />
                <ReceiverBubble />
                <SenderBubble />
                <ReceiverBubble />
                <SenderBubble />
                <ReceiverBubble />
                <SenderBubble />
                <ReceiverBubble />
                <View style = {{padding: 10}}></View>
            </ScrollView>
            <View style = {{}}>
                <View style = {styles.messageInputView}>
                    <TextInput
                        style = {{flex: 1, fontSize: 17,}}
                        onChangeText={text => onChangeMessage(text)}
                        placeholder = "Text Message"
                        value = {message}/>
                    <TouchableOpacity>
                        <IonIcons
                            name = "send"
                            size = {22}
                            color = "#7367FF"/>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
            </View>
        </SafeAreaView>
    </Modal>
  );
}

export default PrivateMessageView;