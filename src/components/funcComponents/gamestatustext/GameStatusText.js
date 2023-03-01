import React from 'react';
import './gamestatustext.css';

function GameStatusText(props) {
    return <span className={`game-status-text ${props.size}`}>{props.label.toUpperCase()}</span>
}

export default GameStatusText;