import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//functions
import { convertDeltaMilisToTime } from '../../../GlobalFunctions/date';


const styles = StyleSheet.create({
    threadPreview: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        //shadow
        margin: 10,
    },
    voteContainer: {
        alignItems: "center"
    },
    threadBodyContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 25,
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
    }
});


const ThreadPreview = (props) => {
    return (
        <TouchableOpacity style = {styles.threadPreview} onPress =  {() => props.setSelectedThread(props.post)}>
            <View style = {styles.voteContainer}>
                <TouchableOpacity>
                    <FeatherIcon name="chevron-up" size={35} />
                </TouchableOpacity>
                <Text>83</Text>
                <TouchableOpacity>
                    <FeatherIcon name="chevron-down" size={35} />
                </TouchableOpacity>
            </View>
            <View style = {styles.threadBodyContainer}>
                <View>
                    <Text style = {styles.threadTitle}>{props.post.emoji} {props.post.title}</Text>
                </View>
                <Text style = {styles.threadDescription}>{props.post.description}</Text>
                <View style = {styles.footer}>
                    <View style = {styles.footerLeft}>
                        <MaterialCommunityIcons name = "comment" size = {15} color = "gray"/>
                        <Text style ={styles.footerRight}>&nbsp;Comments</Text>
                    </View>
                    <Text style = {styles.footerRight}>🐻 {convertDeltaMilisToTime(Number(props.post.date))} ago</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ThreadPreview;