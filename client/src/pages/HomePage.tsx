import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.0),rgba(2,6,23,1))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.8)]" />
                Premium stays • Curated rooms • Seamless booking
              </div>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                Luxury hotel booking, crafted for unforgettable nights.
              </h1>
              <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-xl">
                Explore refined suites, reserve your dates in seconds, and enjoy exclusive amenities designed for comfort.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/rooms"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition"
                >
                  Explore Rooms
                </Link>
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 text-slate-100 font-semibold transition"
                >
                  Book Now
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {["Royal Suites", "24/7 concierge", "Ocean views", "Private lounges"].map((t) => (
                  <div key={t} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm">
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                <img
                  src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=1400&q=80"
                  alt="Luxury hotel"
                  className="w-full h-full object-cover scale-105 animate-[zoomIn_900ms_ease-out_forwards]"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 sm:-left-2 bg-slate-950/80 backdrop-blur border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">
                <div className="text-xs uppercase tracking-widest text-slate-400">Starting from</div>
                <div className="text-3xl font-semibold text-white">$180</div>
                <div className="text-sm text-slate-300">per night • limited availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick features */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Signature service', desc: 'Dedicated concierge for a flawless stay.' },
              { title: 'Luxury interiors', desc: 'Refined design with premium comfort.' },
              { title: 'Real-time booking', desc: 'Pick dates and confirm instantly.' },
              { title: 'Secure authentication', desc: 'JWT-based user access and admin tools.' },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition"
              >
                <div className="text-white font-semibold">{f.title}</div>
                <div className="text-slate-300 text-sm mt-2">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

