import React, { useState, useEffect, useRef } from "react";
import './playerContainer.css';
import Player from "../player/Player";
import { jumpEffect } from "../../../utils/audioUtils";

function PlayerCont(props, ref) {
    let timeout = null;

    const [state, setState] = useState(
        {
            translatePlayerY: 50,
        }
    )

    useEffect(() => {
        document.addEventListener('onClickPlayer', playerUp);
        return () => document.removeEventListener('onClickPlayer', playerUp);
    }, []);

    useEffect(() => {
        timeout = setInterval(() => {
            setState(prevState => (
                {
                    ...state,
                    translatePlayerY: props.hasStarted || props.gameOver ? prevState.translatePlayerY + 5 : state.translatePlayerY,
                }
            ))
        }, 70)

        return () => {
            clearInterval(timeout);
        }
    }, [state.translatePlayerY]);

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

    return (
        <div ref={ref} className="player-container" style={{
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

const PlayerContainer = React.forwardRef(PlayerCont);

export default PlayerContainer;