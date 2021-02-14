import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';


//icons
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//funcitons
import { postRequest } from '../GlobalFunctions/request';
import { getAllCommentsByPostIdQuery } from '../GlobalFunctions/queries';
import CommentModal from './CommentModal';
import { convertDeltaMilisToTime } from '../GlobalFunctions/date';

const styles = StyleSheet.create({
    header: {
        marginBottom: 10,
    },
    thread: {
        flexDirection: "row",
        padding: 10,
  
        margin: 5,
        backgroundColor: "white",
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        borderRadius: 10,
        marginBottom: 20,
        //shadow
    },
    voteContainer:{
        alignItems: "center"
    },
    threadContainer:{
        flex: 1,
        paddingLeft: 5,
    },
    title: {
        fontWeight: "600",
        fontSize: 20,
        paddingTop: 10,
    },
    description: {
        paddingVertical: 15,
        fontSize: 15,
    },
    footer: {
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footerComment: {
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    footerItem: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    footerLeft:{
        fontSize: 15,
        color: "gray",
        fontWeight: "600",
        paddingRight:15,
    },
    footerRight: {
        fontSize: 15,
        color: "gray",
        fontWeight: "600",
        paddingLeft:5,
    },
    comments: {
        paddingVertical: 10,
    },
    comment: {
        flexDirection: "row",
        paddingHorizontal: 5,
  
        margin: 5,
        backgroundColor: "white",
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 10,
        //shadow
    },
    addCommentContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 10,
    },
    addComment: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 5,
    },
});

const ThreadModal = (props) => {
    const [displayComment, setDisplayComment] = useState(false);

    //unsorted tree comments (raw)
    const[treeComments, setTreeComments] = useState([]);
    const [comments, setComments] = useState([]);
    const[hiddenComments, setHiddeComments] = useState([]);

    useEffect(() => {
        getCommentsByPostId();
    }, []);

    const getCommentsByPostId = () => {
        var request = postRequest(
            getAllCommentsByPostIdQuery(props.selectedThread._id),
            "/graphql"
            );
            fetch(request).then((response) => {
                response.json().then((data) => {
                    setTreeComments(data.data.getAllCommentsByPostId);
                    setComments(sortTraversedComments(data.data.getAllCommentsByPostId));
                })
            }
        )
    }

    const sortTraversedComments = (nodes) => {
        const result = [];
        inOrderTraversal(nodes, 0, result);
        return result;
    }

    const inOrderTraversal = (nodes, layerCount, result) => {
        if(nodes){
            nodes.forEach(function(node){
                if(node && hiddenComments.indexOf(node._id)<0){
                node.layer = layerCount;
                result.push(node);
                inOrderTraversal(node.childComments, layerCount+1, result);
                }
                else{
                node.layer = layerCount;
                result.push(node);
                }
            });
        }
    }

    function hideComments(nodeId){
        const nodeExists = hiddenComments.some(comment => comment === nodeId);
        if(nodeExists){
          setHiddeComments(hiddenComments.filter(comment => comment !== nodeId));
        } else{
          setHiddeComments(oldArray => [...oldArray, nodeId]);
        }
    }

    useEffect(() => {
        setComments(sortTraversedComments(treeComments));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [hiddenComments])
    

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.selectedThread ? true : false}
        >
            <SafeAreaView style = {{flex: 1}}>
                <TouchableOpacity style = {styles.header} onPress = {() => props.setSelectedThread(null)}>
                    <FeatherIcon name = "chevron-left" size = {30}/>
                </TouchableOpacity>
                <ScrollView style = {styles.scrollView}>
                    <View style = {styles.thread}>
                        <View style = {styles.voteContainer}>
                            <TouchableOpacity>
                                <FeatherIcon name="chevron-up" size={35} color = {"lightgray"} />
                            </TouchableOpacity>
                            <Text style={{fontSize: 15, fontWeight: "600"}}>83</Text>
                            <TouchableOpacity>
                                <FeatherIcon name="chevron-down" size={35} color = {"lightgray"} />
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.threadContainer}>
                            <Text style = {styles.title}>{props.selectedThread.emoji} {props.selectedThread.title}</Text>
                            <Text style = {styles.description}>{props.selectedThread.description}</Text>
                            <View style = {styles.footer}>
                                <TouchableOpacity style = {styles.footerItem}>
                                    <MaterialCommunityIcons name = "comment" size = {15} color = "gray"/>
                                    <Text style ={styles.footerLeft}>&nbsp;10 Comments</Text>
                                </TouchableOpacity>
                                <Text style = {styles.footerRight}>🐻 {convertDeltaMilisToTime(props.selectedThread.date)} ago</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.comments}>
                        {comments.map((comment) => {
                            if(hiddenComments.indexOf(comment._id)<0){
                                return(
                                    <TouchableOpacity key = {comment._id} style = {[{marginLeft: 25*comment.layer + 5}, styles.comment]} onPress = {() => hideComments(comment._id)}>
                                        <View style = {styles.voteContainer}>
                                            <TouchableOpacity>
                                                <FeatherIcon name="chevron-up" size={35} color = {"lightgray"} />
                                            </TouchableOpacity>
                                            <Text style={{fontSize: 15, fontWeight: "600"}}>10</Text>
                                            <TouchableOpacity>
                                                <FeatherIcon name="chevron-down" size={35} color = {"lightgray"} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style = {styles.threadContainer}>
                                            <Text style = {styles.description}>{comment.description}</Text>
                                            <View style = {styles.footerComment}>
                                                <TouchableOpacity style = {styles.footerItem} onPress = {() => setDisplayComment(comment)}>
                                                    <MaterialCommunityIcons name = "reply" size = {15} color = "gray"/>
                                                    <Text style ={styles.footerLeft}>&nbsp;Reply</Text>
                                                </TouchableOpacity>
                                                <Text style = {styles.footerRight}>🐵 {convertDeltaMilisToTime(Number(comment.date))} ago</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }else{
                                return(
                                    <TouchableOpacity key = {comment._id} style = {[{marginLeft: 25*comment.layer + 5, padding: 15}, styles.comment]} onPress = {() => hideComments(comment._id)}>
                                         <Text style = {styles.footerRight}>🐵 {convertDeltaMilisToTime(Number(comment.date))} ago</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity style = {styles.addCommentContainer} onPress = {() => setDisplayComment(props.selectedThread)}>
                    <Text style = {{fontSize: 20}}>🦄 &nbsp;</Text>
                    <View style = {styles.addComment}>
                        <Text style = {{color: "#6A6A6A", fontSize: 15,}}>Add a comment...</Text>
                    </View>
                </TouchableOpacity>
                <CommentModal
                    currentLocation = {props.currentLocation}
                    displayComment = {displayComment}
                    setDisplayComment = {setDisplayComment}
                    post = {props.selectedThread}
                    setComments = {setComments}
                    getCommentsByPostId = {getCommentsByPostId}/>
            </SafeAreaView>
        </Modal>
    );
}

export default ThreadModal;