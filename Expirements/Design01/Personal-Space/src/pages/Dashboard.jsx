import AppHeader from '../components/dashboard/AppHeader.jsx'
import ControlBar from '../components/dashboard/ControlBar.jsx'
import StatusBar from '../components/dashboard/StatusBar.jsx'
import CarView from '../components/dashboard/views/CarView.jsx'
import HomeView from '../components/dashboard/views/HomeView.jsx'
import MusicView from '../components/dashboard/views/MusicView.jsx'
import NavigationView from '../components/dashboard/views/NavigationView.jsx'
import WorkView from '../components/dashboard/views/WorkView.jsx'

const titles = {
  home: 'Good evening, Alex',
  car: 'My car',
  music: 'Music',
  navigation: 'Navigation',
  work: 'Workplace',
}

const views = {
  home: HomeView,
  car: CarView,
  music: MusicView,
  navigation: NavigationView,
  work: WorkView,
}

function Dashboard({ view }) {
  const View = views[view] ?? HomeView

  return (
    <main className="dashboard-shell min-h-screen">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="dashboard">
        <StatusBar />
        <AppHeader title={titles[view] ?? titles.home} />
        <div className="view-area"><View /></div>
        <ControlBar />
      </section>
    </main>
  )
}

export default Dashboard
