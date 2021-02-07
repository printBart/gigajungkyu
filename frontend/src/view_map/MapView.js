import ReactMapGL, { NavigationControl, Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { isNightmode } from "../functions_global/date";
import io from 'socket.io-client';

//firebase
import app from "../base";

//css
import './MapView.css';

//mock data
import mock_user_data from './mock_user_data.json';

//functions
import { postRequest } from '../functions_global/request';
import { getAllPostsQuery, getUserByTokenQuery } from '../functions_global/queries';

//components
import Emoji from '../components_global/Emoji/Emoji';
import FullPostModal from './components_view_map/FullPostModal/FullPostModal';
import CreatePostPopup from './components_view_map/CreatePostPopup/CreatePostPopup';
import PostMarker from './components_view_map/PostMarker/PostMarker';
import CreatePostIndicator from './components_view_map/CreatePostIndicator/CreatePostIndicator';

let socket;

function MapView(){
    const history = useHistory();
    //state
    const [viewport, setViewport] = useState({
        longitude: -123.2460,
        latitude: 49.2606,
        zoom: 13,
    });

    //markers
    const [userport, setUserport] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [posts, setPosts] = useState(null);
    const [recentComments, setRecentComments] = useState([]);
    const [createThreadMarker, setCreateThreadMarker] = useState({longitude: null, latitude: null});

    //modals
    const [createThreadModalVisible, toggleCreateThreadModal] = useState(false);
    const [fullPostModalVisible, toggleFullPostModal] = useState(false);
    const [selectedFullPostModalId, setSelectedFullPostModalId] = useState(null);

    //userdata
    const [user, updateUserData] = useState(null);
    const [currentUsers, updateCurrentUsers] = useState([]);

    //create thread
    const[title, setTitle] = useState('');
    const [emoji, setEmoji] = useState("grinning-face");
    const[description, setDescription] = useState('');




    //on mount
    useEffect(() => {
        getUserInfo();
        //set socket
        socket = io('http://localhost:8080');
        socket.on('getAllPosts', (posts) => {
            setPosts(posts);
        });
        socket.on('displayCreatedComment', (comment) => {
            if(!isNightmode()){
                setRecentComments(oldArray => [...oldArray, comment]);
                setTimeout(() =>{
                    setRecentComments(recentComments => recentComments.filter(recentComment => recentComment._id !== comment._id));
                }, 5000);
            }
        })

        socket.on('displayCurrentUsers', (onlineUsers) => {
            updateCurrentUsers(onlineUsers);
        })

        //set navigation
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                setViewport({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    zoom: 13
                });
                setCreateThreadMarker({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            });
            //get all posts
            getAllPosts();
            navigator.geolocation.watchPosition((position) => {
                sendUserLocation(position.coords.longitude, position.coords.latitude);
                console.log("User location sent from client side :3")
                setUserport({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    zoom: viewport.zoom
                });
            },
                (error) => console.log(error),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

     //input on change title
     function onChangeTitle(value){
        setTitle(value);
    }

    //input on change title
    function onChangeDescription(value){
        setDescription(value);
    }

    //toggle create thread modal
    function toggleModal(e){
        if(e){
            e.preventDefault();
        }
        if(userport){
            setViewport({
                latitude: userport.latitude,
                longitude: userport.longitude,
                zoom: viewport.zoom,
            });
        }
        if(isNightmode()){
            setCreateThreadMarker({
                longitude: userport.longitude,
                latitude: userport.latitude,
            })
        }
        toggleCreateThreadModal(!createThreadModalVisible)
    }

    //toggling full post modal
    function updateFullPostModal(post){
        if(post && post.latitude && post.longitude){
            setViewport({
                latitude: post.latitude,
                longitude: post.longitude,
                zoom: viewport.zoom
            });
            setSelectedFullPostModalId(post);
        }
        else{
            setSelectedFullPostModalId(null);
        }
        toggleFullPostModal(!fullPostModalVisible);
    }

    //onclick create post
    function post(e){
        e.preventDefault();
        socket.emit('postThread', {
            title,
            description,
            creator: app.auth().currentUser.uid,
            longitude: isNightmode() ? createThreadMarker.longitude : userport.longitude,
            latitude: isNightmode() ? createThreadMarker.latitude : userport.latitude,
            emoji,
            date: new Date(),
            isNightmode: isNightmode()
        });
        toggleCreateThreadModal(false);
    }

    function commentThread(commentData){
        socket.emit('commentThread', commentData);
    }

    function sendUserLocation(longitude, latitude){
        socket.emit('sendUserLocation', {
           userToken: app.auth().currentUser.uid,
           longitude,
           latitude,
        })
    }

    function getAllPosts(){
        var request = postRequest(
           getAllPostsQuery(),
            "/graphql"
        );
        fetch(request).then((response) => {
            response.json().then((data) => {
                setPosts(data.data.getAllPosts);
            })
        });
    }

    function getUserInfo(){
        if(app.auth().currentUser){
            let token = app.auth().currentUser.uid
            var request = postRequest(
                getUserByTokenQuery(token),
                "/graphql"
            );
            fetch(request).then((response) => {
                response.json().then((data) => {
                    updateUserData(data.data.getUserByToken)
                })
            })
        }
        else{
            history.push("/login");
        }
    }

    function onCreateThreadMarkerDragEnd(event){
        setCreateThreadMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
    }

    if(userport){
        return(
            <div>
                {fullPostModalVisible &&
                    <FullPostModal
                        userport = {userport}
                        toggleModal = {updateFullPostModal}
                        commentThread = {commentThread}
                        postData = {selectedFullPostModalId}/>}
                <ReactMapGL
                    {...viewport}
                    width="100vw"
                    height="100vh"
                    mapStyle={isNightmode() ? 'mapbox://styles/mapbox/dark-v10?optimize=true' : 'mapbox://styles/mapbox/outdoors-v10?optimize=true'}
                    mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_API_KEY}
                    onViewportChange={nextViewport => setViewport(nextViewport)}>
                    <div style={{position: 'absolute', right: 0, bottom: 0}}>
                        <NavigationControl />
                    </div>
                    {posts && posts.map((post, index) => { //all post markers
                        return(
                            <div key = {index} onClick = {() => updateFullPostModal(post)}>
                                <Popup
                                    latitude = {post.latitude}
                                    longitude = {post.longitude}
                                    closeButton={false}
                                    dynamicPosition={false}
                                    anchor="bottom" 
                                    offsetLeft = {10}
                                    className = "postPopupContainer">
                                    <PostMarker
                                        postData = {post}/>
                                </Popup>
                            </div>
                        );
                    })}
                    {recentComments && recentComments.map((comment, index) => { //recent comments
                        return(
                            <div key = {index} onClick = {() => updateFullPostModal(comment.post)}>
                                <Popup
                                    latitude = {comment.latitude}
                                    longitude = {comment.longitude}
                                    closeButton={false}
                                    dynamicPosition={false}
                                    anchor="bottom" 
                                    offsetLeft = {10}
                                    className = "postPopupContainer">
                                        <div className = "commentPostMarkerDisplay">{comment.post.title}</div>
                                        <PostMarker
                                            postData = {comment}/>
                                </Popup>
                            </div>
                        )
                    })}
                    {currentUsers.map((user, index) => { //current users
                        if(isNightmode() && user.token === app.auth().currentUser.uid || !isNightmode()){
                            return(
                                <div
                                    key = {index}
                                    onClick = {e => {
                                        e.preventDefault();
                                        setSelectedMarker(user);
                                        setViewport({
                                            longitude: user.longitude,
                                            latitude: user.latitude,
                                            transitionDuration: 500,
                                            transitionInterpolator: new FlyToInterpolator(),
                                            zoom: viewport.zoom
                                        });
                                    }}>
                                <Marker
                                    key = {user._id}
                                    longitude = {user.longitude}
                                    latitude = {user.latitude}>
                                        {user.faculty === "engineering" ?
                                            <Emoji
                                                symbol = "🐻"
                                                label = "engineering"/>:
                                        user.faculty === "business" ? 
                                            <Emoji
                                                symbol = "🐍"
                                                label = "business" />:
                                        user.faculty === "arts" ?
                                            <Emoji
                                                symbol = "🐶"
                                                label = "arts" />:
                                        user.faculty === "forestry" ? 
                                            <Emoji
                                                symbol = "🐢"
                                                label = "forestry" />:
                                            <Emoji
                                                symbol = "🦦"
                                                label = "other" />
                                        }
                                </Marker>
                                </div>
                            )
                        }
                        else{
                            return null;
                        }
                    })}
                    <div className = "createThreadPopupContainer">
                        <Popup
                            latitude = {userport.latitude}
                            longitude = {userport.longitude}
                            closeButton={false}
                            dynamicPosition={false}
                            anchor="top"
                            offsetTop={25}
                            offsetLeft={10}>
                                <CreatePostIndicator
                                    toggleModal = {toggleModal}/>
                        </Popup>
                    </div>
                    {createThreadModalVisible && isNightmode() ? //create thread
                        <div>
                            <Marker
                                longitude = {createThreadMarker.longitude}
                                latitude = {createThreadMarker.latitude}
                                anchor = "bottom"
                                closeButton={false}
                                dynamicPosition={false}
                                offsetLeft={-150}
                                offsetTop = {-230}
                                draggable
                                onDragEnd = {onCreateThreadMarkerDragEnd}
                                className = "nightmodeCreatThreadPopupContainer">
                                    <CreatePostPopup
                                        emoji = {emoji}
                                        setEmoji = {setEmoji}
                                        toggleModal = {toggleModal}
                                        post = {post}
                                        onChangeTitle = {onChangeTitle}
                                        onChangeDescription = {onChangeDescription}/>
                            </Marker>
                            
                        </div>: createThreadModalVisible ?
                        <div>
                            <Popup
                            latitude = {userport.latitude}
                            longitude = {userport.longitude}
                            closeButton={false}
                            dynamicPosition={false}
                            anchor="bottom"
                            offsetLeft={10}
                            className = "createPostPopupContainer">
                                <CreatePostPopup
                                    emoji = {emoji}
                                    setEmoji = {setEmoji}
                                    toggleModal = {toggleModal}
                                    post = {post}
                                    onChangeTitle = {onChangeTitle}
                                    onChangeDescription = {onChangeDescription}/>
                            </Popup>
                        </div> : null
                    }
                    
                    {mock_user_data.map((marker, index) => { //mock data users
                        return(
                            <div
                                key = {index}
                                onClick = {e => {
                                    e.preventDefault();
                                    setSelectedMarker(marker);
                                    setViewport({
                                        longitude: marker.longitude,
                                        latitude: marker.latitude,
                                        transitionDuration: 500,
                                        transitionInterpolator: new FlyToInterpolator(),
                                        zoom: viewport.zoom
                                    });
                                }}>
                                <Marker
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                    offsetLeft={-10}>
                                    {marker.faculty === "engineering" ?
                                        <Emoji
                                            symbol = "🐻"
                                            label = "engineering"/>:
                                    marker.faculty === "business" ? 
                                        <Emoji
                                            symbol = "🐍"
                                            label = "business" />:
                                    marker.faculty === "arts" ?
                                        <Emoji
                                            symbol = "🐶"
                                            label = "arts" />:
                                    marker.faculty === "forestry" ? 
                                        <Emoji
                                            symbol = "🐢"
                                            label = "forestry" />:
                                        <Emoji
                                            symbol = "🦦"
                                            label = "other" />
                                    }
                                </Marker>  
                            </div>   
                        )
                    })}
                    {selectedMarker && //mock data user popup
                        <Popup
                            latitude = {selectedMarker.latitude}
                            longitude = {selectedMarker.longitude}
                            offsetLeft = {10}
                            onClose = {() => {
                                setSelectedMarker(null);
                            }}>
                            <div>
                                <b>{selectedMarker.username}</b>
                                <p>Faculty: {selectedMarker.faculty}</p>
                                <p>{userport.longitude}</p>
                            </div>
                        </Popup>
                    }
                </ReactMapGL>
            </div>
        )
    }
    else{
        return null
    }
}

export default MapView;