import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapboxGL from "@react-native-mapbox-gl/maps";
import io from "socket.io-client";

import token from '../../../token.json';

//components
import PostButton from '../../GlobalComponents/PostButton';
import CreateThreadModal from '../../GlobalComponents/CreateThreadModal';
import ThreadPreview from './Components/ThreadPreview';
import ThreadModal from '../../GlobalComponents/ThreadModal';
import ViewAllThreadButton from './Components/ViewAllThread';
import ThreadView from '../ThreadView/ThreadView';


MapboxGL.setAccessToken(token.token);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'stretch',
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'green',
  },
  map: {
    flex: 1,
  },
  postModal: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
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
  body: {
    flex: 1,
  },
  titleContainer:{
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingRight: 35,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    flex: 1,
    padding: 20,
    fontSize: 20,
  },
  postBubble: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  }
});

let socket;

const MapView = () => {
  const [currentUsers, updateCurrentUsers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [displayThread, setDisplayThread] = useState(false);
  const [livePosts, setLivePosts] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [displayAllThreads, setDisplayAllThreads] = useState(null);


  useEffect(() => {
    socket = io('http://192.168.1.21:8080');

    socket.on('displayLivePosts', (livePosts) => {
      setLivePosts(livePosts);
    });

    socket.on('displayCurrentUsers', (onlineUsers) => {
      updateCurrentUsers(onlineUsers);
  })
    emitThread();
    Geolocation.watchPosition(
      (position) => {
        setCurrentLocation(position);
        sendUserLocation(position.coords.longitude, position.coords.latitude)
      },
      (error) => {console.log(error.code, error.message);},
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 });
  }, []);

  const emitThread = (thread) => {
    setDisplayThread(false);
    socket.emit('postThread', thread);
  }

  const sendUserLocation = (longitude, latitude) => {
    socket.emit('sendUserLocation', {
      userToken: "lK5Apx1GNsaDw8UZK8zpJnRTNR33",
      longitude,
      latitude
    })
  }

  console.log(currentUsers);
  
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL = {'mapbox://styles/mapbox/outdoors-v10?optimize=true'}
          pitchEnabled = {false}
          rotateEnabled = {false}>
            <MapboxGL.Camera
              zoomLevel = {13}
              maxZoomLevel = {16}
              animationMode ={'flyTo'}
              animationDuration = {1000}
              followUserLocation = {true}>
            </MapboxGL.Camera>
       
              {currentLocation &&
              <MapboxGL.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                tracksViewChanges={false}
                coordinate={[currentLocation.coords.longitude, currentLocation.coords.latitude]}>
                <TouchableOpacity style = {{alignItems: "center"}}>
                  <Text style = {{fontSize: 15, position: 'absolute', top: -5, zIndex: 2}}>👑</Text>
                  <Text style = {{fontSize: 30}}>🐶</Text>
                </TouchableOpacity>
              </MapboxGL.PointAnnotation>}
              {livePosts.map((post) => {
                return(
                  <MapboxGL.PointAnnotation
                    key = {post._id}
                    id = {post._id}
                    tracksViewChanges={false}
                    coordinate={[post.latitude, post.longitude]}
                    anchor = {{x: 0.5, y: 2}}
                    >
                      <ThreadPreview
                        post = {post}
                        setSelectedThread = {setSelectedThread}/>
                  </MapboxGL.PointAnnotation>
                )
              })}
          </MapboxGL.MapView>
      </View>
      <CreateThreadModal
        displayThread = {displayThread}
        currentLocation = {currentLocation}
        setDisplayThread = {setDisplayThread}
        emitThread = {emitThread}/>
      <ThreadView
        displayAllThreads = {displayAllThreads}
        setDisplayAllThreads = {setDisplayAllThreads}/>

      {selectedThread &&
      <ThreadModal
        currentLocation = {currentLocation}
        selectedThread = {selectedThread}
        setSelectedThread = {setSelectedThread}/>}

      <TouchableOpacity
        onPress={() => setDisplayThread(true)}>
        <PostButton />
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => setDisplayAllThreads(true)}>
        <ViewAllThreadButton />
      </TouchableOpacity>
    </View>
  );
}

export default MapView;