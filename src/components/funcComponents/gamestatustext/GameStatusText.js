import React from 'react';
import './gamestatustext.css';
import PropTypes from 'prop-types';

function GameStatusText(props) {
    return <span className={`game-status-text ${props.size} ${props.color}`}>{props.label.toUpperCase()}</span>
}

GameStatusText.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
}

export default GameStatusText;