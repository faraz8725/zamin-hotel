import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    try {
      const res = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Login failed')

      localStorage.setItem('accessToken', data.accessToken)
      nav('/dashboard')
    } catch {
      // no-op
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-white font-semibold text-2xl">Login</div>
        <div className="text-slate-300 text-sm mt-2">Access your bookings and admin dashboard.</div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          </div>
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-2 w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 outline-none focus:ring-2 focus:ring-amber-400/50" />
          </div>
          <button disabled={busy} className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition disabled:opacity-60" type="submit">
            {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-5 text-sm text-slate-300">
          No account?{' '}
          <Link to="/register" className="text-amber-300 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

