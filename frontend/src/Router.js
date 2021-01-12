import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import MapView from './view_map/MapView';
import MessageView from './view_message/MessageView';
import ForumView from './view_forum/ForumView';
import LoginView from './view_auth/view_login/LoginView';
import RegisterView from './view_auth/view_register/RegisterView';
import { AuthProvider } from './view_auth/Auth';
import PrivateRoute from './view_auth/PrivateRoute';

function Router(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Route exact path = "/login" component = {LoginView} />
                <Route exact path = "/register" component = {RegisterView} />
                <Route exact path = "/map" component = {MapView} />
                <PrivateRoute exact path = "/message" component = {MessageView} />
                <PrivateRoute exact path = "/forum" component = {ForumView} />
                <Route exact path = "/" component = {LoginView} />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Router;