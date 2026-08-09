import MenuCard from './MenuCard'

export default function MenuGrid({ items, onOpen, query, onQueryChange }) {
    return (
        <section id="menu" className="scroll-mt-24 px-6 pb-16 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 rounded-[36px] border border-white/10 bg-slate-950/30 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-3xl">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-rose-200/70">Fine dining collection</p>
                            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Explore the menu</h2>
                        </div>
                        <div className="w-full max-w-sm">
                            <label htmlFor="menu-search" className="sr-only">Search menu</label>
                            <input
                                id="menu-search"
                                type="search"
                                value={query}
                                onChange={(e) => onQueryChange(e.target.value)}
                                placeholder="Search by dish, ingredient, or category"
                                className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-rose-300/60 focus:ring-2 focus:ring-rose-300/10"
                            />
                        </div>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-[36px] border border-dashed border-white/10 bg-slate-950/40 p-16 text-center text-slate-300">
                        <p className="text-xl font-semibold text-white">No matching dishes found.</p>
                        <p className="mt-3 max-w-2xl mx-auto text-sm leading-7 text-slate-400">Try another keyword or explore a different category to reveal more of our curated luxury menu.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => (
                            <MenuCard key={item.id} item={item} onOpen={onOpen} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
