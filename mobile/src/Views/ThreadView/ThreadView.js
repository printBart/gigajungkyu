import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

//components
import ThreadPreview from './Components/ThreadPreview';
import PostButton from '../../GlobalComponents/PostButton';
import CreateThreadModal from '../../GlobalComponents/CreateThreadModal';
import { postRequest } from '../../GlobalFunctions/request';
import { getAllPostsQuery } from '../../GlobalFunctions/queries';
import ThreadModal from '../../GlobalComponents/ThreadModal';

const styles = StyleSheet.create({
  threadView: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
    color: "grey",
  },
  filterMenu: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "center",
  },
  filterBtn: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  filterBtnText: {
    fontSize: 15,
    color: "#6A6A6A"
  },
  threadContainer: {
    alignSelf: 'stretch',
  }
});

const ThreadView = () => {
  const [displayCreateThread, setDisplayCreateThread] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    console.log("retrieving all posts");
    var request = postRequest(
      getAllPostsQuery(),
       "/graphql"
   );
   fetch(request).then((response) => {
      response.json().then((data) => {
        setAllPosts(data.data.getAllPosts);
      });
   });
  }

  return (
    <SafeAreaView style = {styles.threadView}>
      <View style = {{padding: 20}}>
        <Text style = {styles.header}>👋 Welcome!</Text>
      </View>
      <View style = {styles.filterMenu}>
        <TouchableOpacity style = {styles.filterBtn}>
          <Text style = {styles.filterBtnText}>Hot</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.filterBtn}>
          <Text style = {styles.filterBtnText}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.filterBtn}>
          <Text style = {styles.filterBtnText}>Top</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style = {styles.threadContainer}>
        {allPosts.map((post) => {
          return(
            <ThreadPreview
              key = {post._id}
              post = {post}
              setSelectedThread = {setSelectedThread}/>
          )
        })}
      </ScrollView>

      <CreateThreadModal
        displayThread = {displayCreateThread}
        setDisplayThread = {setDisplayCreateThread}/>
      
      {selectedThread &&
      <ThreadModal
        selectedThread = {selectedThread}
        setSelectedThread = {setSelectedThread}/>}

      <TouchableOpacity
        onPress={() => setDisplayCreateThread(true)}>
        <PostButton />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ThreadView;