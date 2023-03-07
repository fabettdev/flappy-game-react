import React, { useState, useEffect } from "react";
import './player.css';
import PropTypes from 'prop-types';

// import Spritesheet from 'react-responsive-spritesheet';

function Player(props) {
    let timeout = null;

    const [state, setState] = useState(
        {
            classIndex: 1,
        }
    )

    useEffect(() => {
        let newIndex = null;
        state.classIndex === props.frames ? newIndex = 1 : newIndex = state.classIndex + 1;
        timeout = setInterval(() => {
            setState(
                {
                    ...state,
                    classIndex: newIndex,
                }
            )
        }, 70)

        return () => clearInterval(timeout);
    }, [state.classIndex]);

    return (
        <div className={`player ${props.action} ${props.action}${state.classIndex}`}></div>
    )
}

Player.defaultProps = {
    frames: 6,
    action: 'idle',
}

Player.propTypes = {
    frames: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
}

export default Player;