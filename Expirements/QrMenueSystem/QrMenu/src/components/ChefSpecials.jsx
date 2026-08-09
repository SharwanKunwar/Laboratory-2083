import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function ChefSpecials({ items, onOpen }) {
    return (
        <section id="specials" className="scroll-mt-24 px-6 pb-16 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-3">
                    <p className="text-sm uppercase tracking-[0.35em] text-rose-200/70">Chef’s Specials</p>
                    <h2 className="text-3xl font-semibold text-white sm:text-4xl">Highlighted culinary signatures.</h2>
                    <p className="max-w-3xl text-sm leading-7 text-slate-300">
                        These dishes are selected for their exceptional flavor, presentation, and memorable dining experience.
                    </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    {items.map((item) => (
                        <motion.article
                            key={item.id}
                            whileHover={{ y: -6 }}
                            className="group overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/40 shadow-2xl shadow-slate-950/20 backdrop-blur-3xl"
                        >
                            <div className="relative h-96 overflow-hidden">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                                <div className="absolute left-6 bottom-6 flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 backdrop-blur-xl">
                                    <Star size={16} className="text-rose-300" /> Featured luxury plate
                                </div>
                            </div>
                            <div className="space-y-4 p-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.35em] text-rose-200/70">{item.category}</p>
                                        <h3 className="mt-3 text-2xl font-semibold text-white">{item.name}</h3>
                                    </div>
                                    <div className="rounded-3xl bg-slate-900/80 px-5 py-3 text-lg font-semibold text-rose-200 ring-1 ring-white/10">
                                        ${item.price}
                                    </div>
                                </div>
                                <p className="text-sm leading-7 text-slate-300">{item.description}</p>
                                <button
                                    onClick={() => onOpen(item)}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-rose-300/40 hover:bg-rose-300/10"
                                >
                                    View Dish
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
