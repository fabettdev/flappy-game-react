import React, { Component } from 'react';
import Player from '../components/hooksComponents/player/Player';
import '../assets/styles/common.css';
import Background from '../components/classComponents/Background';
import Fish from '../components/hooksComponents/fish/Fish';

class EntryApp extends Component {
  constructor(props) {
    super(props);

    this.gravityTimeout = null;
    this.playerInterval = null;

    this.state = {
      translateY: 50,
    }
  }

  componentDidMount() {
  }

  /*  componentDidUpdate() {
     if (this.state.translateY >= 90) return clearInterval(this.gravityTimeout);
     this.gravityTimeout = setInterval(() => {
       this.setState(
         {
           translateY: this.state.translateY + 1,
         }
       )
     }, 1000)
   } */

  componentDidUpdate() {
    clearTimeout(this.gravityTimeout);
    if (this.state.translateY >= 90) return;
    this.gravityTimeout = setTimeout(() => {
      this.setState({
        translateY: this.state.translateY + 0.8,
      })
    }, 15)
  }

  playerTap = () => {
    this.setState(
      {
        translateY: this.state.translateY - 20,
      }
    )
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App" style={{ position: 'relative', height: '100vh' }} onClick={this.playerTap}>
        <Player playerStyle={{
          top: `${this.state.translateY}%`,
          transform: 'translateY(-50%)',
        }} />
        <Fish />
        <Fish fishType={'big'} />
        <Fish fishType={'dart'} />
        <Background />
      </div>
    )
  }
}

export default EntryApp;
