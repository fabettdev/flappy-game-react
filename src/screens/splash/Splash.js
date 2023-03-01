import React from 'react'
import './splash.css';
import Background from '../../components/funcComponents/background/Background';
import Button from '../../components/funcComponents/button/Button'
import GameStatusText from '../../components/funcComponents/gamestatustext/GameStatusText'

function Splash() {
    return (
        <div>
            <Background>
                <div className='splash-container'>
                    <div className='title-container'>
                        <GameStatusText label={'flappy sub'} />
                        <GameStatusText label={'---subtitle---'} size={'small'} color={'green'} />
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
                        />
                    </div>
                </div>
            </Background>
        </div>
    )
}

export default Splash