import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Room = {
  _id: string
  title: string
  slug: string
  description: string
  imageUrls: string[]
  pricePerNight: number
  capacity: number
  amenities: string[]
}

type Review = { _id: string; rating: number; comment: string; userId: { name: string } }

export default function RoomDetailsPage() {
  const { roomId } = useParams()
  const [room, setRoom] = useState<Room | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    let active = true
    async function run() {
      try {
        const r = await fetch(`http://127.0.0.1:5000/api/rooms/${roomId}`)
        const roomData = await r.json()
        if (!active) return
        setRoom(roomData)

        const revRes = await fetch(`http://127.0.0.1:5000/api/reviews/${roomId}`)
        const revData = await revRes.json()
        if (!active) return
        setReviews(revData)
      } catch {
        if (!active) return
        setRoom(null)
      }
    }
    run()
    return () => {
      active = false
    }
  }, [roomId])

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-slate-300">Loading...</div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
            <img src={room.imageUrls?.[0]} alt={room.title} className="w-full h-[420px] object-cover" />
          </div>

          <div className="mt-6">
            <div className="text-white text-2xl font-semibold">{room.title}</div>
            <div className="text-slate-300 mt-2">{room.description}</div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 text-sm">
                {room.capacity} guests
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 text-sm">
                Starting ${room.pricePerNight}/night
              </span>
              {(room.amenities || []).map((a) => (
                <span key={a} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 text-sm">
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold text-xl">Guest Reviews</div>
              <Link to="/booking" className="text-amber-300 text-sm hover:underline">
                Book & review
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {reviews.length === 0 ? (
                <div className="text-slate-300 text-sm border border-white/10 rounded-2xl bg-white/5 p-4">
                  No reviews yet.
                </div>
              ) : (
                reviews.map((rev) => (
                  <div key={rev._id} className="border border-white/10 rounded-2xl bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-white font-medium">{rev.userId?.name || 'Guest'}</div>
                      <div className="text-amber-300 font-semibold">{rev.rating}★</div>
                    </div>
                    {rev.comment ? <div className="text-slate-300 mt-2 text-sm">{rev.comment}</div> : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/7 to-white/3 p-6 shadow-2xl shadow-black/20">
            <div className="text-white font-semibold text-lg">Reserve this room</div>
            <div className="mt-2 text-slate-300 text-sm">Secure your stay in minutes.</div>
            <div className="mt-6">
              <Link
                to="/booking"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition"
              >
                Booking Form
              </Link>
              <div className="mt-4 text-xs text-slate-400">
                Select check-in/check-out dates and confirm.
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="text-white font-semibold">Why guests choose us</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Quiet, premium environment</li>
                <li>• Concierge support</li>
                <li>• Secure booking experience</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-3xl overflow-hidden border border-white/10 bg-white/5">
            <div className="p-6">
              <div className="text-white font-semibold">Room highlights</div>
              <div className="mt-3 text-sm text-slate-300">
                {room.amenities?.slice(0, 6).map((a) => (
                  <div key={a} className="flex items-center gap-2 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
            <img
              src={room.imageUrls?.[0]}
              alt="room"
              className="w-full h-40 object-cover opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

