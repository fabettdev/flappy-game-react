import React, { useRef, useEffect } from 'react';
import './background.css';
import PropTypes from 'prop-types';

function Background(props) {
    const background = useRef(null);
    const midground = useRef(null);

    useEffect(() => {
        if (props.stopAnimation) {
            background.current.style.animationPlayState = "paused";
            midground.current.style.animationPlayState = "paused";
        } else {
            background.current.style.animationPlayState = "running";
            midground.current.style.animationPlayState = "running";
        }
    }, [props.stopAnimation]);

    function onClickPlayerMove() {
        document.dispatchEvent(new CustomEvent('onClickPlayer'))
    }

    return (
        <div className="App" style={{ position: 'relative', height: '100vh' }} onMouseDown={onClickPlayerMove}>
            <div className='background-container'>
                <div ref={background} className='background-css'>
                    <div ref={midground} className='midground-css'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div >
    )
}

Background.propTypes = {
    stopAnimation: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
}

export default Background;