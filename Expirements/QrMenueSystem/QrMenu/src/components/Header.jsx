import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const navItems = [
    { label: 'Breakfast', href: '#breakfast' },
    { label: 'Starters', href: '#starters' },
    { label: 'Pizza', href: '#pizza' },
    { label: 'Main Course', href: '#main-course' },
    { label: 'Pasta', href: '#pasta' },
    { label: 'Desserts', href: '#desserts' },
    { label: 'Drinks', href: '#drinks' },
]

export default function Header() {
    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-6"
        >
            <div className="rounded-[32px] border border-white/10 bg-slate-950/40 backdrop-blur-3xl shadow-2xl shadow-slate-950/30 px-5 py-4 backdrop-saturate-150">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/15 text-slate-100">
                            A
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Avery Hotel</p>
                            <p className="text-base font-semibold text-white">Restaurant Menu</p>
                        </div>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center justify-center gap-3 text-slate-300">
                        <div className="hidden gap-3 md:flex">
                            <Instagram size={18} />
                            <Facebook size={18} />
                            <Twitter size={18} />
                        </div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Scroll to explore</p>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}
