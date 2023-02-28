import React, { useState, useEffect, useRef } from "react";
import './fish.css';

function Fish() {
    const [state, setState] = useState(
        {
            classIndex: 1,
            translateX: 0,
        }
    )

    const fishRef = useRef(null);

    useEffect(() => {
        // console.log(fishRef.current.getBoundingClientRect())
        let newIndex = null;
        state.classIndex === 4 ? newIndex = 1 : newIndex = state.classIndex + 1;
        const timeout = setTimeout(() => {
            setState(
                {
                    classIndex: newIndex,
                    translateX: state.translateX + 2,
                }
            )
        }, 10)
        return () => clearTimeout(timeout);
    }, [state]);

    return (
        <div ref={fishRef} className={`fish ${state.classIndex}`} style={{ right: `${state.translateX}px` }}></div>
    )
}

Fish.defaultProps = {
    fishType: 'default',
}

export default Fish;