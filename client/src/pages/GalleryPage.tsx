import React from 'react'

const images = [
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560067174-8943bd0e3b6c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
]

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-semibold">Gallery</h2>
      <p className="text-slate-300 mt-3 max-w-2xl">A glimpse into refined spaces and premium comfort.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <div key={src} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 group">
            <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-72 object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
          </div>
        ))}
      </div>
    </div>
  )
}

