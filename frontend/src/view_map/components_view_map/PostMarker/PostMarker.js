import React from 'react';

//css
import './PostMarker.css';

//icons
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { MdComment, MdReportProblem } from 'react-icons/md';

//functions
import { convertDeltaMilisToTime } from '../../../functions_global/date';

function PostMarker(props) {
    return (
    <div className = "postMarker">
        <div className = "postMakerSideContainer">
            <FaChevronUp/>
            <div className = "postMarkerVoteValue">83</div>
            <FaChevronDown/>
        </div>
        <div className = "postMakerMainContainer">
            <div className = "postMarkerHeader">
                <div className = "postMarkerCreator">
                    {props.postData.creator}
                </div>
                <div className = "postMarkerDate">
                    {convertDeltaMilisToTime(props.postData.date)} ago
                </div>
            </div>
            <div className = "postMarkerTitle">
                {props.postData.title}
            </div>
            <div className = "postMarkerDescription">
                {props.postData.description}
            </div>
            <div className = "postMarkerFooter">
                <div className = "postMarkerFooterContainer">
                    <MdComment 
                        className = "postMarkerFooterIcon"/>
                    Comments
                </div>
                <div className = "postMarkerFooterContainer">
                    <MdReportProblem
                        className = "postMarkerFooterIcon"/>
                    Report
                </div>
            </div>
        </div>
    </div>
    );
  }

export default PostMarker;