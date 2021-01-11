import React, { useState } from 'react';

//css
import './FullPostComment.css';

//icons
import { FaChevronUp, FaChevronDown, FaCommentAlt, FaFlag } from 'react-icons/fa';

//functions
import { convertDeltaMilisToTime } from '../../../../functions_global/date';
import { createCommentQuery } from '../../../../functions_global/queries';
import { postRequest } from '../../../../functions_global/request';

function FullPostComment(props) {
    const [commentText, onChangeCommentText] = useState("");
    const[replyTextareaVisible, toggleReplyTextareaVisible] = useState(false);

    function createComment(){
        var request = postRequest(
          createCommentQuery(commentText, "james", props.userLocation.latitude, props.userLocation.longitude, props.data.post._id, props.data._id),
            "/graphql"
        );
        fetch(request).then((response) => {
            response.json().then((data) => {
                props.commentThread(data.data.createComment);
                toggleReplyTextareaVisible(!replyTextareaVisible);
                props.addNewComment(data.data.createComment, props.data.layer);
            })
        });
    }

    if(!props.isHidden){
        return (
            <div className = "fullPostComment" style ={{paddingLeft: 40*props.data.layer}}>
                <div className = "sideFullPostModal">
                    <div><FaChevronUp/></div>
                    <div className = "voteCounter">2</div>
                    <div><FaChevronDown /></div>
                    <div className = "hideComment" onClick = {() => props.hideComments(props.data._id)}></div>
                </div>
                <div className = "fullBodyPostModal">
                    <div className = "fullBodyPostModalHeader">
                        <i className = "fulBodyPostModalUsername">{props.data.creator}</i>
                        <div className = "fullBodyPostModalTimestamp">{convertDeltaMilisToTime(props.data.date)} ago</div>
                    </div>
                    <div className = "fullBodyPostModalDescription">
                        {props.data.description}
                    </div>
                    <div className = "fullBodyPostModalMenu">
                        <div className = "fullBodyPostModalMenuBtn" onClick = {() => toggleReplyTextareaVisible(!replyTextareaVisible)}>
                            <FaCommentAlt
                                style ={{paddingRight: 5}}/>
                            Reply
                        </div>
                        <div className = "fullBodyPostModalMenuBtn">
                        <FaFlag
                            style ={{paddingRight: 5}}/>
                        Report
                        </div>
                    </div>
                    {(props.data.childComments[0] && !props.data.childComments[0].date) &&
                        <div
                            className = "loadmoreComment"
                            onClick = {() => props.loadMoreComments(props.data._id, props.data.layer)}>
                            Load more
                        </div>}
                    {replyTextareaVisible &&
                    <div className = "commentTextareaContainer">
                        <textarea
                            className = "commentTextarea"
                            placeholder = "Comment..."
                            onChange = {e => onChangeCommentText(e.target.value)}/>
                            <div className = "commentBtn" onClick = {() => createComment()}>REPLY</div>
                    </div>}
                </div>
            </div>
        );
    }
    else{
        return(
            <div className = "fullPostComment" style ={{paddingLeft: 40*props.data.layer}}>
                <div className = "sideFullPostModal">
                    <div className = "hideComment" onClick = {() => props.hideComments(props.data._id)}></div>
                </div>
                <div className = "fullBodyPostModal">
                    <div className = "fullBodyPostModalHeader">
                        <i className = "fulBodyPostModalUsername">{props.data.creator}</i>
                        <div className = "fullBodyPostModalTimestamp">{convertDeltaMilisToTime(props.data.date)} ago</div>
                    </div>
                </div>
            </div>
        ) 
    }
  }

export default FullPostComment;