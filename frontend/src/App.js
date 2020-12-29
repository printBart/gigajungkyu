import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MapView from './view_map/MapView';
import MessageView from './view_message/MessageView';
import ForumView from './view_forum/ForumView';
import AuthenticationView from './view_auth/AuthicationView'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
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
}

export default App;