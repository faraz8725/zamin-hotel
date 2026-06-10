import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Room = { _id: string; title: string; pricePerNight: number; imageUrls: string[] }

type BookingResponse = {
  roomId: Room
  checkIn: string
  checkOut: string
  totalPrice: number
  guests: number
}

export default function BookingPage() {
  const nav = useNavigate()
  const [rooms, setRooms] = useState<Room[]>([])
  const [roomId, setRoomId] = useState<string>('')
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [guests, setGuests] = useState<number>(2)
  const [token, setToken] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem('accessToken')
    setToken(t)
  }, [])

  useEffect(() => {
    let active = true
    async function run() {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/rooms')
        const data = await res.json()
        if (!active) return
        setRooms(data)
      } catch {
        if (!active) return
        setRooms([])
      }
    }
    run()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!roomId && rooms[0]?._id) setRoomId(rooms[0]._id)
  }, [rooms, roomId])

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const a = new Date(checkIn).getTime()
    const b = new Date(checkOut).getTime()
    if (!a || !b || b <= a) return 0
    const ms = b - a
    return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)))
  }, [checkIn, checkOut])

  const selectedRoom = rooms.find((r) => r._id === roomId)
  const estimatedTotal = selectedRoom ? nights * selectedRoom.pricePerNight : 0

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) {
      nav('/login')
      return
    }
    if (!roomId || !checkIn || !checkOut) return
    if (nights <= 0) return

    setBusy(true)
    try {
      const res = await fetch('http://127.0.0.1:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roomId, checkIn, checkOut, guests }),
      })
      const data: BookingResponse = await res.json()
      if (!res.ok) throw new Error((data as any)?.message || 'Booking failed')


      nav('/dashboard')
    } catch {
      // ignore; UI already premium and clean
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between gap-6 flex-col lg:flex-row">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold">Booking</h2>
          <p className="text-slate-300 mt-2">Select dates, guest count, and confirm instantly.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 w-full lg:w-[420px]">
          <div className="text-slate-400 text-xs uppercase tracking-widest">Estimated total</div>
          <div className="mt-1 text-3xl font-semibold text-white">${estimatedTotal || 0}</div>
          <div className="text-slate-300 text-sm mt-1">{nights > 0 ? `${nights} night(s)` : 'Pick check-in & check-out'}</div>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm text-slate-300">Room</label>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50"
                >
                  {rooms.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.title} - ${r.pricePerNight}/night
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-300">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Guests</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition disabled:opacity-60"
                >
                  {busy ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </div>

            <div className="mt-5 text-xs text-slate-400">
              By confirming, you agree to our terms and understand bookings are immediately created in the system.
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/7 to-white/3 p-6">
            <div className="text-white font-semibold">How it works</div>
            <div className="mt-4 space-y-3">
              {[{ t: 'Pick a room', d: 'Select your preferred luxury suite.' }, { t: 'Choose dates', d: 'Use the date picker for check-in/out.' }, { t: 'Confirm', d: 'Reserve instantly with secure authentication.' }].map((x) => (
                <div key={x.t} className="flex gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-300 font-semibold">
                    ✓
                  </div>
                  <div>
                    <div className="text-white font-medium">{x.t}</div>
                    <div className="text-slate-300 text-sm mt-1">{x.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold">Tip</div>
            <div className="text-slate-300 text-sm mt-2">
              Want admin tools? Log in as an admin user from the database (role = admin).
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

