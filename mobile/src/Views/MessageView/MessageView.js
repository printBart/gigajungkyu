import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
});

const MessageView = ({navigation}) => {
  return (
      <SafeAreaView>
            <View style= {{padding: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity style = {styles.header} onPress = {() => navigation.goBack()}>
                    <FontAwesome5Icon name = "chevron-left" size = {30} color = "#e8e8e8"/>
                </TouchableOpacity>
                <Text style = {{fontSize: 20,}}>Messages</Text>
                <Text>     </Text>
            </View>
      </SafeAreaView>
  );
}

export default MessageView;