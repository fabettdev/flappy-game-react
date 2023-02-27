import React, { useState, useEffect } from "react";
import './player.css';

function Player(props) {
    const [state, setState] = useState(
        {
            classIndex: 1,
        }
    )

    useEffect(() => {
        let newIndex = null;
        state.classIndex === props.posNumber ? newIndex = 1 : newIndex = state.classIndex + 1;
        if (props.action === 'hurt') {
            if (state.classIndex === 5) return () => clearTimeout(timeout);
        }
        const timeout = setTimeout(() => {
            setState(
                {
                    classIndex: newIndex,
                }
            )
        }, 75)
        return () => clearTimeout(timeout);
    }, [state.classIndex]);

    return (
        <div className={`player ${props.action} pos${state.classIndex}`}></div>
    )
}

export default Player;