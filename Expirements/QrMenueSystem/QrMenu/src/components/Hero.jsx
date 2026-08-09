import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Hero() {
    return (
        <section id="home" className="relative overflow-hidden px-6 pb-24 pt-20 sm:pb-32">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_28%),_linear-gradient(180deg,_rgba(7,12,26,0.92),_rgba(10,14,24,0.96))]" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-60" />
            <div className="absolute inset-0 bg-slate-950/40" />

            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="mx-0 mt-6 flex flex-col gap-8 rounded-[40px] border border-white/10 bg-slate-950/35 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl sm:p-12"
                >
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.35em] text-slate-200/80">
                        <Sparkles size={16} /> Curated culinary reflections
                    </div>
                    <div className="space-y-6 text-center">
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Avery Hotel</p>
                        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                            Restaurant & Dining
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                            Discover carefully prepared dishes made with fresh ingredients and served with the warmth of our hospitality.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <a
                            href="#breakfast"
                            className="inline-flex items-center justify-center rounded-full bg-white/95 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
                        >
                            Explore Menu ↓
                        </a>
                        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-200">
                            Elegant dining, limitless discovery.
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
