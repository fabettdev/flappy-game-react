import React from 'react'
import './gameover.css'
import '../../../assets/styles/common.css'
import '../../../screens/splash/splash.css'
import GameStatusText from '../../funcComponents/gamestatustext/GameStatusText'
import Button from '../../funcComponents/button/Button'

function GameOver(props) {
    return (
        <div className='gameover-container'>
            <GameStatusText
                size='40px'
                label='GAME OVER'
            />
            <fieldset className='gameover-field'>
                <legend className='gameover-field-legend'>You lost</legend>
                <p>Score: {props.lastScore}</p>
                <p>Best Score: {props.bestScore}</p>
            </fieldset>
            <div className='button-container'>
                <Button
                    buttonLabel='REPLAY'
                    buttonStyle='button1'
                    buttonPlaceholder='PLAY'
                    buttonLink='/game'
                />
                <Button
                    buttonLabel='HOME'
                    buttonStyle='button2'
                />
            </div>
        </div>
    )
}

export default GameOver