import React, {useRef} from 'react';
import './CreateThreadModal.css';

function CreateThreadModal(props) {  
    const modal = useRef(null);

    function onClickModalBackground(event){
        if (modal && !modal.current.contains(event.target)){
            props.toggleModal();
        }
    }

    return (
        <div className = "modalBackground" onMouseDown = {onClickModalBackground}>
            <div className = "createThreadModal" ref = {modal}>
                <h2>Create Post</h2>
                <div>
                    <input
                        className = "createThreadModalTitleInput"
                        placeholder = "Title"
                        onChange = {e => props.onChangeTitle(e.target.value)}/>
                </div>
                <div>
                    <textarea
                        className = "createThreadModalDescriptionInput"
                        placeholder = "Description"
                        onChange = {e => props.onChangeDescription(e.target.value)}/>
                </div>
                <div className = "postButton" onClick = {props.post}>
                    Post
                </div>
            </div>
        </div>
    );
  }

export default CreateThreadModal;