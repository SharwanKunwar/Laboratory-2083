function Tile({ className = '', children }) {
  return <section className={`panel ${className}`}>{children}</section>
}

export default Tile
