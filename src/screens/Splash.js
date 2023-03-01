import React from 'react'
import BackgroundCss from '../components/classComponents/BackgroundCss'
import Button from '../components/hooksComponents/button/Button'

function Splash() {
    return (
        <div>
            <BackgroundCss>
                <div className='splash-container'>
                    <div className='title-container'>
                        <p className='splash-title'>FLAPPY SUB</p>
                        <p className='splash-subtitle'>---SUBTITLE---</p>
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
            </BackgroundCss>
        </div>
    )
}

export default Splash