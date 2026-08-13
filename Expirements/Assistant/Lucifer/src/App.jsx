import { useState } from "react";
import "./index.css";

const Icon = ({ children, className = "" }) => <span className={`icon ${className}`}>{children}</span>;

function App() {
  const [prompt, setPrompt] = useState("");
  const [notice, setNotice] = useState("");
  const [activeNav, setActiveNav] = useState("⌘");

  const submit = (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    setNotice(`Luciferr is preparing: ${prompt}`);
    setPrompt("");
  };

  const actions = [
    ["▣", "Overview"], ["◈", "Tasks"], ["◫", "Calendar"],
    ["◷", "History"], ["♧", "Agents"], ["⚙", "Settings"],
  ];

  return (
    <main className="room">
      <div className="ambient one" /><div className="ambient two" />
      <section className="shell">
        <aside className="rail">
          <div className="mark">L<span>✦</span></div>
          <div className="nav">
            {actions.map(([symbol, label]) => <button key={label} title={label} onClick={() => setActiveNav(symbol)} className={activeNav === symbol ? "selected" : ""}>{symbol}</button>)}
          </div>
          <div className="rail-bottom"><button>☀</button><div className="avatar small">LS</div></div>
        </aside>

        <div className="main-area">
          <header className="topbar">
            <div className="crumb"><span className="logo-dot">✦</span> luciferr <b>/</b> workspace</div>
            <form className="command" onSubmit={submit}><span>⌕</span><input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Ask Luciferr anything..." /><kbd>⌘ K</kbd></form>
            <div className="top-actions"><button>◌</button><button>＋</button><button>▣</button></div>
          </header>

          <div className="content">
            <div className="welcome"><div><p>THURSDAY, AUGUST 13</p><h1>Good evening, Lionel <span>✦</span></h1><small>Luciferr is online and ready to help.</small></div><button className="new-chat" onClick={() => setNotice("New conversation started.")}>＋ New conversation</button></div>
            {notice && <div className="notice">✦ {notice}<button onClick={() => setNotice("")}>×</button></div>}

            <div className="stats">
              <article className="card stat"><div className="card-head"><span>Today’s focus</span><i className="orange">◉</i></div><strong>4 <em>tasks</em></strong><div className="mini-bars"><b/><b/><b/><b className="faded"/><b className="faded"/><b className="faded"/></div><small>2 tasks completed</small></article>
              <article className="card stat"><div className="card-head"><span>System status</span><i className="pink">♥</i></div><strong>98<span className="unit">%</span></strong><div className="pulse">╱╲╱╲╱╲╱╲</div><small>All services operational</small></article>
              <article className="card stat"><div className="card-head"><span>Deep work</span><i className="green">◉</i></div><div className="ring"><b>2h</b><small>18m</small></div><small>of 4 hours planned</small></article>
              <article className="card stat"><div className="card-head"><span>Memory</span><i className="blue">◉</i></div><strong>1.2<span className="unit"> GB</span></strong><div className="memory"><span/></div><small>68% available</small></article>
            </div>

            <div className="middle">
              <article className="card activity"><div className="section-head"><div><h2>Activity overview</h2><small>Your Luciferr activity this week</small></div><button>This week⌄</button></div><div className="chart"><div className="axis"><span>12</span><span>8</span><span>4</span><span>0</span></div><svg viewBox="0 0 560 185" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#faad5d" stopOpacity=".34"/><stop offset="1" stopColor="#faad5d" stopOpacity="0"/></linearGradient></defs><path d="M0 158 C28 143 40 151 60 132 S94 145 118 118 S150 131 175 91 S210 125 232 103 S270 125 292 75 S324 96 346 61 S382 84 405 41 S440 76 462 45 S500 71 560 20 L560 185 L0 185Z" fill="url(#fill)"/><path d="M0 158 C28 143 40 151 60 132 S94 145 118 118 S150 131 175 91 S210 125 232 103 S270 125 292 75 S324 96 346 61 S382 84 405 41 S440 76 462 45 S500 71 560 20" fill="none" stroke="#e99b50" strokeWidth="3"/><circle cx="405" cy="41" r="6" fill="#fff" stroke="#e99b50" strokeWidth="3"/></svg><div className="months">Mon Tue Wed Thu Fri Sat Sun</div></div></article>
              <article className="card assistant-card"><div className="orb">✦</div><div><p>YOUR AI PARTNER</p><h2>Luciferr is thinking</h2><span>Ready to turn ideas into action.</span></div><button onClick={() => setNotice("Luciferr is listening.")}>Start a chat <b>→</b></button></article>
            </div>

            <section className="projects"><div className="section-head"><div><h2>Active projects</h2><small>Keep your momentum going</small></div><button>View all</button></div><div className="project-list"><article className="project violet"><span className="project-icon">◌</span><div><b>Product strategy</b><small>Review Q3 roadmap and priorities</small></div><span className="project-progress">72%</span></article><article className="project amber"><span className="project-icon">◈</span><div><b>Research notes</b><small>Summarize latest user interviews</small></div><span className="project-progress">48%</span></article><article className="project blueish"><span className="project-icon">⌘</span><div><b>Personal system</b><small>Organize weekly review</small></div><span className="project-progress">86%</span></article></div></section>
          </div>
        </div>

        <aside className="right-panel">
          <div className="profile"><div className="avatar">LM</div><div><b>Lionel Messi</b><small>@leoworks</small></div><button>•••</button></div>
          <div className="profile-numbers"><span><b>12</b>tasks</span><span><b>7</b>projects</span><span><b>26</b>notes</span></div>
          <section className="calendar"><div className="calendar-head"><b>August 2026</b><span>‹　›</span></div><div className="week">Su Mo Tu We Th Fr Sa</div><div className="dates">{["", "", "", "", "", "", "1", "2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"].map((n,i)=><span key={i} className={n === "13" ? "today" : n === "19" ? "event" : ""}>{n}</span>)}</div></section>
          <section className="scheduled"><div className="section-head"><h2>Up next</h2><button>View all</button></div>{[["09:30", "Daily briefing", "Review priorities for today"], ["11:00", "Design sync", "Workspace redesign feedback"], ["14:30", "Focus session", "Product strategy · 90 min"]].map(([time,title,desc])=><div className="event" key={time}><time>{time}</time><div><b>{title}</b><small>{desc}</small></div><button>•••</button></div>)}</section>
        </aside>
      </section>
    </main>
  );
}

export default App;
