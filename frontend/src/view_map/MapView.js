import ReactMapGL, { NavigationControl, Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import React, { useState, useEffect } from 'react';

//icons
import { FiEdit } from 'react-icons/fi';

//css
import './MapView.css';

//mock data
import mock_user_data from './mock_user_data.json';

//functions
import { postRequest } from '../functions_global/request';
import { createPostQuery, getAllPostsQuery } from '../functions_global/queries';

//components
import Emoji from '../components_global/Emoji/Emoji';
import FullPostModal from './components_view_map/FullPostModal/FullPostModal';
import CreatePostPopup from './components_view_map/CreatePostPopup/CreatePostPopup';

function MapView(){
    //state
    const [viewport, setViewport] = useState({
        longitude: -123.2460,
        latitude: 49.2606,
        zoom: 13
    });

    //markers
    const [userport, setUserport] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [posts, setPosts] = useState(null);

    //modals
    const [createThreadModalVisible, toggleCreateThreadModal] = useState(false);
    const [fullPostModalVisible, toggleFullPostModal] = useState(false);
    const [selectedFullPostModalId, setSelectedFullPostModalId] = useState(null);

    //create thread
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');




    //on mount
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setViewport({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 13
            });
        });
        getAllPosts();
        navigator.geolocation.watchPosition((position) => {
            setUserport({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
            (error) => console.log(error),
        );
    }, []);

    //toggle create thread modal
    function toggleModal(e){
        if(e){
            e.preventDefault();
        }
        setViewport({
            latitude: userport.latitude,
            longitude: userport.longitude,
            zoom: viewport.zoom,
        });
        toggleCreateThreadModal(!createThreadModalVisible)
    }

    //toggling full post modal
    function updateFullPostModal(post){
        //console.log("latitude: " + post.latitude + " longitude: " + post.longitude);
        if(post && post.latitude && post.longitude){
            setViewport({
                latitude: post.latitude,
                longitude: post.longitude,
                zoom: 15
            });
            setSelectedFullPostModalId(post);
        }
        else{
            setSelectedFullPostModalId(null);
        }
        toggleFullPostModal(!fullPostModalVisible);
    }

    //input on change title
    function onChangeTitle(value){
        setTitle(value);
    }

    //input on change title
    function onChangeDescription(value){
        setDescription(value);
    }

    //onclick create post
    function post(e){
        e.preventDefault();
        var request = postRequest(
            createPostQuery(title, description, "chen", userport.latitude, userport.longitude, new Date()),
            "/graphql"
        );
        fetch(request).then((response) => {
            response.json().then((data) => {
                toggleModal();
                setPosts(prevPosts => [...prevPosts, data.data.createPost]);
            })
        });
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

    if(userport){
        return(
            <div>
                {fullPostModalVisible &&
                    <FullPostModal
                        toggleModal = {updateFullPostModal}
                        postData = {selectedFullPostModalId}/>}
                <ReactMapGL
                    {...viewport}
                    width="100vw"
                    height="100vh"
                    mapStyle="mapbox://styles/mapbox/outdoors-v11"
                    mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_API_KEY}
                    onViewportChange={nextViewport => setViewport(nextViewport)}>
                    <div style={{position: 'absolute', right: 0, bottom: 0}}>
                        <NavigationControl />
                    </div>
                    {posts && posts.map((post, index) => {
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
                                    <div className = "postPopup">
                                        <div className = "postPopupCreator">
                                            {post.creator}
                                        </div>
                                        <b className = "postPopupTitle">
                                            {post.title}
                                        </b><br/>
                                        <div className = "postPopupDescription">
                                            {post.description}
                                        </div>
                                    </div>
                                </Popup>
                            </div>
                        );
                    })}
                    <Marker
                        latitude = {userport.latitude}
                        longitude = {userport.longitude}>
                        <Emoji
                            symbol = "🐻"
                            label = "engineering"/>
                    </Marker>
                    <div className = "createThreadPopupContainer">
                        <Popup
                            latitude = {userport.latitude}
                            longitude = {userport.longitude}
                            closeButton={false}
                            dynamicPosition={false}
                            anchor="top"
                            offsetTop={25}
                            offsetLeft={10}>
                            <div
                                className = "createThreadPopup"
                                onClick = {toggleModal}>
                                <FiEdit/> &nbsp;
                                <b>
                                    Create Post
                                </b>
                            </div>
                        </Popup>
                    </div>
                    {createThreadModalVisible &&
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
                                toggleModal = {toggleModal}
                                post = {post}
                                onChangeTitle = {onChangeTitle}
                                onChangeDescription = {onChangeDescription}/>
                        </Popup>
                        </div>
                    }
                    
                    {mock_user_data.map((marker, index) => {
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
                                        zoom: 15
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
                    {selectedMarker &&
                        <Popup
                            latitude = {selectedMarker.latitude}
                            longitude = {selectedMarker.longitude}
                            onClose = {() => {
                                setSelectedMarker(null);
                            }}>
                            <div>
                                <b>Chen Wang</b>
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