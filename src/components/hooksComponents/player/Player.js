import React, { useState, useEffect } from "react";
import './player.css';
// import Spritesheet from 'react-responsive-spritesheet';

function Player(props) {
    const [state, setState] = useState(
        {
            classIndex: 1,
        }
    )

    useEffect(() => {
        let newIndex = null;
        state.classIndex === 7 ? newIndex = 1 : newIndex = state.classIndex + 1;
        const timeout = setTimeout(() => {
            setState(
                {
                    classIndex: newIndex,
                }
            )
        }, 100)
        return () => clearTimeout(timeout);
    }, [state.classIndex]);

    return (
        <div className={`player swim${state.classIndex}`} style={props.playerStyle}></div>
    )
}

export default Player;