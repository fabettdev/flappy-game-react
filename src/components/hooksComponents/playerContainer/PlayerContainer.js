import React, { Component } from "react";
import './playerContainer.css';
import Player from "../player/Player";
import eventsBus from "../../../utils/eventBus";

function PlayerContainer(props) {
    const playerContainerRef = useRef(null);

    useEffect(() => {
        eventsBus.on('onSwim', hitCheck);
        return () => eventsBus.remove('onSwim', hitCheck);
    }, []);

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
        <div ref={playerContainerRef} className="player-container" style={props.styleCss}>
            {!!props.hasStarted && <Player frames={7} action={'swim'} />}
            {!props.hasStarted && !props.gameOver && <Player frames={6} action={'idle'} />}
            {!!props.gameOver && <Player frames={5} action={'hurt'} />}
        </div>
    )
}

export default PlayerContainer;