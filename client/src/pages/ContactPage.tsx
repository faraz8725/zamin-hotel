import React, { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-semibold">Contact</h2>
      <p className="text-slate-300 mt-3 max-w-2xl">Send a message and we’ll respond as soon as possible.</p>

      <div className="mt-10 grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-300">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
            </div>
            <div>
              <label className="text-sm text-slate-300">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
            </div>
            <div>
              <label className="text-sm text-slate-300">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
            </div>
            <button className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition" type="submit">
              Send Message
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-b from-white/7 to-white/3 p-6">
          <div className="text-white font-semibold">Direct line</div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex gap-3"><span className="text-amber-300">•</span> +1 (555) 123-4567</div>
            <div className="flex gap-3"><span className="text-amber-300">•</span> reservations@zaminhotel.com</div>
            <div className="flex gap-3"><span className="text-amber-300">•</span> 25 Luxury Avenue, City Center</div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
            This demo UI does not send emails; it resets the form for production-style UX.
          </div>
        </div>
      </div>
    </div>
  )
}

