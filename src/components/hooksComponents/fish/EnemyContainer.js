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

function EnemyContainer() {
    const topDivRef = useRef(null);
    const bottomDivRef = useRef(null);
    let interval = null;
    const maxFishes = 9;
    const container = {};

    const [state, setState] = useState({
        upperFishes: [],
        lowerFishes: [],
        translateX: -100,
        id: Math.random() * Math.random(),
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
        container.topDiv = topDivRef.current.getBoundingClientRect();
        container.bottomDiv = bottomDivRef.current.getBoundingClientRect();
        container.id = state.id;
        eventsBus.dispatch('onSwim', container)
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
            clearInterval(interval);
        }
    }, [state]);

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