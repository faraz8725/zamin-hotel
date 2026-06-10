import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Room = {
  _id: string
  title: string
  slug: string
  description: string
  imageUrls: string[]
  pricePerNight: number
  capacity: number
  amenities: string[]
  isActive: boolean
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')

  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    return params.toString()
  }, [q, minPrice, maxPrice])

  useEffect(() => {
    let active = true
    async function run() {
      setLoading(true)
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/rooms?${query}`)
        const data = await res.json()
        if (!active) return
        setRooms(data)
      } catch {
        if (!active) return
        setRooms([])
      } finally {
        if (active) setLoading(false)
      }
    }
    run()
    return () => {
      active = false
    }
  }, [query])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold">Rooms</h2>
          <p className="text-slate-300 mt-2">Choose your luxury suite and reserve instantly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-[520px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50"
          />
          <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min price"
            inputMode="numeric"
            className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50"
          />
          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
            inputMode="numeric"
            className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50"
          />
          <Link
            to="/booking"
            className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition"
          >
            Book Dates
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-slate-300 text-center py-14 border border-white/10 rounded-3xl bg-white/5">
            No rooms found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((r) => (
              <Link
                key={r._id}
                to={`/rooms/${r._id}`}
                className="group rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/7 transition"
              >
                <div className="relative h-56">
                  <img
                    src={r.imageUrls?.[0]}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur border border-white/10 text-xs text-slate-200">
                    {r.capacity} guests
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-white font-semibold text-lg">{r.title}</div>
                      <div className="text-slate-300 text-sm mt-1 line-clamp-2">{r.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-300 font-semibold">${r.pricePerNight}</div>
                      <div className="text-slate-400 text-xs">/night</div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(r.amenities || []).slice(0, 3).map((a) => (
                      <span key={a} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

