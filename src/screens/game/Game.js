import React, { Component } from 'react';
import '../../assets/styles/common.css';
import Player from '../../components/hooksComponents/player/Player';
import Fish from '../../components/hooksComponents/fish/Fish';
import Background from '../../components/funcComponents/background/Background';
import EnemyContainer from '../../components/hooksComponents/fish/EnemyContainer';
import { gameStart } from '../../utils/audioUtils';
import Tutorial from '../../components/funcComponents/tutorial/Tutorial';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStarted: false,
      gameOver: false,
    }
  }

  componentDidMount() {
    gameStart()
  }

  componentDidUpdate() {
  }

  spawnRand = () => {

  }

  startGame = () => {
    this.setState(
      {
        hasStarted: true,
      }
    )
  }

  gameOver = () => {
    this.setState(
      {
        hasStarted: false,
        gameOver: true,
      }
    )
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Background>
        <Player hasStarted={this.state.hasStarted} startFunc={this.startGame} gameOverFunc={this.gameOver} />
        <EnemyContainer />
        {!this.state.hasStarted && !this.state.gameOver && <Tutorial />}
      </Background>
    )
  }
}

export default Game;
