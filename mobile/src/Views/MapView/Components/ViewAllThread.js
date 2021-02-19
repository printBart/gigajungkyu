import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const styles = StyleSheet.create({
    viewAllThreadBtn: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: 'absolute',
      left: "27.5%",
      bottom: 35,
      backgroundColor: "#7367FF",
      padding: 10,
      borderRadius: 10,

      //shadow
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
      //end shadow
    }
});

import IonIcons from 'react-native-vector-icons/Ionicons';

const ViewAllThreadButton = () => {
  return (
    <View style = {styles.viewAllThreadBtn}>
      <IonIcons name = "ios-apps" size = {20} color = "white"/>
      <Text style = {{fontSize: 17, fontWeight: "700", color: "white"}}>&nbsp;&nbsp;View all Threads</Text>
    </View>
  );
}

export default ViewAllThreadButton;