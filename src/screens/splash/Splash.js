import React, { useEffect } from 'react';
import './splash.css';
import Background from '../../components/funcComponents/background/Background';
import Button from '../../components/funcComponents/button/Button';
import GameStatusText from '../../components/funcComponents/gamestatustext/GameStatusText';
import Tutorial from '../../components/funcComponents/tutorial/Tutorial';
import { audioStart, audioStop } from '../../utils/audioUtils';

function Splash() {

    useEffect(() => {
        audioStart()
        console.log('start')
        return () => {
            audioStop()
        }
    }, [])

    return (
        <div>
            <Background>
                <div className='splash-container'>
                    <Tutorial />
                    <div className='title-container'>
                        <GameStatusText label={'flappy sub'} />
                        <GameStatusText label={'---React.js---'} size={'sub'} />
                    </div>
                    <div className='button-container'>
                        <Button
                            buttonLabel='PLAY'
                            buttonStyle='button1'
                            buttonPlaceholder='PLAY'
                            buttonLink='/game'
                        />
                        <Button
                            buttonLabel='CREDITS'
                            buttonStyle='button2'
                            callback={audioStart}
                        />
                    </div>
                </div>
            </Background>
        </div>
    )
}

export default Splash