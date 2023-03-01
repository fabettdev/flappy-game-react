import React, { Component } from 'react';
import '../../assets/styles/common.css';
import Player from '../../components/hooksComponents/player/Player';
import Fish from '../../components/hooksComponents/fish/Fish';
import Background from '../../components/funcComponents/background/Background';

class Game extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
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
        <Fish
          spawnHeight='400'
        />
      </Background>
    )
  }
}

export default Game;
