import React, { Component } from 'react';
import app from '../base';

//css
import './MessageView.css';

class MessageView extends Component{
    render(){
        return(
            <div className = "template">
                Message View
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
        )
    }
}

export default MessageView;