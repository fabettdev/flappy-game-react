import React, { useState, useEffect, useRef } from 'react'
import './fish.css'
import Fish from './Fish'
import './enemycontainer.css'
import eventsBus from '../../../utils/eventBus'

// Massimo 9 pesci
// Stato pesci sopra
// Numero random da 1 a 9
// Stato pesci sopra diventa il numero che esce
// Stato pesci sotto diventa numero casuale tra 0 e 9 - pesci sopra)

function EnemyContainer(props) {
    const topDivRef = useRef(null);
    const bottomDivRef = useRef(null);
    let interval = null;
    const maxFishes = 9;

    const [state, setState] = useState({
        upperFishes: [],
        lowerFishes: [],
        translateX: -100,
        id: Math.random(),
    })

    useEffect(() => {
        // useEffect per generare il pillar con i pesci
        const upperFishes = [];
        const lowerFishes = [];
        const upperNum = Math.floor(Math.random() * 9 + 1);
        const lowerNum = Math.floor(Math.random() * (maxFishes - upperNum + 1));
        for (let i = 0; i < upperNum; i++) {
            const fish = <Fish key={`${i}-${Math.random()}`} />;
            upperFishes.push(fish);
        }
        for (let i = 0; i < lowerNum; i++) {
            const fish = <Fish key={`${i}-${Math.random()}`} />;
            lowerFishes.push(fish);
        }
        setState({
            ...state,
            upperFishes,
            lowerFishes
        })
    }, [])

    useEffect(() => {
        // Invio posizione dei div al player tramite evento
        eventsBus.on('onSwim', hitCheck)
        // Intervallo per muovere il div
        interval = setInterval(() => {
            setState(
                {
                    ...state,
                    translateX: state.translateX + 2,
                }
            )
        }, 10)
        return () => {
            eventsBus.remove('onSwim', hitCheck)
            clearInterval(interval);
        }
    }, [state]);

    function hitCheck(playerHitbox) {
        const { bottom: playerBottom, top: playerTop, right: playerRight, left: playerLeft } = playerHitbox;
        if (!topDivRef.current && !bottomDivRef.current) return;
        const { bottom: topDivBottom, right: topDivRight, left: topDivLeft } = topDivRef.current.getBoundingClientRect();
        const { top: bottomDivTop, right: bottomDivRight, left: bottomDivLeft } = bottomDivRef.current.getBoundingClientRect();
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
            props.scoreFunction(state.id)
        }
    }

    return (
        <div className='pillars-container' style={{ right: `${state.translateX}px` }}>
            <div ref={topDivRef} className='enemy-pillar-top'>
                {state.upperFishes.map(fish => fish)}
            </div>
            <div ref={bottomDivRef} className='enemy-pillar-bottom'>
                {state.lowerFishes.map(fish => fish)}
            </div>
        </div>
    )
}

export default EnemyContainer