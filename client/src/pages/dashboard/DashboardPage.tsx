import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Booking = {
  _id: string
  checkIn: string
  checkOut: string
  totalPrice: number
  guests: number
  roomId: { title: string; imageUrls: string[]; pricePerNight: number }
}

type Me = { user: { id: string; name: string; email: string; role: string } }

type Analytics = { totalRooms: number; totalUsers: number; totalBookings: number; last7: { date: string; count: number }[] }

type Room = { _id: string; title: string; slug: string; pricePerNight: number; isActive: boolean; imageUrls: string[]; description: string; capacity: number; amenities: string[] }

export default function DashboardPage() {
  const [me, setMe] = useState<Me['user'] | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])

  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    let active = true
    async function run() {
      try {
        const r = await fetch('http://127.0.0.1:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await r.json()
        if (!active) return
        setMe(data.user)

        if (data.user?.role === 'admin') {
          const a = await fetch('http://127.0.0.1:5000/api/admin/analytics', {
            headers: { Authorization: `Bearer ${token}` },
          })
          const ad = await a.json()
          if (!active) return
          setAnalytics(ad)

          const rm = await fetch('http://127.0.0.1:5000/api/rooms', {
            headers: { Authorization: `Bearer ${token}` },
          })
          const roomsData = await rm.json()
          if (!active) return
          setRooms(roomsData)
        }

        const b = await fetch('http://127.0.0.1:5000/api/bookings/mine', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const bd = await b.json()
        if (!active) return
        setBookings(bd)
      } catch {
        // ignore
      }
    }
    run()
    return () => {
      active = false
    }
  }, [token])

  const isAdmin = me?.role === 'admin'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold">Dashboard</h2>
          <p className="text-slate-300 mt-2">Welcome{me?.name ? `, ${me.name}` : ''}.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/rooms"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition text-slate-100 font-semibold"
          >
            Browse Rooms
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition"
          >
            Book
          </Link>
        </div>
      </div>

      {/* Admin analytics */}
      {isAdmin && analytics ? (
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[{ k: 'Total Rooms', v: analytics.totalRooms }, { k: 'Total Users', v: analytics.totalUsers }, { k: 'Total Bookings', v: analytics.totalBookings }].map((x) => (
            <div key={x.k} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-widest text-slate-400">{x.k}</div>
              <div className="mt-2 text-3xl font-semibold text-white">{x.v}</div>
            </div>
          ))}

          <div className="md:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold">Last 7 days bookings</div>
            <div className="mt-4 grid grid-cols-7 gap-2 items-end h-40">
              {analytics.last7.map((d) => (
                <div key={d.date} className="flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-xl bg-gradient-to-t from-amber-400/70 to-amber-300/20 border border-amber-300/20"
                    style={{ height: `${Math.max(8, Math.min(100, d.count * 10))}px` }}
                  />
                  <div className="text-[10px] text-slate-400">{d.date.slice(5)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* User bookings */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-xl">Your bookings</div>
          {isAdmin ? (
            <Link
              to="/admin"
              className="text-amber-300 text-sm hover:underline"
            >
              Admin management
            </Link>
          ) : null}
        </div>

        <div className="mt-4 space-y-3">
          {bookings.length === 0 ? (
            <div className="text-slate-300 text-sm border border-white/10 rounded-2xl bg-white/5 p-4">No bookings yet.</div>
          ) : (
            bookings.map((b) => (
              <div key={b._id} className="border border-white/10 rounded-2xl bg-white/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={b.roomId?.imageUrls?.[0]} alt={b.roomId?.title} className="w-14 h-14 rounded-2xl object-cover border border-white/10" />
                  <div>
                    <div className="text-white font-medium">{b.roomId?.title}</div>
                    <div className="text-slate-300 text-sm mt-1">{new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-amber-300 font-semibold">${b.totalPrice}</div>
                    <div className="text-slate-400 text-xs">Total</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{b.guests}</div>
                    <div className="text-slate-400 text-xs">Guests</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

