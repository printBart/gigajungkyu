import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import FeatherIcon from 'react-native-vector-icons/Feather';

//functions
import { postRequest } from '../../GlobalFunctions/request';
import { getAllPostsQuery } from '../../GlobalFunctions/queries';

//components
import ThreadPreview from './Components/ThreadPreview';
import PostButton from '../../GlobalComponents/PostButton';
import CreateThreadModal from '../../GlobalComponents/CreateThreadModal';
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

const ThreadView = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
    Geolocation.watchPosition(
      (position) => {setCurrentLocation(position)},
      (error) => {console.log(error.code, error.message);},
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 });
  }, []);

  const getAllPosts = () => {
    console.log("retrieving all posts");
    var request = postRequest(
      getAllPostsQuery(),
       "/graphql"
   );
   fetch(request).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setAllPosts(data.data.getAllPosts);
      });
   });
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.displayAllThreads ? true : false}
    >
    <SafeAreaView style = {styles.threadView}>
      <View style = {{paddingHorizontal: 10, display: "flex", flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity  onPress={() => props.setDisplayAllThreads(false)}>
          <FeatherIcon name = "chevron-left" size = {35} color = "darkgray"/>
        </TouchableOpacity>
        <View style = {{flex: 1}}></View>
        <TouchableOpacity style = {{marginRight: 10}} onPress = {props.toggleCreateThread}>
          <FeatherIcon name = "edit" size = {27} color = "#3C3C3D"/>
        </TouchableOpacity>
      </View>
      <View style = {{padding: 20, paddingTop: 0}}>
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
      
      {selectedThread &&
      <ThreadModal
        selectedThread = {selectedThread}
        setSelectedThread = {setSelectedThread}/>}


    </SafeAreaView>
    </Modal>
  );
};

export default ThreadView;