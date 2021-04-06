import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    bottomModalPreview: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: 'absolute',
        bottom: 0,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
  
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
      },
      button: {
      }
});

const BottomModalPreview = (props) => {
  return (
    <View style = {styles.bottomModalPreview}>
        <TouchableOpacity style = {styles.button} onPress = {() => props.setDisplayAllThreads(true)}>
            <Icon name = "chevron-up" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.button, {marginRight: 5}]} onPress = {() => props.setDisplayThread(true)}>
            <Icon name = "edit" size={27}/>
        </TouchableOpacity>
    </View>
  );
}

export default BottomModalPreview;