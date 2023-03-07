import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './splash.css';
import Background from '../../components/funcComponents/background/Background';
import GameStatusText from '../../components/funcComponents/gamestatustext/GameStatusText';
import { audioStart, audioStop } from '../../utils/audioUtils';

function Splash() {

    useEffect(() => {
        audioStart();
        return () => audioStop();
    }, [])

    return (
        <div>
            <Background>
                <div className='splash-container'>
                    <div className='title-container'>
                        <GameStatusText label={'flappy sub'} />
                        <GameStatusText label={'---React.js---'} size={'sub'} />
                    </div>
                    <div className='button-container'>
                        <Link
                            className='button1'
                            to={'/game'}
                        >
                            PLAY
                        </Link>
                    </div>
                </div>
            </Background>
        </div>
    )
}

export default Splash