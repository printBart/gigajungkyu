import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';


import * as firebase from 'firebase';

const styles = StyleSheet.create({
    profileView: {
        flex: 1,
        justifyContent: "space-between",
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
        backgroundColor: "white", 
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
    },
    logoutBtn: {
        backgroundColor: "#7367FF",
        padding: 10,
        borderRadius: 25,
    }
});

const ProfileModal = (props) => {
    const logoutUser = async() => {
        props.setVisible(false)
        try{
          await firebase.auth().signOut();
        } catch(e){
          throw e;
        }
    }

    return (
            <Modal
                transparent={true}
                visible={props.visible ? true : false}
            >
                <SafeAreaView style={{display: 'flex', flex: 1}}>
                    <View style = {styles.profileView}>
                        <View style = {styles.header}>
                            <TouchableOpacity style ={styles.profileButton}>
                                <Text style ={{fontSize: 30}}>🐶</Text>
                            </TouchableOpacity>
                            <View style={{flex: 1}}></View>
                        </View>
                        <TouchableOpacity style = {styles.logoutBtn} onPress = {logoutUser}>
                            <Text style = {{textAlign: "center", fontSize: 20, fontWeight: "bold", color: "white"}}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style = {styles.filler} onPress = {() => props.setVisible(false)}></TouchableOpacity>
                </SafeAreaView>
            </Modal>
    );
}

export default ProfileModal;