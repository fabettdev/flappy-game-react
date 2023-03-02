import React, { Component } from 'react';
import '../../assets/styles/common.css';
import Player from '../../components/hooksComponents/player/Player';
import Fish from '../../components/hooksComponents/fish/Fish';
import Background from '../../components/funcComponents/background/Background';
import EnemyContainer from '../../components/hooksComponents/fish/EnemyContainer';
import { gameStart } from '../../utils/audioUtils';
import Tutorial from '../../components/funcComponents/tutorial/Tutorial';
import GameOver from '../../components/hooksComponents/gameOver/GameOver'
import GameStatusText from '../../components/funcComponents/gamestatustext/GameStatusText';
import './game.css'

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStarted: false,
      gameOver: false,
      enemyList: [],
      seconds: 4000,
      score: 0
    }

    this.enemyArr = []
    this.interval = null
    this.seconds = this.getRandomArbitrary(1000, 4000)
  }

  componentDidMount() {
    gameStart()
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.checkEnemyArr()
      this.pushEnemy()
      this.setState({ enemyList: this.enemyArr, seconds: this.getRandomArbitrary(1000, 4000) })
      console.log(this.enemyArr)
    }, 4000)
  }

  componentDidUpdate() {

  }

  spawnRand = () => {

  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }


  startGame = () => {
    this.setState(
      {
        hasStarted: true,
      }
    )
  }

  scoreIncrease = () => {
    this.setState({
      score: this.state.score + 1,
    })
  }

  gameOver = () => {
    this.setState(
      {
        hasStarted: false,
        gameOver: true,
      }
    )
    //clearInterval(this.interval)
  }
  checkEnemyArr = () => {
    if (this.enemyArr.length >= 10) {
      this.enemyArr.shift()
    }
  }

  pushEnemy = () => {
    this.enemyArr.push(<EnemyContainer key={Math.random()} scoreFunction={this.scoreIncrease} gameOver={this.state.gameOver} />)
  }

  renderMap(item) {
    return item
  }

  componentWillUnmount() {
    console.log('smontato')
    this.enemyArr = []
  }

  render() {
    return (
      <Background>
        <Player hasStarted={this.state.hasStarted} startFunc={this.startGame} gameOverFunc={this.gameOver} gameOver={this.state.gameOver} scoreFunction={this.scoreIncrease} />
        {!this.state.hasStarted && !this.state.gameOver && <Tutorial />}
        {this.state.gameOver &&
          <GameOver />}
        {
          this.enemyArr.map(this.renderMap)
        }
        <div className='score-container'>
          <GameStatusText
            label={this.state.score.toString()}
          />
        </div>
      </Background >
    )
  }
}

export default Game;
