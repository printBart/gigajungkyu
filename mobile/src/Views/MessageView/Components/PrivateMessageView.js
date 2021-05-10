import React, { useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    SafeAreaView
} from 'react-native';
import * as firebase from 'firebase';
import { socket } from '../../../GlobalFunctions/socket';

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
import { postRequest } from '../../../GlobalFunctions/request';
import { getAllMessagesByRoom } from '../../../GlobalFunctions/queries';

let token;

const PrivateMessageView = (props) => {
    const scrollView = useRef();
    const [message, onChangeMessage] = useState("");
    const [currentMessages, changeCurrentMessages] = useState([]);

    useEffect(() => {
        token = firebase.auth().currentUser.uid;
        getAllPreviousMessages();
        socket.on('message', (message) => {
            changeCurrentMessages(prevMessages => [...prevMessages, message]);
          });
    }, []);

    const getAllPreviousMessages = () => {
        var request = postRequest(
            getAllMessagesByRoom(token, props.visible),
            "/graphql"
            );
            fetch(request).then((response) => {
                response.json().then((data) => {
                   changeCurrentMessages(prevMessages => [...data.data.getAllMessagesByRoom, ...prevMessages]);
                })
            }
        )
    }

    const sendMessage = async() => {
        if(message.length > 0){
            await socket.emit('sendMessage', 
                {senderToken: token, receiverToken: props.visible, message}
            )
            onChangeMessage("");
        }
    }

    const closePrivateMessage = async() => {
        changeCurrentMessages([]);
        await socket.emit('leaveDMRoom', {senderToken: props.visible, receiverToken: firebase.auth().currentUser.uid});
        props.setVisible(null);
    }

    console.log(currentMessages);

  return (
    <Modal
    transparent={true}
    visible={props.visible !== null ? true : false}>
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{backgroundColor: "white", flex: 1, margin: 10, marginTop: 0, borderRadius: 10}}>
                <View style= {{padding: 20, flexDirection: "row", justifyContent: "flex-end"}}>
                    <TouchableOpacity style = {styles.header} onPress = {closePrivateMessage}>
                        <Icon name = "send" size={27}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.privateMessageView}>
                    <ScrollView
                        style = {styles.privateMessageBody}
                        ref={scrollView }
                        onContentSizeChange={() => scrollView.current.scrollToEnd({animated: false})}
                    >
                        {currentMessages.map((message, index) => {
                            if(message.senderToken?.token == firebase.auth().currentUser.uid){ 
                                return(
                                    <SenderBubble
                                        key = {index}
                                        text = {message.message}/>
                                )
                            } else{
                                return(
                                    <ReceiverBubble
                                        key = {index}
                                        text = {message.message}/>
                                )
                            }
                        })}
                        <View style = {{padding: 10}}></View>
                    </ScrollView>
                    <View style = {{}}>
                        <View style = {styles.messageInputView}>
                            <TextInput
                                style = {{flex: 1, fontSize: 17,}}
                                onChangeText={text => onChangeMessage(text)}
                                placeholder = "Text Message"
                                value = {message}/>
                            <TouchableOpacity onPress = {sendMessage}>
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