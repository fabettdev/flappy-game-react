import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './splash.css';
import Background from '../../components/funcComponents/background/Background';
import GameStatusText from '../../components/funcComponents/gamestatustext/GameStatusText';
import { audioStart, audioStop } from '../../utils/audioUtils';
import Button from '../../components/funcComponents/button/Button';

function Splash() {
    const navigate = useNavigate();

    function goToGame() {
        navigate('/game');
    }

    useEffect(() => {
        audioStart();
        return () => audioStop();
    }, [])

    return (
        <Background>
            <div className='splash-container'>
                <div className='title-container'>
                    <GameStatusText label={'flappy sub'} />
                    <GameStatusText label={'React.js'} size={'sub'} />
                </div>
                <div className='button-container'>
                    <Button buttonStyle={'orange'} buttonLabel={'play'} onClickButton={goToGame} />
                </div>
            </div>
        </Background>
    )
}

export default Splash