import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/home', label: 'Home', icon: '⌂' },
  { path: '/car', label: 'My car', icon: '▱' },
  { path: '/music', label: 'Music', icon: '♫' },
  { path: '/navigation', label: 'Navigation', icon: '⌖' },
  { path: '/work', label: 'Workplace', icon: '▣' },
]

function ControlBar() {
  return <footer className="control-bar">
    <div className="climate"><span>‹</span><b>20°</b><span>›</span><b>AUTO</b></div>
    <nav>
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
          <span>{item.icon}</span><small>{item.label}</small>
        </NavLink>
      ))}
    </nav>
    <div className="drive-controls"><span>⌁</span><span>◖ 92</span><span>›</span></div>
  </footer>
}

export default ControlBar
