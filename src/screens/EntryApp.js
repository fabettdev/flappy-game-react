import Player from '../components/hooksComponents/player/Player';

function EntryApp() {
  return (
    <div className="App">
      <Player action={'moving'} posNumber={7} />
      <Player action={'hurt'} posNumber={7} />
    </div>
  );
}

export default EntryApp;
