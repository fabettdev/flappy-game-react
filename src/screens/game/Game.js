import React, { Component } from 'react';
import '../../assets/styles/common.css';
import PlayerContainer from '../../components/hooksComponents/playerContainer/PlayerContainer';
import Background from '../../components/funcComponents/background/Background';
import EnemyContainer from '../../components/hooksComponents/fish/EnemyContainer';
import { gameStart, gameStop, gameOverEffect } from '../../utils/audioUtils';
import Tutorial from '../../components/funcComponents/tutorial/Tutorial';
import GameOver from '../../components/hooksComponents/gameOver/GameOver'
import GameStatusText from '../../components/funcComponents/gamestatustext/GameStatusText';
import './game.css'
import { setLocalStorage, getLocalStorage } from '../../utils/localStorageUtils';

class Game extends Component {
  constructor(props) {
    super(props);

    this.interval = null
    this.playerRef = React.createRef();

    this.state = {
      hasStarted: false,
      gameOver: false,
      enemyList: [],
      enemyPassed: [],
      score: 0,
      best: 0,
    }
  }

  componentDidMount() {
    gameStart()
    this.storageInit()
    this.interval = setInterval(() => {
      if (!this.state.hasStarted || this.state.gameOver) return;
      const enemyArr = [...this.state.enemyList];
      this.checkEnemyArr(enemyArr);
      this.pushEnemy(enemyArr);
      this.setState({ enemyList: enemyArr })
    }, 4000)
  }

  storageInit() {
    let storage = getLocalStorage('score')
    if (storage === null || storage === undefined) {
      let myObj = {
        scores: [],
        best: 0,
      }
      setLocalStorage('score', myObj)
    }
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

  hitCheck = (containerHitbox) => {
    const { bottom: playerBottom, top: playerTop, right: playerRight, left: playerLeft } = this.playerRef.current.getBoundingClientRect();
    const { bottom: topDivBottom, right: topDivRight, left: topDivLeft } = containerHitbox.topDiv;
    const { top: bottomDivTop, right: bottomDivRight, left: bottomDivLeft } = containerHitbox.bottomDiv;
    console.log('topDivRight', topDivRight)
    console.log('playerTop', playerTop)
    const containerId = containerHitbox.id;
    let verticalHitTop = false
    let verticalHitBottom = false
    let horizontalHit = false
    let borderHit = false

    // Controllo player esce dai bordi
    if (playerTop <= 0 || playerBottom > window.innerHeight) {
      borderHit = true
    }

    // Controllo player supera orizzontalmente il div
    if (topDivLeft < playerRight || bottomDivLeft < playerRight) {
      // Controllo player ha già superato il div
      if (playerLeft < topDivRight || playerLeft < bottomDivRight)
        horizontalHit = true
    }

    // Controllo player è alla stessa altezza del div superiore
    if (playerTop < topDivBottom) {
      verticalHitTop = true
    }

    // Controllo player è alla stessa altezza del div inferiore
    if (playerBottom > bottomDivTop) {
      verticalHitBottom = true
    }

    if ((horizontalHit && verticalHitBottom) || (horizontalHit && verticalHitTop) || borderHit) {
      this.gameOver();
    }

    if (topDivRight < playerLeft && !this.state.gameOver) {
      this.scoreIncrease(containerId);
    }
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
    gameStop()
    gameOverEffect()
    let pastScore = getLocalStorage('score')
    if (this.state.score > pastScore.best) {
      pastScore.best = this.state.score
    }
    pastScore.scores.push(this.state.score)
    setLocalStorage('score', pastScore)
    this.setState(
      {
        hasStarted: false,
        gameOver: true,
        best: pastScore.best,
      }
    )
  }

  checkEnemyArr(array) {
    if (array.length > 5) {
      array.shift()
    }
  }

  pushEnemy(array) {
    array.push(<EnemyContainer hitFunc={this.hitCheck} key={Math.random()} gameOver={this.state.gameOver} /* scoreFunction={this.scoreIncrease} */ />)
  }

  renderMap(item) {
    return item
  }

  setAnimationStatus() {
    if (this.state.gameOver || !this.state.hasStarted) return true;
    if (this.state.hasStarted) return false;
  }

  componentWillUnmount() {
    gameStop()
  }

  render() {
    return (
      <Background stopAnimation={this.setAnimationStatus()}>
        <PlayerContainer ref={this.playerRef} hasStarted={this.state.hasStarted} startFunc={this.startGame} gameOverFunc={this.gameOver} gameOver={this.state.gameOver} scoreFunction={this.scoreIncrease} />
        {!this.state.hasStarted && !this.state.gameOver && <Tutorial />}
        {
          this.state.gameOver &&
          <GameOver
            bestScore={parseInt(this.state.best)}
            lastScore={parseInt(this.state.score)}
          />
        }
        {
          !this.state.gameOver && this.state.enemyList.map(this.renderMap)
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