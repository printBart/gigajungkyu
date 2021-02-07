import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    postBtn: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 50,

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

const PostButton = () => {
    return (
        <View style={styles.postBtn}>
            <Icon name = "edit" size={25}/>
        </View>
    );
}

export default PostButton;