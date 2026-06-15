const sanitizeHtml = require('sanitize-html');

const sanitizeString = (value) => {
  if (typeof value !== 'string') return value;
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {}
  });
};

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);

  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') out[k] = sanitizeString(v);
    else if (v && typeof v === 'object') out[k] = sanitizeObject(v);
    else out[k] = v;
  }
  return out;
};

module.exports = { sanitizeObject };

