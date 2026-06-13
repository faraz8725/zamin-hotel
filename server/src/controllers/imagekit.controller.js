import crypto from 'crypto'

// Creates an ImageKit signature for client-side direct uploads.
// Uses ImageKit Private Key + current timestamp.
export async function getUploadSignature(req, res) {
  try {
    const {
      filename = 'upload',
      fileType = 'image',
      size = 0,
    } = req.body || {}

    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

    if (!publicKey || !privateKey || !urlEndpoint) {
      return res.status(500).json({ message: 'ImageKit is not configured on server' })
    }

    const folder = process.env.IMAGEKIT_FOLDER || ''
    const expiresInMs = Number(process.env.IMAGEKIT_SIGNATURE_TIMEOUT || 600000)

    const expireAt = Date.now() + expiresInMs
    const timestamp = Math.floor(expireAt / 1000)

    // Recommended by ImageKit for signature generation
    const signaturePayload = `${publicKey}${fileType}${timestamp}`
    const signature = crypto
      .createHmac('sha256', privateKey)
      .update(signaturePayload)
      .digest('base64')

    // Note: folder can be set by client; keep minimal.
    return res.json({
      signature,
      expireAt: String(expireAt),
      token: publicKey,
      urlEndpoint,
      folder,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create ImageKit signature' })
  }
}

