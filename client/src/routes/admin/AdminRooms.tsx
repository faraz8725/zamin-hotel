import React, { useEffect, useState } from 'react'
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

export default function AdminRooms() {
  const token = localStorage.getItem('accessToken')
  const [rooms, setRooms] = useState<Room[]>([])
  const [busy, setBusy] = useState(false)

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    imageUrls: '',
    pricePerNight: '200',
    capacity: '2',
    amenities: '',
    isActive: true,
  })

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

  async function createRoom(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    try {
      const body = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        imageUrls: form.imageUrls ? form.imageUrls.split(',').map((s) => s.trim()) : [],
        pricePerNight: Number(form.pricePerNight),
        capacity: Number(form.capacity),
        amenities: form.amenities ? form.amenities.split(',').map((s) => s.trim()) : [],
        isActive: form.isActive,
      }

      const res = await fetch('http://127.0.0.1:5000/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed')

      const rm = await fetch('http://127.0.0.1:5000/api/rooms')
      const roomsData = await rm.json()
      setRooms(roomsData)

      setForm({
        title: '',
        slug: '',
        description: '',
        imageUrls: '',
        pricePerNight: '200',
        capacity: '2',
        amenities: '',
        isActive: true,
      })
    } catch {
      // ignore
    } finally {
      setBusy(false)
    }
  }

  async function removeRoom(id: string) {
    setBusy(true)
    try {
      await fetch(`http://127.0.0.1:5000/api/rooms/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const rm = await fetch('http://127.0.0.1:5000/api/rooms')
      const roomsData = await rm.json()
      setRooms(roomsData)
    } catch {
      // ignore
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold">Admin - Rooms</h2>
          <p className="text-slate-300 mt-2">Manage room inventory and pricing.</p>
        </div>
        <Link to="/dashboard" className="text-amber-300 hover:underline text-sm">Back to Dashboard</Link>
      </div>

      <form onSubmit={createRoom} className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-white font-semibold text-lg">Create room</div>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Title" className="px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="Slug" className="px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          <textarea required value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Description" rows={3} className="sm:col-span-2 px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          <input value={form.imageUrls} onChange={(e) => setForm((f) => ({ ...f, imageUrls: e.target.value }))} placeholder="Image URLs (comma-separated)" className="sm:col-span-2 px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          <input value={form.pricePerNight} onChange={(e) => setForm((f) => ({ ...f, pricePerNight: e.target.value }))} placeholder="Price per night" className="px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          <input value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))} placeholder="Capacity" className="px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          <input value={form.amenities} onChange={(e) => setForm((f) => ({ ...f, amenities: e.target.value }))} placeholder="Amenities (comma-separated)" className="sm:col-span-2 px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          <label className="sm:col-span-2 flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} />
            Active (visible to guests)
          </label>
          <button disabled={busy} className="sm:col-span-2 inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition disabled:opacity-60" type="submit">
            {busy ? 'Creating...' : 'Create Room'}
          </button>
        </div>
      </form>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-lg">Existing rooms</div>
          <div className="text-sm text-slate-400">Total: {rooms.length}</div>
        </div>

        <div className="mt-4 space-y-3">
          {rooms.map((r) => (
            <div key={r._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-white/10 rounded-2xl bg-white/5 p-4">
              <div className="flex items-center gap-4">
                <img src={r.imageUrls?.[0]} alt={r.title} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                <div>
                  <div className="text-white font-medium">{r.title}</div>
                  <div className="text-slate-300 text-sm">${r.pricePerNight}/night • {r.capacity} guests</div>
                  <div className="text-slate-400 text-xs">slug: {r.slug}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => removeRoom(r._id)}
                  className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-slate-100 text-sm"
                >
                  Delete
                </button>
                <Link to={`/rooms/${r._id}`} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold hover:shadow-amber-400/40 transition text-sm inline-flex items-center justify-center">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

