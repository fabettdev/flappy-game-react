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
      enemyPassed: [],
      score: 0
    }

    this.interval = null
  }

  componentDidMount() {
    gameStart()
    this.interval = setInterval(() => {
      if (!this.state.hasStarted || this.state.gameOver) return;
      const enemyArr = [...this.state.enemyList];
      this.checkEnemyArr(enemyArr);
      this.pushEnemy(enemyArr);
      this.setState({ enemyList: enemyArr })
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

  scoreIncrease = (enemyId) => {
    let partialScore = this.state.score;
    const enemyPassed = [...this.state.enemyPassed];
    if (enemyPassed.includes(enemyId)) return;
    if (!enemyPassed.includes(enemyId)) {
      enemyPassed.push(enemyId);
      partialScore += 1
    };
    this.setState({
      enemyPassed,
      score: partialScore,
    })
  }

  gameOver = () => {
    this.setState(
      {
        hasStarted: false,
        gameOver: true,
      }
    )
  }

  replay = () => {
    this.setState({
      hasStarted: false,
      gameOver: false,
      enemyList: [],
      score: 0
    })
  }

  checkEnemyArr(array) {
    if (array.length > 5) {
      array.shift()
    }
  }

  pushEnemy(array) {
    array.push(<EnemyContainer key={Math.random()} gameOverFunc={this.gameOver} gameOver={this.state.gameOver} scoreFunction={this.scoreIncrease} />)
  }

  renderMap(item) {
    return item
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Background stopAnimation={this.state.gameOver}>
        <Player hasStarted={this.state.hasStarted} startFunc={this.startGame} />
        {!this.state.hasStarted && !this.state.gameOver && <Tutorial />}
        {
          this.state.gameOver &&
          <GameOver replayFunc={this.replay} />
        }
        {
          this.state.enemyList.map(this.renderMap)
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
