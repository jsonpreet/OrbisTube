import { IMAGE_CDN_URL } from '../constants'

const imageCdn = ( url, type ) => {
  if (!url || !IMAGE_CDN_URL) return url
  return type
    ? `${IMAGE_CDN_URL}/tr:n-${type},tr:di-placeholder.webp,pr-true/${url}`
    : `${IMAGE_CDN_URL}/tr:di-placeholder.webp/${url}`
}

export default imageCdn