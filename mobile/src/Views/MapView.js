import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';

import MapboxGL from "@react-native-mapbox-gl/maps";
import token from '../../token.json';

//components
import PostButton from '../GlobalComponents/PostButton';


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
    flex: 2.2,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    padding: 20,
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
  const [title, onChangeTitle] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}>
            <MapboxGL.Camera
              zoomLevel = {16}
              animationMode ={'flyTo'}
              animationDuration = {0}
              followUserLocation = {true}>
            </MapboxGL.Camera>
            <MapboxGL.UserLocation
              visible = {true}
              onUpdate = {(userLocation) => console.log(userLocation)}/>
          </MapboxGL.MapView>
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={displayThread}>
        <View style = {{flex: 1}}></View>
        <KeyboardAvoidingView style = {styles.postModal}>
          <SafeAreaView style = {{flex: 1}}>
            <View style ={styles.header}>
            <TouchableOpacity
              onPress={() => setDisplayThread(false)}>
              <Text style = {styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
              <Text style = {styles.postBtn}>Post</Text>
            </View>
            <View style = {styles.body}>
              <TextInput
                style={styles.title}
                onChangeText={text => onChangeTitle(text)}
                value={title}
                placeholder = {"Title"}
                autoFocus={true}
              />
              <TextInput
                style = {styles.description}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => onChangeDescription({text})}
                value={description}
                placeholder = "Write something ...."
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
        <View style = {{flex: 2}}></View>
      </Modal>


      <TouchableOpacity
        onPress={() => setDisplayThread(true)}>
        <PostButton />
      </TouchableOpacity>
    </View>
  );
}

export default MapView;