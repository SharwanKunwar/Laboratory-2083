import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, ChevronDown, Sun, Moon } from 'lucide-react';

const navItems = [
  { id: 1, label: 'Action', to: '/action' },
  { id: 2, label: 'Comedy', to: '/comedy' },
  { id: 3, label: 'Drama', to: '/drama' },
  { id: 4, label: 'Horror', to: '/horror' },
  { id: 5, label: 'Sci-Fi', to: '/sci-fi' },
  { id: 6, label: 'Thriller', to: '/thriller' },
];

const moreGenres = [
  { id: 1, label: 'Romance', to: '/romance' },
  { id: 2, label: 'Animation', to: '/animation' },
  { id: 3, label: 'Fantasy', to: '/fantasy' },
  { id: 4, label: 'Mystery', to: '/mystery' },
  { id: 5, label: 'Documentary', to: '/documentary' },
  { id: 6, label: 'Crime', to: '/crime' },
];

/* ------------------------------------------------------------------ */
/*  Theme tokens — two distinct identities, applied via isDarkMode      */
/* ------------------------------------------------------------------ */

const themes = {
  dark: {
    overlay: 'linear-gradient(180deg, rgba(6,4,7,0.82) 0%, rgba(6,4,7,0.68) 45%, rgba(6,4,7,0.9) 100%)',
    panel: 'rgba(18,13,16,0.66)',
    panelSolid: '#150F12',
    border: 'rgba(201,162,75,0.22)',
    borderStrong: 'rgba(201,162,75,0.5)',
    accent: '#C9A24B',
    accentSoft: 'rgba(201,162,75,0.1)',
    text: '#EFE7D6',
    textDim: 'rgba(239,231,214,0.68)',
    textFaint: 'rgba(239,231,214,0.4)',
    inputBg: 'rgba(27,21,24,0.55)',
    outletText: 'rgba(239,231,214,0.42)',
  },
  light: {
    overlay: 'linear-gradient(180deg, rgba(250,244,231,0.88) 0%, rgba(250,244,231,0.74) 45%, rgba(243,233,212,0.92) 100%)',
    panel: 'rgba(255,251,243,0.72)',
    panelSolid: '#FBF6EC',
    border: 'rgba(122,42,52,0.2)',
    borderStrong: 'rgba(122,42,52,0.55)',
    accent: '#7A2A34',
    accentSoft: 'rgba(122,42,52,0.08)',
    text: '#2B211A',
    textDim: 'rgba(43,33,26,0.68)',
    textFaint: 'rgba(43,33,26,0.42)',
    inputBg: 'rgba(255,255,255,0.55)',
    outletText: 'rgba(43,33,26,0.4)',
  },
};

const serif = "'Cormorant Garamond', serif";
const sans = "'Inter', sans-serif";

/* ------------------------------------------------------------------ */
/*  Theme toggle                                                       */
/* ------------------------------------------------------------------ */

function ThemeToggle({ isDarkMode, onToggle, theme }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-13 h-7 rounded-full shrink-0 transition-colors duration-500"
      style={{ background: theme.accentSoft, border: `1px solid ${theme.border}` }}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className="absolute top-0.5 flex items-center justify-center w-5.5 h-5.5 rounded-full"
        style={{ left: isDarkMode ? 'calc(100% - 1.6rem)' : '0.15rem', background: theme.accent }}
      >
        {isDarkMode ? <Moon size={11} color={theme.panelSolid} /> : <Sun size={11} color={theme.panelSolid} />}
      </motion.span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  More dropdown — closes on outside click                            */
/* ------------------------------------------------------------------ */

function MoreDropdown({ theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-[13px] tracking-[0.08em] font-medium transition-colors duration-300"
        style={{ fontFamily: sans, border: `1px solid ${theme.border}`, color: theme.textDim, background: theme.inputBg }}
      >
        More
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={13} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full right-0 mt-2 min-w-44 rounded-sm overflow-hidden z-20"
            style={{ background: theme.panelSolid, border: `1px solid ${theme.border}`, boxShadow: '0 16px 34px rgba(0,0,0,0.35)' }}
          >
            {moreGenres.map((genre) => (
              <NavLink
                key={genre.id}
                to={genre.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 'block px-5 py-2.5 text-[16px] border-l-2 transition-colors duration-200'}
                style={({ isActive }) => ({
                  fontFamily: serif,
                  borderLeftColor: isActive ? theme.accent : 'transparent',
                  color: isActive ? theme.accent : theme.textDim,
                  background: isActive ? theme.accentSoft : 'transparent',
                })}
              >
                {genre.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                 */
/* ------------------------------------------------------------------ */

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <div
        className="w-screen h-screen p-10 transition-colors duration-500"
        style={{ background: isDarkMode ? '#0A0708' : '#EDE3D0' }}
      >
        <div
          className="relative w-full h-full rounded-2xl shadow-md bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url('/bg/b04.jpeg')` }}
        >
          {/* theme-aware vignette so content stays legible over the photo */}
          <div className="absolute inset-0 transition-[background] duration-500" style={{ background: theme.overlay }} />

          {/* layout container */}
          <div
            className="relative backdrop-blur-md w-full h-full rounded-2xl p-5 flex flex-col transition-colors duration-500"
            style={{ background: theme.panel, border: `1px solid ${theme.border}` }}
          >
            {/* nav */}
            <div
              className="w-full shrink-0 h-20 flex items-center justify-between gap-6 border-b px-2 transition-colors duration-500"
              style={{ borderColor: theme.border }}
            >
              {/* brand + search */}
              <div className="flex items-center gap-5 flex-1 min-w-0 px-3">
                <span
                  className="text-[19px] tracking-[0.02em] shrink-0 italic transition-colors duration-500"
                  style={{ fontFamily: serif, color: theme.accent }}
                >
                  MovieDetails
                </span>
                <div className="relative w-full max-w-72 hidden md:block">
                  <input
                    type="text"
                    placeholder="Search…"
                    className="w-full pl-10 pr-4 py-2 rounded-sm text-sm outline-none transition-colors duration-300"
                    style={{
                      fontFamily: sans,
                      border: `1px solid ${theme.border}`,
                      background: theme.inputBg,
                      color: theme.text,
                    }}
                  />
                  <Search
                    size={15}
                    strokeWidth={1.5}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: theme.textFaint }}
                  />
                </div>
              </div>

              {/* nav links */}
              <nav className="hidden lg:flex items-center gap-7 shrink-0">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    className="relative pb-1 text-[16px] tracking-[0.01em] transition-colors duration-300"
                    style={({ isActive }) => ({ fontFamily: serif, color: isActive ? theme.accent : theme.textDim })}
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          className="absolute left-0 -bottom-0.5 h-px transition-all duration-300"
                          style={{ width: isActive ? '100%' : '0%', background: theme.accent }}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
                <MoreDropdown theme={theme} />
              </nav>

              {/* actions */}
              <div className="flex items-center gap-3 shrink-0 px-3">
                <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode((v) => !v)} theme={theme} />

                <button
                  aria-label="Notifications"
                  className="relative p-2 rounded-full transition-colors duration-300"
                  style={{ border: `1px solid ${theme.border}`, background: theme.inputBg }}
                >
                  <Bell size={16} strokeWidth={1.5} style={{ color: theme.textDim }} />
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                    style={{ background: theme.accent }}
                  />
                </button>

                <button
                  aria-label="Profile"
                  className="p-0.5 rounded-full transition-colors duration-300"
                  style={{ border: `1px solid ${theme.border}` }}
                >
                  <img src="/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                </button>
              </div>
            </div>

            {/* outlet */}
            <div
              className="rounded-sm w-full flex-1 min-h-0 flex justify-center items-center text-[15px] mt-5 transition-colors duration-500"
              style={{ fontFamily: serif, border: `1px solid ${theme.border}`, color: theme.outletText }}
            >
              <Outlet context={{ isDarkMode }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;