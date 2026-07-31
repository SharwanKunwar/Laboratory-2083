import Tile from '../Tile.jsx'

function WorkView() {
  return <div className="content-grid work-grid">
    <Tile className="tall"><p className="eyebrow">Today</p><h2>Stay in the flow</h2><div className="calendar"><b>31</b><span>July</span></div><span className="muted">2 meetings remaining</span></Tile>
    <Tile><p className="eyebrow">Next meeting</p><h2>Design sync</h2><span className="muted">09:30 — 10:15</span><button className="join">Join meeting</button></Tile>
    <Tile><p className="eyebrow">Focus time</p><strong className="metric">1h 26m</strong><span className="muted">Deep work today</span></Tile>
    <Tile className="wide"><p className="eyebrow">Recent files</p><div className="file-row"><span>◆</span><b>Dashboard exploration</b><small>Updated 12 min ago</small></div></Tile>
  </div>
}

export default WorkView
