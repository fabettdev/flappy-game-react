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
    this.enemyArr = []
    this.interval = null
    this.state = {
      enemyList: [],
    }
  }

  componentDidMount() {
    gameStart()
    this.interval = setInterval(() => {
      this.checkEnemyArr()
      this.pushEnemy()
      this.setState({ enemyList: this.enemyArr })
      console.log(this.enemyArr)
    }, 2000)
  }

  componentDidUpdate() {

  }

  spawnRand = () => {

  }

  checkEnemyArr() {
    if (this.enemyArr.length === 10) {
      this.enemyArr.shift()
    }
  }

  pushEnemy = () => {
    this.enemyArr.push(<EnemyContainer />)
  }

  renderMap(item) {
    return item
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    this.enemyArr = []
  }

  render() {
    return (
      <Background>
        <Player />
        {
          this.enemyArr.map(this.renderMap)
        }
      </Background>
    )
  }
}

export default Game;
