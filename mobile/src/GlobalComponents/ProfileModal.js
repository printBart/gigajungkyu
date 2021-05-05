import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';


import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

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
    characterSelector: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        shadowColor: "#000",
        borderRadius: 25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: "100%",
    },
    emojiBtn: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    schoolSelector:{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        shadowColor: "#000",
        borderRadius: 25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: "100%",
        padding: 10
    },
    logoutBtn: {
        backgroundColor: "#7367FF",
        padding: 10,
        borderRadius: 25,
    }
});

const ProfileModal = (props) => {
    const [selector, setSelector] = useState(false);
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
                            {!selector ? 
                            <TouchableOpacity style ={styles.profileButton} onPress = {() => setSelector(true)}>
                                <Text style ={{fontSize: 30}}>🐶</Text>
                            </TouchableOpacity> : 
                            <View style = {styles.characterSelector}>
                                <TouchableOpacity style = {[styles.emojiBtn, {paddingLeft: 10, borderRightWidth: 0.5, borderColor: "gray"}]} onPress = {() => setSelector(false)}>
                                    <Text style ={{fontSize: 30}}>🐶</Text>
                                </TouchableOpacity>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator = {false}>
                                    <TouchableOpacity style = {styles.emojiBtn}>
                                        <Text style ={{fontSize: 30}}>🐵</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.emojiBtn}>
                                        <Text style ={{fontSize: 30}}>🐶</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.emojiBtn}>
                                        <Text style ={{fontSize: 30}}>🦊</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.emojiBtn}>
                                        <Text style ={{fontSize: 30}}>🐺</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.emojiBtn}>
                                        <Text style ={{fontSize: 30}}>🐯</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.emojiBtn}>
                                        <Text style ={{fontSize: 30}}>🦄</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.emojiBtn}>
                                        <Text style ={{fontSize: 30}}>🐮</Text>
                                    </TouchableOpacity>
                                </ScrollView> 
                            </View>}
                        </View>
                        <View style = {styles.schoolSelector}>
                            <Text style = {{fontSize: 17}}>University of British Columbia</Text>
                        </View>
                        <View style = {{flexDirection: "row", borderRadius: 25, backgroundColor: "#f5f5f5", padding: 15}}>
                            <TouchableOpacity style = {{flex: 1, alignItems: "center"}}>
                                <Text style = {{fontSize: 15}}>😎 Vibe Mode</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {{flex: 1, alignItems: "center"}}>
                                <Text style = {{fontSize: 15}}>👻 Ghost Mode</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style = {{fontSize: 15,}}>This is my bio. DM me if you want to talk :)</Text>
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