import React, {useState} from 'react';
import {
    StyleSheet,
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

const styles = StyleSheet.create({
  commentModal: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
    //end shadow
  },
  header: {
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 10,
  },
  cancelBtn: {
    fontSize: 20,
    fontWeight: '500',
    opacity: 0.5,
  },
  postBtn: {
    backgroundColor: "#7367FF",
    color: "white",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  postBtnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const CommentModal = (props) => {
  const [comment, setComment] = useState("");

  const postComment = () => {
    console.log(comment);
    props.setDisplayComment(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.displayComment}
    >
      <TouchableOpacity style = {{flex: 2}} onPress={() => props.setDisplayComment(false)}>
      </TouchableOpacity>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style = {styles.commentModal}>
        <View style = {styles.header}>
          <Text>🐸</Text>
        </View>
        <TextInput
          style = {{fontSize: 15,padding: 10, flex: 1}}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setComment(text)}
          value={comment}
          placeholder = "Add a comment..."
          autoFocus = {true}/>
          <View style ={styles.footer}>
            <TouchableOpacity
                onPress={() => props.setDisplayComment(false)}>
                <Text style = {styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.postBtn} onPress={postComment}>
                <Text style = {styles.postBtnText}>Comment</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default CommentModal;