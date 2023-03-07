import React, { useState, useEffect, useRef } from "react";
import './playerContainer.css';
import Player from "../player/Player";
import eventsBus from "../../../utils/eventBus";
import { jumpEffect } from "../../../utils/audioUtils";

function PlayerContainer(props) {
    let timeout = null;
    const playerContainerRef = useRef(null);

    const [state, setState] = useState(
        {
            translatePlayerY: 50,
        }
    )

    useEffect(() => {
        document.addEventListener('onSwim', (e) => {
            e.stopImmediatePropagation();
            hitCheck(e.detail)
        });
        document.addEventListener('onClickPlayer', playerUp);
        timeout = setInterval(() => {
            setState(prevState => (
                {
                    ...state,
                    translatePlayerY: props.hasStarted || props.gameOver ? prevState.translatePlayerY + 5 : state.translatePlayerY,
                }
            ))
        }, 70)

        return () => {
            document.removeEventListener('onSwim', hitCheck);
            document.removeEventListener('onClickPlayer', playerUp);
            clearInterval(timeout);
        }
    }, [state]);

    function playerUp() {
        if (!!props.gameOver && !props.hasStarted) return;
        if (!props.hasStarted && !props.gameOver) props.startFunc();

        setState(prevState => (
            {
                ...state,
                translatePlayerY: prevState.translatePlayerY - 25,
            }
        ))
        jumpEffect()
    }

    function hitCheck(containerHitbox) {
        const { bottom: playerBottom, top: playerTop, right: playerRight, left: playerLeft } = playerContainerRef.current.getBoundingClientRect();
        const { bottom: topDivBottom, right: topDivRight, left: topDivLeft } = containerHitbox.topDiv;
        const { top: bottomDivTop, right: bottomDivRight, left: bottomDivLeft } = containerHitbox.bottomDiv;
        const containerId = containerHitbox.id;
        let verticalHitTop = false
        let verticalHitBottom = false
        let horizontalHit = false
        let borderHit = false

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

        if ((horizontalHit && verticalHitBottom) || (horizontalHit && verticalHitTop) || borderHit) {
            props.gameOverFunc();
        }

        if (topDivRight < playerLeft && !props.gameOver) {
            props.scoreFunction(containerId);
        }
    }

    return (
        <div ref={playerContainerRef} className="player-container" style={{
            top: `${state.translatePlayerY}%`,
            transition: 'top 0.3s ease-out',
            transform: 'translateY(-50%)',
        }}>
            {!!props.hasStarted && <Player frames={7} action={'swim'} />}
            {!props.hasStarted && !props.gameOver && <Player frames={6} action={'idle'} />}
            {!!props.gameOver && <Player frames={5} action={'hurt'} />}
        </div>
    )
}

export default PlayerContainer;