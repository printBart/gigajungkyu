import React, {useRef, useState, useEffect} from 'react';

//css
import './FullPostModal.css';

//icons
import { FaChevronUp, FaChevronDown, FaCommentAlt, FaFlag } from 'react-icons/fa';

//functions
import { convertDeltaMilisToTime } from '../../../functions_global/date';
import { postRequest } from '../../../functions_global/request';

//components
import FullPostComment from './FullPostComment/FullPostComment';
import { createCommentQuery, getAllCommentsByPostIdQuery } from '../../../functions_global/queries';

function FullPostModal(props){ 
  const modal = useRef(null);
  
  //text
  const[comment, setComment] = useState('');

  //list of comments
  const[comments, setComments] = useState([]);

  function onClickModalBackground(event){
    if (modal && !modal.current.contains(event.target)){
      props.toggleModal();
    }
  }

  useEffect(() => {
    var request = postRequest(
      getAllCommentsByPostIdQuery(props.postData._id),
      "/graphql"
    );
    fetch(request).then((response) => {
      response.json().then((data) => {
        inOrderTraversal(data.data.getAllCommentsByPostId, 0);
      })
    })
  }, [])

  //onclick create comment
  function createComment(){
    var request = postRequest(
      createCommentQuery(comment, "james", props.postData.latitude, props.postData.longitude, props.postData._id),
        "/graphql"
    );
    fetch(request).then((response) => {
        response.json().then((data) => {
          setComment('');
          console.log(data);
        })
    });
  }

  function inOrderTraversal(nodes, layerCount){
    if(nodes){
      nodes.forEach(function(node){
        if(node){
          node.layer = layerCount;
          setComments(oldArr => [...oldArr, node]);
          inOrderTraversal(node.childComments, layerCount+1);
        }
        else{
          node.layer = layerCount;
          setComments(oldArr => [...oldArr, node]);
        }
      });
    }
  }

  function inOrderSearchTraversal(nodes, nodeId){
    if(nodes){
      nodes.forEach(function(node){
        if(node){
          if(node._id === nodeId){

          }
          inOrderSearchTraversal(node.childComments);
        }
        else{
          
        }
      })
    }
  }

  function addNewComment(){
    setComments([]);
    var request = postRequest(
      getAllCommentsByPostIdQuery(props.postData._id),
      "/graphql"
    );
    fetch(request).then((response) => {
      response.json().then((data) => {
        console.log(data.data.getAllCommentsByPostId);
        inOrderTraversal(data.data.getAllCommentsByPostId, 0);
      })
    })
  }

  return (
    <div className = "modalBackground" style = {{alignItems: "flex-start"}} onMouseDown = {onClickModalBackground}>
      <div className = "fullPostModal" ref = {modal}>
        <div className = "fullPostThread">
          <div className = "sideFullPostModal">
            <div><FaChevronUp/></div>
            <div className = "voteCounter">50</div>
            <div><FaChevronDown /></div>
          </div>
          <div className = "fullBodyPostModal">
            <div className = "fullBodyPostModalHeader">
              <i className = "fulBodyPostModalUsername">{props.postData.creator}</i>
              <div className = "fullBodyPostModalTimestamp">{convertDeltaMilisToTime(props.postData.date)} ago</div>
            </div>
            <div className = "fullBodyPostModalTitle">
              {props.postData.title}
            </div>
            <div className = "fullBodyPostModalDescription">
              {props.postData.description}
            </div>
            <div className = "fullBodyPostModalMenu">
              <div className = "fullBodyPostModalMenuBtn">
                <FaCommentAlt
                  style ={{paddingRight: 5}}/>
                690 Comments
              </div>
              <div className = "fullBodyPostModalMenuBtn">
                <FaFlag
                  style ={{paddingRight: 5}}/>
                Report
              </div>
            </div>
            <div className = "commentTextareaContainer">
              <textarea
                className = "commentTextarea"
                placeholder = "Comment..."
                value = {comment}
                onChange = {e => setComment(e.target.value)}/> 
                <div className = "commentBtn" onClick = {createComment}>
                  COMMENT
                </div>
            </div>
          </div>
        </div>
        {comments && comments.map((comment, index) => {
          return (
            <FullPostComment 
              key = {index}
              data = {comment}
              addNewComment = {addNewComment}/>
          )
        })}
      </div>
    </div>
  );
}

export default FullPostModal;