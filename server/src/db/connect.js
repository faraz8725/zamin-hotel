import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }

  mongoose.set('strictQuery', true)

  // Register reconnect handler after connection object is initialized.
  // (Doing it before connect can be unreliable.)
  mongoose.connection.on('disconnected', () => {
    // eslint-disable-next-line no-console
    console.warn('MongoDB disconnected')
  })

  await mongoose.connect(uri)
  return mongoose.connection
}


