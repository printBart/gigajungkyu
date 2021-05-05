import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import PrivateMessageView from './PrivateMessageView';

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    }
});

const MessageContainer = () => {
  const [privateMessage, setPrivateMessage] = useState(false);
  return (
    <View>
      <TouchableOpacity style = {styles.messageContainer} onPress = {() => setPrivateMessage(true)}>
          <Text style = {{fontSize: 40}}>🦊</Text>
          <Text style = {{fontSize: 15, color: "gray", paddingLeft: 10,}}>Hey how are you doin? ∙ 12:35pm</Text>
      </TouchableOpacity>
      <PrivateMessageView
        visible = {privateMessage}
        setVisible = {setPrivateMessage}/>
    </View>
  );
}

export default MessageContainer;