import { MapPin, Clock8, Phone, Layers } from 'lucide-react'

export default function RestaurantInfo() {
    return (
        <section id="info" className="scroll-mt-24 px-6 pb-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-[36px] border border-white/10 bg-slate-950/40 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-3xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-rose-200/70">Restaurant information</p>
                        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Luxury hospitality details.</h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                            Discover opening hours, location, and our attentive in-room dining service designed for the discerning guest.
                        </p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <div className="flex items-center gap-3 text-rose-200">
                                    <Clock8 size={22} />
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Opening Hours</p>
                                        <p className="mt-2 text-base font-semibold text-slate-100">7:00 AM – 11:00 PM daily</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <div className="flex items-center gap-3 text-slate-100">
                                    <MapPin size={22} />
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Location</p>
                                        <p className="mt-2 text-base font-semibold text-slate-100">Luna House, 51 Crystal Avenue, Santorini</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <div className="flex items-center gap-3 text-slate-100">
                                    <Phone size={22} />
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Contact</p>
                                        <p className="mt-2 text-base font-semibold text-slate-100">+1 (555) 904-0218</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <div className="flex items-center gap-3 text-slate-100">
                                    <Layers size={22} />
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Table service</p>
                                        <p className="mt-2 text-base font-semibold text-slate-100">In-room priority dining with valet-style service.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/40 shadow-2xl shadow-slate-950/20 backdrop-blur-3xl">
                            <div className="h-96 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
                            <div className="p-6">
                                <p className="text-sm uppercase tracking-[0.35em] text-rose-200/70">Map placeholder</p>
                                <p className="mt-4 text-sm leading-7 text-slate-300">
                                    A refined view of our location. Enjoy doorstep dining and intuitive navigation in the hotel restaurant.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-slate-950/60 to-slate-900/70 p-6 text-slate-200">
                            <h3 className="text-2xl font-semibold text-white">Reserve the perfect table.</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-300">
                                Our hotel restaurant is ready to welcome guests with calm energy, thoughtful service, and atmosphere designed for memorable evenings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
