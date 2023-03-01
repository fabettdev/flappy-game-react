import React from 'react'
import './fish.css'
import FishAutentico from './FishAutentico'
import './enemycontainer.css'

function EnemyContainer() {
    return (
        <div className='pillars-container'>
            <div className='enemy-pillar-top'>
                <div className='enemy-container'>
                    <FishAutentico />
                </div>
                <div className='enemy-container'>
                    <FishAutentico />
                </div>
                <div className='enemy-container'>
                    <FishAutentico />
                </div>
            </div>
            <div className='divider'></div>
            <div className='enemy-pillar-bottom'>
                <div className='enemy-container'>
                    <FishAutentico />
                </div>
                <div className='enemy-container'>
                    <FishAutentico />
                </div>
                <div className='enemy-container'>
                    <FishAutentico />
                </div>
            </div>
        </div>
    )
}

export default EnemyContainer