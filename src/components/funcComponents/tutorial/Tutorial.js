import React from "react";
import './tutorial.css';
import GameStatusText from "../gamestatustext/GameStatusText";
import { Player } from '@lottiefiles/react-lottie-player';

function Tutorial() {
    return (
        <div className="tutorial">
            <div className="title">
                <GameStatusText label={'get ready'} size={'big'} />
            </div>
            <div className="label">
                <GameStatusText label={'tap to jump'} size={'small'} color={'red'} />
            </div>
            <div>
                <Player
                    autoplay
                    loop
                    src="https://lottie.host/f98ec26c-04c6-43be-9fa2-e3491cb73541/POHCvtJqZ3.json"
                    style={{ height: '150px', width: '150px' }}
                />
            </div>
        </div>
    )
}

export default Tutorial;