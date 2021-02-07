import React from 'react';

//css
import './PostMarker.css';

//icons
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { MdComment, MdReportProblem } from 'react-icons/md';

//functions
import { convertDeltaMilisToTime } from '../../../functions_global/date';

//components
import Emoji from '../../../components_global/Emoji/Emoji';
import { convertStringtoEmoji } from '../../../functions_global/emoji';

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
                {props.postData.isNightmode ?
                    <div className = "isNightmodePost">
                        <Emoji
                            symbol = "👻"
                            fontSize = {12}
                            label = "ghost"/>
                    </div> : 
                    <div className = "postMarkerCreator">
                        {props.postData.creator.username}
                    </div>
                }
                <div className = "postMarkerDate" style ={props.postData.isNightmode && {paddingLeft: 25}}>
                    {convertDeltaMilisToTime(props.postData.date)} ago
                </div>
            </div>
            <div className = "postMarkerTitle">
                <Emoji
                    symbol = {convertStringtoEmoji(props.postData.emoji)}
                    label = {props.postData.emoji}/>
                {props.postData.title && " " + props.postData.title}
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