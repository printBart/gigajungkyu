import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import MapView from './view_map/MapView';
import MessageView from './view_message/MessageView';
import ForumView from './view_forum/ForumView';
import AuthenticationView from './view_auth/AuthenticationView'

function Router(){
    return(
        <BrowserRouter>
            <Route exact path = "/map" component = {MapView} />
            <Route exact path = "/message" component = {MessageView} />
            <Route exact path = "/forum" component = {ForumView} />
            <Route exact path = "/auth" component = {AuthenticationView} />
            <Route exact path = "/" component = {AuthenticationView} />
        </BrowserRouter>
    )
}

export default Router;