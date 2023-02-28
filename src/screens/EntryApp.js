import Player from '../components/hooksComponents/player/Player';
import logo from '../assets/images/logo.svg';
import '../assets/styles/common.css';
import Background from '../components/Background';

function EntryApp() {
  return (
    <div className="App">
      <Player />
      <Background />
    </div>
  );
}

export default EntryApp;
