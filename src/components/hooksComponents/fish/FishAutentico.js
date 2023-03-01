import React, { useState, useEffect } from "react";
import './fishAut.css';

function FishAutentico(props) {
    const [state, setState] = useState(
        {
            classIndex: 1,
        }
    )

    useEffect(() => {
        let newIndex = null;
        state.classIndex === 4 ? newIndex = 1 : newIndex = state.classIndex + 1;
        const timeout = setTimeout(() => {
            setState(
                {
                    classIndex: newIndex,
                }
            )
        }, 150)
        return () => clearTimeout(timeout);
    }, [state.classIndex]);

    return (
        <div className={`fish ${props.fishType}${state.classIndex}`} style={props.fishStyle}></div>
    )
}

FishAutentico.defaultProps = {
    fishType: 'default',
}

export default FishAutentico;