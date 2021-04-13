import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MessageContainer from './Components/MessageContainer';

const styles = StyleSheet.create({
});

const MessageView = ({navigation}) => {
  return (
      <SafeAreaView>
            <View style= {{padding: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity style = {styles.header} onPress = {() => navigation.goBack()}>
                    <FontAwesome5Icon name = "chevron-left" size = {30} color = "#e8e8e8"/>
                </TouchableOpacity>
                <Text style = {{fontSize: 20, fontWeight: "500"}}>Message</Text>
                <Text>     </Text>
            </View>
            {[1,2,3].map((user, index) => {
                return(
                    <MessageContainer />
                )
            })}
      </SafeAreaView>
  );
}

export default MessageView;