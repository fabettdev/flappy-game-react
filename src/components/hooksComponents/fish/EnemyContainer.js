import React, { useState, useEffect } from 'react'
import './fish.css'
import FishAutentico from './FishAutentico'
import './enemycontainer.css'

// Massimo 9 pesci
// Stato pesci sopra
// Numero random da 1 a 9
// Stato pesci sopra diventa il numero che esce
// Stato pesci sotto diventa numero casuale tra 0 e 9 - pesci sopra)

function EnemyContainer() {

    const [state, setState] = useState({
        maxFishes: 9,
        upperFishes: [],
        lowerFishes: [],
        translateX: -100,
    })

    useEffect(() => {
        const upperFishes = [];
        const lowerFishes = [];
        const upperNum = Math.floor(Math.random() * 9 + 1);
        const lowerNum = Math.floor(Math.random() * (state.maxFishes - upperNum + 1));
        console.log(upperNum, lowerNum)
        for (let i = 0; i < upperNum; i++) {
            const fish = <div key={`${i}-${Math.random()}`} className='enemy-container'><FishAutentico /></div>;
            upperFishes.push(fish);
        }
        for (let i = 0; i < lowerNum; i++) {
            const fish = <div key={`${i}-${Math.random()}`} className='enemy-container'><FishAutentico /></div>;
            lowerFishes.push(fish);
        }
        setState({
            ...state,
            upperFishes,
            lowerFishes
        })
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setState(
                {
                    ...state,
                    translateX: state.translateX + 2,
                }
            )
        }, 10)
        return () => clearTimeout(timeout);
    }, [state]);

    return (
        <div className='pillars-container' style={{ right: `${state.translateX}px` }}>
            <div className='enemy-pillar-top'>
                {state.upperFishes.map(fish => fish)}
            </div>
            <div className='enemy-pillar-bottom'>
                {state.lowerFishes.map(fish => fish)}
            </div>
        </div>
    )
}

export default EnemyContainer