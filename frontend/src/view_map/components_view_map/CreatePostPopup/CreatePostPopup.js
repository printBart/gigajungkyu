import React, {useEffect, useRef} from 'react';
import Emoji from '../../../components_global/Emoji/Emoji';
import './CreatePostPopup.css';

function CreatePostPopup(props) {
    const titleInput = useRef(null);

    //focus on title
    useEffect(() => {
        titleInput.current.focus();
    }, []);

    return (
      <div className = "createPostPopup">
        <div className = "emojiPickerContainer">
            <div className = "emojiClickContainer">
                <Emoji
                    symbol = "😀"
                    label = "Grinning Face"/>
            </div>
            <div className = "emojiClickContainer">
                <Emoji
                    symbol = "😃"
                    label = "Grinning Face with Big Eyes"/>
            </div>
            <div className = "emojiClickContainer">
                <Emoji
                    symbol = "😄"
                    label = "Grinning Face with Smiling Eyes"/>
            </div>
            <div className = "emojiClickContainer">
                <Emoji
                    symbol = "😣"
                    label = "Persevering Face"/>
            </div>
            <div className = "emojiClickContainer">
                <Emoji
                    symbol = "😚"
                    label = "Kissing Face with Closed Eyes"/>
            </div>
            <div className = "emojiClickContainer">
                <Emoji
                    symbol = "😝"
                    label = "Squinting Face with Tongue"/>
            </div>
            <div className = "emojiClickContainer">
                <Emoji
                    symbol = "🤝"
                    label = "Handshake"/>
            </div>
            <div className = "emojiClickContainer">
                <Emoji
                    symbol = "👏"
                    label = "Clapping Hands"/>
            </div>
        </div>
        <div className = "createPostPopupInputsContainer">
            <input
                ref = {titleInput}
                className = "createPostTitleInput"
                placeholder = "Title"
                onChange = {e => props.onChangeTitle(e.target.value)}/>
            <textarea
                className = "createPostDescriptionInput"
                placeholder = "Description"
                onChange = {e => props.onChangeDescription(e.target.value)}/>
            <div className = "createPostPopupFooter">
                <div className = "createPostPopupFooterBtn cancel"
                    onClick = {props.toggleModal}>Cancel</div>
                <div
                    className = "createPostPopupFooterBtn post"
                    onClick = {props.post}>Post</div>
            </div>
        </div>
      </div>
    );
  }

export default CreatePostPopup;