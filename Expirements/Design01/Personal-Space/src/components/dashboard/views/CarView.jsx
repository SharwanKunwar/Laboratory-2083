import Tile from '../Tile.jsx'

function CarView() {
  return <div className="content-grid car-grid">
    <Tile className="tall"><p className="eyebrow">Vehicle status</p><h2>Everything looks good</h2><div className="car-illustration"><div className="car-body" /><i /><i /></div><span className="muted">No alerts or warnings</span></Tile>
    <Tile><p className="eyebrow">Range</p><strong className="metric">342 <small>km</small></strong><span className="muted">Estimated range</span></Tile>
    <Tile><p className="eyebrow">Battery</p><strong className="metric">78<small>%</small></strong><div className="battery"><span /></div></Tile>
    <Tile className="wide"><p className="eyebrow">Quick controls</p><div className="control-row"><button>Unlock</button><button>Lights</button><button>Climate</button></div></Tile>
  </div>
}

export default CarView
