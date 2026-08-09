import { motion } from 'framer-motion'
import MenuCard from './MenuCard.jsx'

export default function MenuSection({ category }) {
    return (
        <motion.section
            id={category.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="scroll-mt-28 px-6 pb-20 sm:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 max-w-3xl">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{category.number}</p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        {category.name}
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                        {category.description}
                    </p>
                    <div className="mt-8 h-px w-28 rounded-full bg-white/10" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {category.items.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
