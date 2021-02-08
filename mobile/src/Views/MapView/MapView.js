import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import MapboxGL from "@react-native-mapbox-gl/maps";
import token from '../../../token.json';

//components
import PostButton from '../../GlobalComponents/PostButton';
import CreateThreadModal from '../../GlobalComponents/CreateThreadModal';


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
  }
});


const MapView = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [displayThread, setDisplayThread] = useState(false);

  
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}>
            <MapboxGL.Camera
              zoomLevel = {13}
              animationMode ={'flyTo'}
              animationDuration = {0}
              followUserLocation = {true}>
            </MapboxGL.Camera>
            <MapboxGL.UserLocation
              visible = {true}
              onUpdate = {(userLocation) => console.log(userLocation)}/>
          </MapboxGL.MapView>
      </View>
      <CreateThreadModal
        displayThread = {displayThread}
        setDisplayThread = {setDisplayThread}/>

      <TouchableOpacity
        onPress={() => setDisplayThread(true)}>
        <PostButton />
      </TouchableOpacity>
    </View>
  );
}

export default MapView;