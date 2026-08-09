import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Clock3, MapPin, AlertTriangle } from 'lucide-react'

export default function FoodModal({ item, open, onClose }) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <AnimatePresence>
            {open && item ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 40, opacity: 0, scale: 0.98 }}
                        transition={{ duration: shouldReduceMotion ? 0.2 : 0.35, type: 'spring', stiffness: 260, damping: 24 }}
                        className="w-full max-w-4xl overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/95 shadow-2xl shadow-slate-950/30"
                    >
                        <div className="relative">
                            <img src={item.image} alt={item.name} className="h-80 w-full object-cover" />
                            <button
                                onClick={onClose}
                                className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/80 text-white transition hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-8 p-8 lg:p-10">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.35em] text-rose-200/70">Signature dish</p>
                                    <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{item.name}</h2>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{item.description}</p>
                                </div>
                                <div className="rounded-[32px] bg-slate-900/70 px-6 py-4 text-right text-slate-100 ring-1 ring-white/10">
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Starting from</p>
                                    <p className="mt-3 text-3xl font-semibold text-rose-200">${item.price}</p>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Ingredients</p>
                                    <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                        {item.ingredients.map((ingredient) => (
                                            <li key={ingredient} className="flex items-center gap-2 before:h-1 before:w-1 before:rounded-full before:bg-rose-300">
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Details</p>
                                    <div className="mt-4 space-y-3 text-sm text-slate-200">
                                        <p className="flex items-center gap-2 text-slate-300"><Clock3 size={16} /> Preparation: {item.prepTime}</p>
                                        <p className="flex items-center gap-2 text-slate-300"><MapPin size={16} /> Dietary: {item.dietary}</p>
                                        <p className="flex items-center gap-2 text-slate-300"><AlertTriangle size={16} /> Allergens: {item.allergens.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-200">
                                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Serving note</p>
                                    <p className="mt-4 leading-7 text-slate-300">
                                        A beautifully balanced plate that pairs with our sommelier’s recommended wine selection. Perfect for guests seeking a refined culinary signature.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
