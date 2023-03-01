import React from 'react'
import GameOver from '../components/hooksComponents/gameOver/GameOver'
import Background from '../components/funcComponents/background/Background'


function Test() {
    return (
        <div>
            <Background>
                <div className='splash-container'>
                    <GameOver />
                </div>
            </Background>
        </div>
    )
}

export default Test