import React from 'react';
const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        style = {props.fontSize ? {fontSize: props.fontSize} :{fontSize: 20}}>
        {props.symbol}
    </span>
);
export default Emoji;