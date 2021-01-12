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
import { createCommentQuery, getAllCommentsByPostIdQuery, getChildCommentsByCommentId } from '../../../functions_global/queries';

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
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //onclick create comment
  function createComment(){
    var request = postRequest(
      createCommentQuery(comment, "james", props.userport.latitude, props.userport.longitude, props.postData._id),
        "/graphql"
    );
    fetch(request).then((response) => {
        response.json().then((data) => {
          props.commentThread(data.data.createComment);
          setComment('');
          data.data.createComment.layer = 0;
          setComments(oldComments => [...oldComments, data.data.createComment]);
        })
    });
  }

  //load more comments
  function loadMoreComments(nodeId, layer){
    var request = postRequest(
      getChildCommentsByCommentId(nodeId),
        "/graphql"
    );
    fetch(request).then((response) => {
        response.json().then((data) => {
          loadTraversedComments(data.data.getChildCommentsByCommentId, layer, nodeId)
        })
    });
  }

  //hide comments
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiddenComments])

  function sortTraversedComments(nodes){
    const result = [];
    inOrderTraversal(nodes, 0, result);
    setComments(result);
  }

  function loadTraversedComments(nodes, layer, parentNodeId){
    const result = []
    inOrderTraversal(nodes, layer, result);
    const parentIndex = comments.findIndex(comment => comment._id === result[0]._id);
    let newComments = [...comments];
    let sliceArr1 = newComments.slice(0,parentIndex);
    let sliceArr2 = newComments.slice(parentIndex+1);
    let combArr = [...sliceArr1, ...result, ...sliceArr2];
    //NOTE: still need to filter out leaf node data
    setComments(combArr);
  }

  function inOrderTraversal(nodes, layerCount, result){
    if(nodes){
      nodes.forEach(function(node){
        if(node && hiddenComments.indexOf(node._id)<0){
          node.layer = layerCount;
          result.push(node);
          inOrderTraversal(node.childComments, layerCount+1, result);
        }
        else{
          node.layer = layerCount;
          result.push(node);
        }
      });
    }
  }

  function addNewComment(newComment, layer){
    const request = postRequest(
      getAllCommentsByPostIdQuery(props.postData._id),
      "/graphql"
    );
    fetch(request).then((response) => {
      response.json().then((data) => {
        setTreeComments(data.data.getAllCommentsByPostId);
        newComment.layer = layer + 1;
        const parentIndex = comments.findIndex(comment => comment._id === newComment.parentComment._id);
        let newComments = [...comments];
        newComments.splice(parentIndex+1, 0, newComment);
        setComments(newComments);
      })
    });
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
          if(comment.date){ //check if its last node
            return (
              <FullPostComment 
                key = {index}
                data = {comment}
                userLocation = {props.userport}
                isHidden = {hiddenComments.indexOf(comment._id)>=0}
                addNewComment = {addNewComment}
                hideComments = {hideComments}
                loadMoreComments = {loadMoreComments}
                commentThread = {props.commentThread}/>
            )
          }
          else{
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default FullPostModal;