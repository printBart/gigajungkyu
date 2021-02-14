import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { convertDeltaMilisToTime } from '../../../GlobalFunctions/date';

const styles = StyleSheet.create({
    threadPreview: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 350,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    voteContainer: {
        alignItems: "center"
    },
    threadBodyContainer: {
        paddingLeft: 10,
        flex: 1,
    },
    threadTitle: {
        fontWeight: "600",
        fontSize: 20,
    },
    threadDescription: {
        paddingVertical: 15,
        fontSize: 15,
        overflow: "hidden",
    },
    footer:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    footerRight: {
        fontSize: 15, color: "gray", fontWeight: "600"
    },
    triangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        bottom: -10,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        borderTopColor: 'white',
        left: '50%',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
});

const ThreadPreview = (props) => {
  return (
    <TouchableOpacity style = {styles.threadPreview} onPress =  {() => props.setSelectedThread(props.post)}>
        <View style = {styles.voteContainer}>
            <TouchableOpacity>
                <FeatherIcon name="chevron-up" size={35} color = {"lightgray"}/>
            </TouchableOpacity>
            <Text style= {{fontSize: 15, fontWeight: "600"}}>83</Text>
            <TouchableOpacity>
                <FeatherIcon name="chevron-down" size={35} color = {"lightgray"}/>
            </TouchableOpacity>
        </View>
        <View style = {styles.threadBodyContainer}>
            <View>
                <Text style = {styles.threadTitle}>{props.post.emoji} {props.post.title}</Text>
            </View>
            <Text style = {styles.threadDescription} numberOfLines = {2} ellipsizeMode="tail">{props.post.description}</Text>
            <View style = {styles.footer}>
                <View style = {styles.footerLeft}>
                    <MaterialCommunityIcons name = "comment" size = {15} color = "gray"/>
                    <Text style ={styles.footerRight}>&nbsp;10 Comments</Text>
                </View>
                <Text style = {styles.footerRight}>🐻 {convertDeltaMilisToTime(props.post.date)} ago</Text>
            </View>
        </View>
        <View style = {styles.triangle}></View>
    </TouchableOpacity>
  );
}

export default ThreadPreview;