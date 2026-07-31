import Tile from '../Tile.jsx'

const barHeights = [30, 58, 42, 72, 50, 84, 35, 62, 48, 76, 38, 56]

function MusicView() {
  return <div className="content-grid music-grid">
    <Tile className="now-playing"><div className="album-art">⌁</div><div><p className="eyebrow">Now playing</p><h2>Night Drive</h2><span className="muted">The Midnight</span></div><div className="player-buttons"><button>‹‹</button><button className="play">▶</button><button>››</button></div></Tile>
    <Tile><p className="eyebrow">Recently played</p><div className="track"><span>01</span> Midnight City <b>3:44</b></div><div className="track"><span>02</span> Electric Feel <b>3:27</b></div></Tile>
    <Tile><p className="eyebrow">Your library</p><h2>Curated for the road</h2><span className="muted">42 playlists available</span></Tile>
    <Tile className="wide equalizer"><p className="eyebrow">Sound studio</p><div className="bars">{barHeights.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></Tile>
  </div>
}

export default MusicView
