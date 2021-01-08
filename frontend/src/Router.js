import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import MapView from './view_map/MapView';
import MessageView from './view_message/MessageView';
import ForumView from './view_forum/ForumView';
import LoginView from './view_auth/view_login/LoginView';
import RegisterView from './view_auth/view_register/RegisterView';

function Router(){
    return(
        <BrowserRouter>
            <Route exact path = "/login" component = {LoginView} />
            <Route exact path = "/register" component = {RegisterView} />
            <Route exact path = "/map" component = {MapView} />
            <Route exact path = "/message" component = {MessageView} />
            <Route exact path = "/forum" component = {ForumView} />
            <Route exact path = "/" component = {LoginView} />
        </BrowserRouter>
    )
}

export default Router;