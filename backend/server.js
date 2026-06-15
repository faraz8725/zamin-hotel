require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { connectMongo } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { authRateLimiter } = require('./middleware/rateLimit');

const authRoutes = require('./routes/auth.routes');
const roomsRoutes = require('./routes/rooms.routes');
const bookingRoutes = require('./routes/bookings.routes');
const reviewsRoutes = require('./routes/reviews.routes');
const couponRoutes = require('./routes/coupons.routes');
const cmsRoutes = require('./routes/cms.routes');
const settingsRoutes = require('./routes/settings.routes');
const adminRoutes = require('./routes/admin.routes');
const galleryRoutes = require('./routes/gallery.routes');
const availabilityRoutes = require('./routes/availability.routes');
const paymentRoutes = require('./routes/payments.routes');

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(morgan('dev'));

// Apply rate limiter to auth endpoints
app.use('/api/auth', authRateLimiter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, name: 'Zamin Hotel API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/payments', paymentRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectMongo();
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`[server] listening on ${port}`));
};

start().catch((e) => {
  console.error('Failed to start server:', e);
  process.exit(1);
});

