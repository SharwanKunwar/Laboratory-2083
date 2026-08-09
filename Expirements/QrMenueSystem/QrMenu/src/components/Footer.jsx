import { Instagram, Facebook, Twitter, MapPin, Phone, Clock } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950/60 px-6 py-14 text-slate-300 backdrop-blur-3xl sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Avery Hotel</p>
                    <h2 className="text-3xl font-semibold text-white">Restaurant & Dining</h2>
                    <p className="max-w-xl leading-8 text-slate-400">
                        Experience refined dining in a polished hotel setting where each dish is designed to be elegant, memorable, and beautifully presented.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/40 p-6 shadow-2xl shadow-slate-950/20">
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Opening Hours</p>
                        <p className="text-base text-white">Mon – Sun</p>
                        <p className="text-sm text-slate-400">7:00 AM – 11:00 PM</p>
                    </div>
                    <div className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/40 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex items-center gap-3 text-slate-300">
                            <MapPin size={18} />
                            <p>145 Willow Street, New York</p>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                            <Phone size={18} />
                            <p>+1 (212) 555-0148</p>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                            <Clock size={18} />
                            <p>Room service & dining reservations</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>© 2026 Avery Hotel. All rights reserved.</p>
                <div className="flex items-center gap-4 text-slate-400">
                    <Instagram size={18} />
                    <Facebook size={18} />
                    <Twitter size={18} />
                </div>
            </div>
        </footer>
    )
}
