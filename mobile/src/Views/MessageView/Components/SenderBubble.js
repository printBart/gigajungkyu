import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const styles = StyleSheet.create({
  senderBubble:{
    alignItems:"flex-end",
    justifyContent: "center",
    marginVertical: 10,
  },
  senderBubbleView: {
    backgroundColor: "#7367FF",
    padding: 10,
    borderRadius: 10,
    marginLeft: 25,
  },
  messageText:{
    fontSize: 17,
    color: "white",
    fontWeight: "600"
  }
});

const SenderBubble = () => {
  return (
    <View style = {styles.senderBubble}>
      <View style = {styles.senderBubbleView}>
        <Text style = {styles.messageText}>Template Viewsaaaaaasdfasdfasdfdsadfasdfsdfsdasdfasdffsdasdfasdfsadfsdafasdfasdfasdffasdfasdfds</Text>
      </View>
    </View>
  );
}

export default SenderBubble;