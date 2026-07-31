function AppHeader({ title }) {
  return <header className="app-header">
    <h1>{title}</h1>
    <div className="header-actions">
      <button aria-label="Search">⌕</button>
      <button aria-label="Profile" className="avatar">SP</button>
    </div>
  </header>
}

export default AppHeader
