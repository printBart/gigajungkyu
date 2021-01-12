import React from 'react';

//css
import './CreatePostIndicator.css';

//icons
import { FiEdit } from 'react-icons/fi';

function CreatePostIndicator(props) {  
    return (
        <div
            className = "createThreadPopup"
            onClick = {props.toggleModal}>
            <FiEdit/> &nbsp;
            <b>
                Create Post
            </b>
        </div>
    );
  }

export default CreatePostIndicator;