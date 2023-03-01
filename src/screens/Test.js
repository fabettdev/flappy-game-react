import React from 'react'
import BackgroundCss from '../components/classComponents/BackgroundCss'
import Button from '../components/hooksComponents/button/Button'
import GameOver from '../components/hooksComponents/gameOver/GameOver'


function Test() {
    return (
        <div>
            <BackgroundCss>
                <div className='splash-container'>
                    <GameOver />
                </div>
            </BackgroundCss>
        </div>
    )
}

export default Test