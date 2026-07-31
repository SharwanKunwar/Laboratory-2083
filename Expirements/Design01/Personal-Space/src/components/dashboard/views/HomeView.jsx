import Tile from '../Tile.jsx'

function HomeView() {
  return <div className="content-grid home-grid">
    <Tile className="welcome"><p className="eyebrow">Wednesday, July 31</p><h1>Good evening, Alex</h1><span className="muted">Your drive is ready when you are.</span><div className="weather"><b>☀</b><span>24°</span><small>Kathmandu</small></div></Tile>
    <Tile><p className="eyebrow">Energy</p><strong className="metric">78<small>%</small></strong><span className="muted">342 km remaining</span></Tile>
    <Tile><p className="eyebrow">Outside</p><strong className="metric">24<small>°</small></strong><span className="muted">Clear skies</span></Tile>
    <Tile className="wide"><p className="eyebrow">Your next stop</p><div className="next-stop"><span className="place-dot">⌖</span><div><h2>Himalayan Java</h2><span className="muted">5.2 km · 12 min away</span></div><button>Start</button></div></Tile>
  </div>
}

export default HomeView
