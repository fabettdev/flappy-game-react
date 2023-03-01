import React, { useState, useEffect, useRef } from "react";
import './fish.css';
import eventsBus from "../../../utils/eventBus";

function Fish(props) {
    const [state, setState] = useState(
        {
            classIndex: 1,
            translateX: 0,
        }
    )

    const fishRef = useRef(null);
    let isHit = false

    useEffect(() => {
        //fishHitbox = fishRef.current.getBoundingClientRect()
        eventsBus.on('onSwim', hitCheck)
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
        return () => {
            clearTimeout(timeout);
            eventsBus.remove('onSwim', hitCheck)
        }
    }, [state]);

    function hitCheck(playerHitbox) {
        //console.log(fishRef.current.getBoundingClientRect())
        const { bottom, top, left, right } = playerHitbox
        let verticalHitTop = false
        let verticalHitBottom = false
        let horizontalHit = false
        let borderHit = false
        if (fishRef.current.getBoundingClientRect().x < right) {
            horizontalHit = true
            //console.log('colpito, horizontalHit')
        }
        if (bottom > fishRef.current.getBoundingClientRect().top && top < fishRef.current.getBoundingClientRect().top) {
            verticalHitTop = true
            //console.log('colpito, verticalHitTop')
        }
        if (bottom > fishRef.current.getBoundingClientRect().bottom && top < fishRef.current.getBoundingClientRect().bottom) {
            verticalHitBottom = true
            //console.log('colpito, verticalHitBottom')
        }
        if (top <= 0 || bottom > window.innerHeight) {
            borderHit = true
        }

        if (horizontalHit && verticalHitBottom && verticalHitTop) {
            isHit = true
            console.log('colpito')
        } else if (borderHit) {
            isHit = true
            console.log('uscito dai bordi')
        }
    }

    return (
        <div ref={fishRef} className={`fish ${state.classIndex}`} style={{ right: `${state.translateX}px`, top: parseInt(props.spawnHeight) }}></div>
    )
}

Fish.defaultProps = {
    fishType: 'default',
}

export default Fish;