import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const linkBase =
  'transition-colors text-sm uppercase tracking-widest text-slate-300 hover:text-white'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-200 shadow-lg shadow-amber-500/20" />
          <div className="leading-tight">
            <div className="font-semibold text-white">Zamin Hotel</div>
            <div className="text-[11px] text-slate-300">Luxury Booking</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-white ' + linkBase : linkBase)}>
            Home
          </NavLink>
          <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'text-white ' + linkBase : linkBase)}>
            Rooms
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'text-white ' + linkBase : linkBase)}>
            Gallery
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-white ' + linkBase : linkBase)}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-white ' + linkBase : linkBase)}>
            Contact
          </NavLink>
          <Link to="/booking" className={linkBase}>
            Booking
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <HeaderAuthButtons />
        </div>
      </div>
    </header>
  )
}

function HeaderAuthButtons() {
  const token = localStorage.getItem('accessToken')
  const [me, setMe] = React.useState<{ id: string; name: string; email: string; role: string } | null>(null)

  React.useEffect(() => {
    let active = true
    async function run() {
      if (!token) return
      try {
        const r = await fetch('http://127.0.0.1:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!r.ok) return
        const data = await r.json()
        if (!active) return
        setMe(data?.user || null)
      } catch {
        // ignore
      }
    }
    run()
    return () => {
      active = false
    }
  }, [token])

  if (!me) {
    return (
      <>
        <Link
          to="/login"
          className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-100 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition"
        >
          Register
        </Link>
      </>
    )
  }

  return (
    <Link
      to="/dashboard"
      className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 transition"
      aria-label="Profile"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-200 shadow-lg shadow-amber-500/20" />
    </Link>
  )
}


