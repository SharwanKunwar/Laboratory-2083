import Tile from '../Tile.jsx'

function NavigationView() {
  return <div className="navigation-content">
    <Tile className="map"><div className="map-lines" /><div className="map-card"><span>Next destination</span><strong>Himalayan Java</strong><small>5.2 km · 12 min</small></div><div className="destination">⌖</div></Tile>
  </div>
}

export default NavigationView
