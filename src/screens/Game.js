import React, { Component } from 'react';
import Player from '../components/hooksComponents/player/Player';
import '../assets/styles/common.css';
import BackgroundCss from '../components/classComponents/BackgroundCss';
import Fish from '../components/hooksComponents/fish/Fish';

class Game extends Component {
  constructor(props) {
    super(props);

    this.gravityTimeout = null;
    this.playerInterval = null;

    this.state = {
      translatePlayerY: 50,
    }
  }

  componentDidMount() {
  }

  /*  componentDidUpdate() {
     if (this.state.translatePlayerY >= 90) return clearInterval(this.gravityTimeout);
     this.gravityTimeout = setInterval(() => {
       this.setState(
         {
           translatePlayerY: this.state.translatePlayerY + 1,
         }
       )
     }, 1000)
   } */

  componentDidUpdate() {
    clearTimeout(this.gravityTimeout);
    //if (this.state.translatePlayerY >= 90) return;
    this.gravityTimeout = setTimeout(() => {
      this.setState({
        translatePlayerY: this.state.translatePlayerY + 0.8,
      })
    }, 15)
  }

  playerTap = () => {
    this.setState(
      {
        translatePlayerY: this.state.translatePlayerY - 20,
      }
    )
  }

  spawnRand = () => {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <BackgroundCss>
        <Player
          ref={this.playerRef}
          playerStyle={{
            top: `${this.state.translatePlayerY}%`,
            transform: 'translateY(-50%)',
          }}
        />
        <Fish
          spawnHeight='400'
        />
        {/* <Fish fishType={'big'} />
          <Fish fishType={'dart'} /> */}
      </BackgroundCss>
    )
  }
}

export default Game;
