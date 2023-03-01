import React from 'react'
import GameOver from '../components/hooksComponents/gameOver/GameOver'
import Background from '../components/funcComponents/background/Background'
import EnemyContainer from '../components/hooksComponents/fish/EnemyContainer'


function Test() {
    return (
        <div>
            <Background>
                <EnemyContainer />
            </Background>
        </div>
    )
}

export default Test