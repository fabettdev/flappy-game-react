import React, { useState, useEffect, useRef } from "react";
import './player.css';
import eventsBus from "../../../utils/eventBus";
// import Spritesheet from 'react-responsive-spritesheet';

function Player() {
    let timeout = null;
    const playerRef = useRef(null);

    const [state, setState] = useState(
        {
            classIndex: 1,
            translatePlayerY: 50,
        }
    )

    useEffect(() => {
        eventsBus.on('onSwim', hitCheck)
        eventsBus.on('onClickPlayer', playerUp);
        let newIndex = null;
        state.classIndex === 7 ? newIndex = 1 : newIndex = state.classIndex + 1;
        timeout = setInterval(() => {
            setState(prevState => (
                {
                    ...state,
                    classIndex: newIndex,
                    translatePlayerY: prevState.translatePlayerY + 5,
                }
            ))
        }, 70)
        return () => {
            eventsBus.remove('onClickPlayer', playerUp);
            eventsBus.remove('onSwim', hitCheck);
            clearInterval(timeout);
        }
    }, [state.classIndex]);

    function playerUp() {
        setState(prevState => (
            {
                ...state,
                translatePlayerY: prevState.translatePlayerY - 40,
            }
        ))
    }

    function hitCheck(containerHitbox) {
        const { bottom: playerBottom, top: playerTop, right: playerRight, left: playerLeft } = playerRef.current.getBoundingClientRect();
        const { bottom: topDivBottom, right: topDivRight, left: topDivLeft } = containerHitbox.topDiv;
        const { top: bottomDivTop, right: bottomDivRight, left: bottomDivLeft } = containerHitbox.bottomDiv;

        let verticalHitTop = false
        let verticalHitBottom = false
        let horizontalHit = false
        let borderHit = false
        let isHit = false

        // Controllo player esce dai bordi
        if (playerTop <= 0 || playerBottom > window.innerHeight) {
            borderHit = true
        }

        // Controllo player supera orizzontalmente il div
        if (topDivLeft < playerRight || bottomDivLeft < playerRight) {
            // Controllo player ha già superato il div
            if (playerLeft < topDivRight || playerLeft < bottomDivRight)
                horizontalHit = true
        }

        // Controllo player è alla stessa altezza del div superiore
        if (playerTop < topDivBottom) {
            verticalHitTop = true
        }

        // Controllo player è alla stessa altezza del div inferiore
        if (playerBottom > bottomDivTop) {
            verticalHitBottom = true
        }

        if ((horizontalHit && verticalHitBottom) || (horizontalHit && verticalHitTop)) {
            isHit = true
            console.log('colpito')
        } else if (borderHit) {
            isHit = true
            console.log('uscito dai bordi')
        }
    }

    return (
        <div ref={playerRef} className={`player swim${state.classIndex}`} style={{
            top: `${state.translatePlayerY}%`,
            transition: 'top 0.3s ease-out',
            transform: 'translateY(-50%)',
        }}></div>
    )
}

export default Player;