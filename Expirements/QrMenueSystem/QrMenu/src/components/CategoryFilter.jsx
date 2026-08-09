import { motion, useReducedMotion } from 'framer-motion'

export default function CategoryFilter({ categories, activeCategory, onChange }) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <section className="scroll-mt-24 px-6 py-4 sm:px-8">
            <div className="mx-auto max-w-7xl overflow-x-auto pb-2">
                <div className="flex gap-4 whitespace-nowrap">
                    {categories.map((category) => {
                        const active = category === activeCategory
                        return (
                            <motion.button
                                key={category}
                                whileHover={{ y: shouldReduceMotion ? 0 : -2 }}
                                whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${active
                                        ? 'border-rose-300/40 bg-rose-300/15 text-rose-100 shadow-[0_0_40px_rgba(236,72,153,0.12)]'
                                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                                    }`}
                                onClick={() => onChange(category)}
                            >
                                {category}
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
