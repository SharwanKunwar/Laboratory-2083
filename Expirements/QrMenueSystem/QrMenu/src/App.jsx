
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MenuSection from './components/MenuSection.jsx'
import Footer from './components/Footer.jsx'
import { menuCategories } from './data/menu.js'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="overflow-hidden">
        <Hero />
        {menuCategories.map((category) => (
          <MenuSection key={category.id} category={category} />
        ))}
      </main>
      <Footer />
    </div>
  )
}

export default App
