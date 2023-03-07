import React from 'react'
import { useNavigate } from 'react-router-dom';
import './gameover.css'
import '../../../assets/styles/common.css'
import '../../../screens/splash/splash.css'
import GameStatusText from '../../funcComponents/gamestatustext/GameStatusText'
import Button from '../../funcComponents/button/Button';
import PropTypes from 'prop-types';

function GameOver(props) {
    const navigate = useNavigate();

    function goToSplash() {
        navigate('/')
    }

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
                <Button buttonStyle={'green'} buttonLabel={'home'} onClickButton={goToSplash} />
            </div>
        </div>
    )
}

GameOver.propTypes = {
    lastScore: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired,
}

export default GameOver