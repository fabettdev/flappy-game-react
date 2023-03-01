import React from 'react'
import './fish.css'
import FishAutentico from './FishAutentico'
import './enemycontainer.css'

function EnemyContainer() {
    return (
        <div className='pillars-container'>
            <div className='enemy-pillar-top'>
                <FishAutentico />
                <FishAutentico />
            </div>
            <div className='enemy-pillar-bottom'></div>
        </div>
    )
}

export default EnemyContainer