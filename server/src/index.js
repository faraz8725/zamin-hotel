import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { errorHandler, notFoundHandler } from './middleware/errors.js'
import { connectDB } from './db/connect.js'

dotenv.config()


const app = express()

app.use(helmet())
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(morgan('dev'))

app.get('/health', (req, res) => res.json({ ok: true }))

app.use('/api', routes)


app.get('/api/seed', async (req, res) => {
  // Optional seed endpoint: creates a few rooms for first run
  // ADMIN not required for simplicity; you can lock it down later.
  // Expected images can be provided from client via image URLs.
  const Room = (await import('./models/room.model.js')).default

  const rooms = [
    {
      title: 'Royal Suite',
      slug: 'royal-suite',
      description: 'Spacious suite with a private lounge and breathtaking views.',
      imageUrls: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      ],
      pricePerNight: 320,
      capacity: 3,
      amenities: ['King bed', 'Lounge', 'City view'],
      isActive: true,
    },
    {
      title: 'Oceanfront Deluxe',
      slug: 'oceanfront-deluxe',
      description: 'Wake up to the ocean horizon with premium comfort and serenity.',
      imageUrls: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      ],
      pricePerNight: 260,
      capacity: 2,
      amenities: ['Ocean view', 'Rain shower', 'Balcony'],
      isActive: true,
    },
    {
      title: 'Executive Studio',
      slug: 'executive-studio',
      description: 'A refined studio designed for restful nights and focused mornings.',
      imageUrls: [
        'https://images.unsplash.com/photo-1560067174-8943bd0e3b6c?auto=format&fit=crop&w=1200&q=80',
      ],
      pricePerNight: 180,
      capacity: 2,
      amenities: ['Work desk', 'Smart TV', 'Premium linens'],
      isActive: true,
    },
  ]

  const created = []
  for (const r of rooms) {
    const existing = await Room.findOne({ slug: r.slug })
    if (!existing) created.push(await Room.create(r))
  }

  res.json({ seeded: created.length, rooms: rooms.map((r) => r.slug) })
})

app.use(notFoundHandler)
app.use(errorHandler)

async function start() {
  await connectDB()

  const port = process.env.PORT || 5000
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`)
  })
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err)
  process.exit(1)
})


