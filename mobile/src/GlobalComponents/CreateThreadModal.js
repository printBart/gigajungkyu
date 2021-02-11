import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Modal,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import { createPostQuery } from '../GlobalFunctions/queries';
import { postRequest } from '../GlobalFunctions/request';

import EmojiSelector from './EmojiSelector';

const styles = StyleSheet.create({
    postModal: {
      backgroundColor: "white",
      flex: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      //shadow
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      
      elevation: 24,
      //end shadow
    },
    header: {
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: 'space-between',
      padding: 10,
      paddingHorizontal: 15,
    },
    cancelBtn: {
      fontSize: 20,
      fontWeight: '500',
      opacity: 0.5,
    },
    postBtn: {
      backgroundColor: "#7367FF",
      color: "white",
      padding: 5,
      paddingHorizontal: 15,
      borderRadius: 15,
    },
    postBtnText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    body: {
      flex: 1,
    },
    titleContainer:{
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      paddingRight: 35,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
    },
    description: {
      flex: 1,
      padding: 20,
      fontSize: 20,
    }
});

const CreateThreadModal = (props) => {
  const [title, onChangeTitle] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [currentEmoji, setCurrentEmoji] = React.useState("😀");

  const postThread = () => {
    console.log("retrieving all posts");
    var request = postRequest(
      createPostQuery(
        title,
        description,
        "lK5Apx1GNsaDw8UZK8zpJnRTNR33",
        props.currentLocation.coords.longitude,
        props.currentLocation.coords.latitude,
        currentEmoji
      ),
        "/graphql"
    );
    fetch(request).then((response) => {
      response.json().then((data) => {
        console.log(data);
        props.setDisplayThread(false);
      });
    });
  }

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.displayThread}>
    <KeyboardAvoidingView style = {{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableOpacity style = {{flex: 1,}} onPress={() => props.setDisplayThread(false)}>
        </TouchableOpacity>
        <EmojiSelector
            setCurrentEmoji = {setCurrentEmoji}/>
        <View style = {styles.postModal}>
          <SafeAreaView style = {{flex: 1}}>
            <View style = {styles.body}>
            <View style = {styles.titleContainer}>
                <Text style = {{paddingRight: 5, fontSize: 30}}>{currentEmoji}</Text>
                <TextInput
                style={styles.title}
                onChangeText={text => onChangeTitle(text)}
                value={title}
                placeholder = {"Title"}
                autoFocus={true}
                />
            </View>
            <TextInput
                style = {styles.description}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => onChangeDescription(text)}
                value={description}
                placeholder = "Write something ...."
            />
            </View>
            <View style ={styles.header}>
              <TouchableOpacity
                  onPress={() => props.emitThread(true)}>
                  <Text style = {styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.postBtn} onPress={postThread}>
                  <Text style = {styles.postBtnText}>Post</Text>
              </TouchableOpacity>
            </View>
    
            </SafeAreaView>
        </View>
        </KeyboardAvoidingView>
    </Modal>
  );
}

export default CreateThreadModal;