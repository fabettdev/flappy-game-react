import React, { useState, useEffect, useRef } from "react";
import './player.css';

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
        // if (props.action === 'hurt' && newIndex === props.frames) return;
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

export default Player;