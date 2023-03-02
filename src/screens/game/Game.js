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
      enemyList: [],
    }

    this.enemyArr = []
    this.interval = null
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
        <Player hasStarted={this.state.hasStarted} startFunc={this.startGame} gameOverFunc={this.gameOver} />
        {!this.state.hasStarted && !this.state.gameOver && <Tutorial />}
        {
          this.enemyArr.map(this.renderMap)
        }
      </Background >
    )
  }
}

export default Game;
