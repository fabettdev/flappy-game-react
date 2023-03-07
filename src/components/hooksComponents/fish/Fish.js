import React, { useState, useEffect, useRef } from "react";
import './fish.css';
import PropTypes from 'prop-types';

function Fish(props) {
    const [state, setState] = useState(
        {
            classIndex: 1,
        }
    )
    const fishRef = useRef(null);
    let interval = null;

    useEffect(() => {
        let newIndex = null;
        state.classIndex === 4 ? newIndex = 1 : newIndex = state.classIndex + 1;
        interval = setInterval(() => {
            setState(
                {
                    classIndex: newIndex,
                }
            )
        }, 150)
        return () => {
            clearInterval(interval);
        }
    }, [state]);

    return (
        <div ref={fishRef} className={`fish ${props.fishType}${state.classIndex}`} style={props.fishStyle}></div>
    )
}

Fish.defaultProps = {
    fishType: 'default',
}

Fish.propTypes = {
    fishType: PropTypes.string,
    fishStyle: PropTypes.object,
}

export default Fish;