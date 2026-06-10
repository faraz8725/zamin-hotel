import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="text-white font-semibold text-lg">Zamin Hotel</div>
          <p className="text-slate-300 text-sm mt-2">
            A modern luxury stay experience with curated rooms, seamless booking, and premium service.
          </p>
        </div>
        <div>
          <div className="text-white font-semibold">Explore</div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            <Link to="/rooms" className="hover:text-white">Rooms</Link>
            <Link to="/gallery" className="hover:text-white">Gallery</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <div className="text-white font-semibold">Booking</div>
          <p className="text-slate-300 text-sm mt-3">
            Use the booking form to reserve your preferred suite.
          </p>
          <Link
            to="/booking"
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition text-slate-100 font-semibold"
          >
            Book now
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="text-xs text-slate-500">© {new Date().getFullYear()} Zamin Hotel. All rights reserved.</div>
      </div>
    </footer>
  )
}

