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

  //unsorted tree comments (raw)
  const[treeComments, setTreeComments] = useState([]);

  //list of sorted comments
  const[comments, setComments] = useState([]);

  //list of all hidden comments
  const[hiddenComments, setHiddeComments] = useState([]);

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
        setTreeComments(data.data.getAllCommentsByPostId);
        sortTraversedComments(data.data.getAllCommentsByPostId);
        //inOrderTraversal(data.data.getAllCommentsByPostId, 0);
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
          data.data.createComment.layer = 0;
          setComments(oldComments => [...oldComments, data.data.createComment]);
        })
    });
  }

  function hideComments(nodeId){
    const nodeExists = hiddenComments.some(comment => comment === nodeId);
    if(nodeExists){
      setHiddeComments(hiddenComments.filter(comment => comment !== nodeId));
    } else{
      setHiddeComments(oldArray => [...oldArray, nodeId]);
    }
  }

  useEffect(() => {
    sortTraversedComments(treeComments);
  }, [hiddenComments])

  function sortTraversedComments(nodes){
    const result = [];
    inOrderTraversal(nodes, 0, result);
    setComments(result);
  }

  function inOrderTraversal(nodes, layerCount, result){
    if(nodes){
      nodes.forEach(function(node){
        if(node && hiddenComments.indexOf(node._id)<0){
        //if(node && node._id !== hiddenNodeId){
          node.layer = layerCount;
          result.push(node);
          //setComments(oldArr => [...oldArr, node]);
          inOrderTraversal(node.childComments, layerCount+1, result);
        }
        else{
          node.layer = layerCount;
          result.push(node);
          //setComments(oldArr => [...oldArr, node]);
        }
      });
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
              addNewComment = {addNewComment}
              hideComments = {hideComments}/>
          )
        })}
      </div>
    </div>
  );
}

export default FullPostModal;