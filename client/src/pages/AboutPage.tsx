import React from 'react'

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-semibold">About</h2>
      <p className="text-slate-300 mt-3 max-w-2xl">
        Zamin Hotel is a luxury destination built around comfort, craftsmanship, and a seamless booking experience.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {[{ title: 'Design-first luxury', desc: 'Elegant spaces with premium materials and calm ambience.' }, { title: 'Service that anticipates', desc: 'Concierge-led support and thoughtful guest experiences.' }, { title: 'Secure booking', desc: 'JWT authentication protects user actions and admin workflows.' }, { title: 'Modern amenities', desc: 'Everything you need for a refined stay, from suites to dining.' }].map((c) => (
          <div key={c.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold text-lg">{c.title}</div>
            <div className="text-slate-300 text-sm mt-2">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

