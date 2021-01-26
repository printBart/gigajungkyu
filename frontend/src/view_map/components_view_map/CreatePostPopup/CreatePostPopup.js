import React, {useEffect, useRef} from 'react';
import Emoji from '../../../components_global/Emoji/Emoji';

//css
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
            <div className = "emojiClickContainer" onClick = {() => props.setEmoji("grinning-face")}>
                <Emoji
                    symbol = "😀"
                    label = "Grinning Face"/>
            </div>
            <div className = "emojiClickContainer" onClick = {() => props.setEmoji("grinning-face-with-big-eyes")}>
                <Emoji
                    symbol = "😃"
                    label = "Grinning Face with Big Eyes"/>
            </div>
            <div className = "emojiClickContainer" onClick = {() => props.setEmoji("grinning-face-with-smiling-eyes")}>
                <Emoji
                    symbol = "😄"
                    label = "Grinning Face with Smiling Eyes"/>
            </div>
            <div className = "emojiClickContainer" onClick = {() => props.setEmoji("persevering-face")}>
                <Emoji
                    symbol = "😣"
                    label = "Persevering Face"/>
            </div>
            <div className = "emojiClickContainer" onClick = {() => props.setEmoji("kissing-face-with-closed-eyes")}>
                <Emoji
                    symbol = "😚"
                    label = "Kissing Face with Closed Eyes"/>
            </div>
            <div className = "emojiClickContainer" onClick = {() => props.setEmoji("squinting-face-with-tongue")}>
                <Emoji
                    symbol = "😝"
                    label = "Squinting Face with Tongue"/>
            </div>
            <div className = "emojiClickContainer" onClick = {() => props.setEmoji("handshake")}>
                <Emoji
                    symbol = "🤝"
                    label = "Handshake"/>
            </div>
            <div className = "emojiClickContainer" onClick = {() => props.setEmoji("clapping-hands")}>
                <Emoji
                    symbol = "👏"
                    label = "Clapping Hands"/>
            </div>
        </div>
        <div className = "createPostPopupInputsContainer">
            <div className = "createPostPopupInputsHeader">
                {props.emoji === "grinning-face" ? 
                <div>
                    <Emoji
                        symbol = "😀"
                        label = "Squinting Face with Tongue"/>
                </div>:
                props.emoji === "grinning-face-with-big-eyes" ? 
                <div>
                    <Emoji
                        symbol = "😃"
                        label = "Grinning Face with Big Eyes"/>
                </div>:
                props.emoji === "grinning-face-with-smiling-eyes" ? 
                <div>
                    <Emoji
                        symbol = "😄"
                        label = "Grinning Face with Smiling Eyes"/>
                </div>:
                props.emoji === "persevering-face" ? 
                <div>
                    <Emoji
                    symbol = "😣"
                    label = "Persevering Face"/>
                </div>:
                props.emoji === "kissing-face-with-closed-eyes" ? 
                <div>
                     <Emoji
                        symbol = "😚"
                        label = "Kissing Face with Closed Eyes"/>
                </div>:
                props.emoji === "squinting-face-with-tongue" ? 
                <div>
                    <Emoji
                        symbol = "😝"
                        label = "Squinting Face with Tongue"/>
                </div>:
                props.emoji === "handshake" ? 
                <div>
                    <Emoji
                        symbol = "🤝"
                        label = "Handshake"/>
                </div>:
                <div>
                    <Emoji
                        symbol = "👏"
                        label = "Clapping Hands"/>
                </div>}
                <input
                    ref = {titleInput}
                    className = "createPostTitleInput"
                    placeholder = "Title"
                    onChange = {e => props.onChangeTitle(e.target.value)}/>
            </div>
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