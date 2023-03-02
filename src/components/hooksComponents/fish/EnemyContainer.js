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

    const divsPosition = {};
    const topDivRef = useRef(null);
    const bottomDivRef = useRef(null);
    let interval = null;

    const [state, setState] = useState({
        maxFishes: 9,
        upperFishes: [],
        lowerFishes: [],
        translateX: -100,
    })

    useEffect(() => {
        // useEffect per generare il pillar con i pesci
        const upperFishes = [];
        const lowerFishes = [];
        const upperNum = Math.floor(Math.random() * 9 + 1);
        const lowerNum = Math.floor(Math.random() * (state.maxFishes - upperNum + 1));
        console.log(upperNum, lowerNum)
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
        divsPosition.topDiv = topDivRef.current.getBoundingClientRect();
        divsPosition.bottomDiv = bottomDivRef.current.getBoundingClientRect();
        eventsBus.dispatch('onSwim', divsPosition);

        eventsBus.on('onPlayerMove', positionCheck)

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
            clearInterval(interval)
            eventsBus.remove('onPlayerMove', positionCheck)
        };
    }, [state]);

    function positionCheck(playerHitbox) {
        const topDiv = topDivRef.current.getBoundingClientRect();
        console.log(topDiv.right)
        if (topDiv.right < playerHitbox && !props.gameOver) {
            props.scoreFunction()
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