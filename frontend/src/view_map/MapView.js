import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import React, { useState } from 'react';

//css
import './MapView.css';

//components
import Emoji from '../global_components/Emoji/Emoji';

function MapView(){
    const [viewport, setViewport] = useState({
        longitude: -123.2460,
        latitude: 49.2606,
        zoom: 13
    })

    const [markers] = useState([
        {longitude: -123.2460, latitude: 49.2606},
        {longitude: -123.2460, latitude: 49.2616},
        {longitude: -123.2360, latitude: 49.2616},
    ]);

    //const [currentLocation, setCurrentLocation] = useState({})

    return(
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
            {markers.map((marker, index) => {
                return(
                    <Marker
                        key = {index}
                        latitude={marker.latitude}
                        longitude={marker.longitude}>
                        <Emoji
                            symbol = "🐻"
                            label = "bear"/>
                    </Marker>     
                )
            })}
        </ReactMapGL>
    )
}

export default MapView;