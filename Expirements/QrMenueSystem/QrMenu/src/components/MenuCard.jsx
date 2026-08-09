import { motion } from 'framer-motion'

export default function MenuCard({ item }) {
    return (
        <motion.article
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="group overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/40 shadow-2xl shadow-slate-950/20 backdrop-blur-3xl transition-transform duration-300"
        >
            <div className="relative overflow-hidden bg-slate-950/20">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="space-y-4 p-6">
                <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
                    <p className="text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
                <div className="flex justify-end text-xl font-semibold text-white">{item.price}</div>
            </div>
        </motion.article>
    )
}
