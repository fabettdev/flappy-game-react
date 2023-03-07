import React, { useState, useEffect } from 'react';
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
import { jumpEffect } from "../../utils/audioUtils";

function Game() {
  const [state, setState] = useState({
    hasStarted: false,
    gameOver: false,
    enemyList: [],
    enemyPassed: [],
    score: 0,
    best: 0,
    translatePlayerY: 50,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.hasStarted || state.gameOver) return;
      const enemyArr = [...state.enemyList];

      if (enemyArr.length > 5) {
        enemyArr.shift()
      }

      enemyArr.push(<EnemyContainer key={Math.random()} />);

      setState(prevState => ({
        ...prevState,
        enemyList: enemyArr
      }));
    }, 4000)

    const timeout = setInterval(() => {
      setState(prevState => ({
        ...prevState,
        translatePlayerY: state.hasStarted || state.gameOver ? prevState.translatePlayerY + 5 : prevState.translatePlayerY,
      }))
    }, 70)

    return () => {
      clearInterval(interval);
      clearInterval(timeout);
    }
  }, [state.enemyList, state.hasStarted, state.gameOver]);

  function scoreIncrease(enemyId) {
    let partialScore = state.score;
    const enemyPassed = [...state.enemyPassed];
    if (enemyPassed.includes(enemyId)) return;
    if (!enemyPassed.includes(enemyId)) {
      enemyPassed.push(enemyId);
      partialScore += 1
    };

    setState({
      ...state,
      enemyPassed,
      score: partialScore,
    })
  }

  function gameOver() {
    gameStop()
    gameOverEffect()
    let pastScore = getLocalStorage('score');
    if (pastScore === null) pastScore = 0;
    if (state.score > pastScore) {
      pastScore = state.score
    }
    setLocalStorage('score', pastScore)
    setState(
      {
        ...state,
        hasStarted: false,
        gameOver: true,
        best: pastScore,
      }
    )
  }

  function playerUp() {
    jumpEffect()
    if (!state.gameOver && !state.hasStarted) gameStart();
    if (!!state.gameOver && !state.hasStarted) return;

    setState(
      {
        ...state,
        hasStarted: true,
        translatePlayerY: state.translatePlayerY - 25,
      }
    )
  }

  function renderMap(item) {
    return item
  }

  function setAnimationStatus() {
    if (state.gameOver || !state.hasStarted) return true;
    if (state.hasStarted) return false;
  }

  return (
    <div onClick={playerUp}>
      <Background stopAnimation={setAnimationStatus()}>
        <PlayerContainer hasStarted={state.hasStarted} gameOver={state.gameOver} gameOverFunc={gameOver} scoreFunction={scoreIncrease} styleCss={{
          top: `${state.translatePlayerY}%`,
          transition: 'top 0.3s ease-out',
          transform: 'translateY(-50%)',
        }} />
        {!state.hasStarted && !state.gameOver && <Tutorial />}
        {
          state.gameOver &&
          <GameOver
            bestScore={state.best}
            lastScore={state.score}
          />
        }
        {
          !state.gameOver && state.enemyList.map(renderMap)
        }
        <div className='score-container'>
          <GameStatusText
            label={state.score.toString()}
          />
        </div>
      </Background >
    </div>
  )
}

export default Game;