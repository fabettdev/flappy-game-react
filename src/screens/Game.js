import React, { Component } from 'react';
import Player from '../components/hooksComponents/player/Player';
import '../assets/styles/common.css';
import BackgroundCss from '../components/classComponents/BackgroundCss';
import Fish from '../components/hooksComponents/fish/Fish';

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
      <BackgroundCss>
        <Player />
        <Fish
          spawnHeight='400'
        />
      </BackgroundCss>
    )
  }
}

export default Game;
