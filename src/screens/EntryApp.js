import React, { Component, setState } from 'react';
import Player from '../components/hooksComponents/player/Player';

class EntryApp extends Component {
  constructor(props) {
    super(props);

    this.gravityTimeout = null;

    this.state = {
      translateY: 50,
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if (this.state.translateY === 100) return () => clearTimeout(this.gravityTimeout);
    this.gravityTimeout = setTimeout(() => {
      this.setState(
        {
          translateY: this.state.translateY + 1,
        }
      )
    }, 15)
    return () => clearTimeout(this.gravityTimeout);
  }

  playerTap = () => {
    this.setState(
      {
        translateY: this.state.translateY - 30,
      }
    )
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App" style={{ position: 'relative', height: '100vh' }} onClick={this.playerTap}>
        <Player playerStyle={{
          position: 'absolute',
          top: `${this.state.translateY}%`,
          left: '10%',
          transform: 'translateY(-50%)',
        }} />
      </div>
    );
  }
}

export default EntryApp;
