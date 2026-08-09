import { motion } from 'framer-motion'
import { ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react'

const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Chef’s Specials', href: '#specials' },
    { label: 'Info', href: '#info' },
]

export default function Navbar() {
    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="sticky top-4 z-40 mx-auto w-full max-w-7xl px-6"
        >
            <div className="backdrop-blur-3xl border border-white/10 bg-slate-950/35 shadow-2xl shadow-slate-950/20 rounded-3xl px-5 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4 text-slate-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/10">
                        <span className="text-xl font-semibold">L</span>
                    </div>
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Luna House</p>
                        <p className="text-base font-medium">Signature Restaurant</p>
                    </div>
                </div>
                <nav className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
                    {links.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="rounded-full px-4 py-2 text-sm transition hover:bg-white/10 hover:text-white"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center justify-center gap-3 text-slate-300">
                    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
                        Book a Table <ChevronRight size={16} />
                    </button>
                    <div className="hidden gap-3 text-slate-400 md:flex">
                        <Instagram size={18} />
                        <Facebook size={18} />
                        <Twitter size={18} />
                    </div>
                </div>
            </div>
        </motion.header>
    )
}
