import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
    profileView: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
        //end shadow
    },
    filler: {
        flex: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
    },
    profileButton: {
        backgroundColor: "#7367FF", 
        alignItems: "center", 
        justifyContent: "center",
        paddingLeft: 2.5,
        paddingBottom: 1,
        width: 50,
        height: 50,
        borderRadius: 50,
        shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
    
          elevation: 10,
      }
});

const ProfileModal = (props) => {
    return (
            <Modal
                transparent={true}
                visible={props.visible ? true : false}
            >
                <SafeAreaView style={{display: 'flex', flex: 1}}>
                    <View style = {styles.profileView}>
                        <View style = {styles.header}>
                            <View style={{flex: 1}}></View>
                            <TouchableOpacity style ={styles.profileButton}>
                                <Text style ={{fontSize: 30}}>🐶</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style = {styles.filler} onPress = {() => props.setVisible(false)}></TouchableOpacity>
                </SafeAreaView>
            </Modal>
    );
}

export default ProfileModal;