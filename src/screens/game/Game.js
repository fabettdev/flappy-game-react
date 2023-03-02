import React, { Component } from 'react';
import '../../assets/styles/common.css';
import Player from '../../components/hooksComponents/player/Player';
import Fish from '../../components/hooksComponents/fish/Fish';
import Background from '../../components/funcComponents/background/Background';
import EnemyContainer from '../../components/hooksComponents/fish/EnemyContainer';
import { gameStart } from '../../utils/audioUtils';

class Game extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    gameStart()
  }

  componentDidUpdate() {
  }

  spawnRand = () => {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Background>
        <Player />
        <EnemyContainer />
      </Background>
    )
  }
}

export default Game;
