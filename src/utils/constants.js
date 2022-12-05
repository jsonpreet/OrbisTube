export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/quicktime'
]

export const APP = {
  Name: 'Videso',
  URL: 'https://videso.xyz',
  Description: 'Videso is a decentralized video-sharing social media platform built with DeSo.',
  Twitter: 'VidesoApp',
  PublicKeyBase58Check: 'BC1YLiHYuaqQc1r5UFvJ3G8eMYawk693wVGiTHmBQtr9DK8NQXt14oJ',
  Meta: {
    image: `/meta.png`,
    type: 'website',
  }
}

export const WEB3_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzNGI1OTY0MUYzODA5ODcwN2NCNzIyZkU1MzVlZTc2MzBmNjZiOTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAyNzM1OTg4ODksIm5hbWUiOiJ2b3JiaXMifQ.Kr9ZTOzckP2nEJRwMWW8rhu7WsW9EvxoM8sSnXlfa9M';
export const FLEEK_API_KEY = 'Xb6YGkmq8uEZygvPtAdvgg==';
export const FLEEK_API_SECRET = '2L1G5sygEpMbMYWy/X6dQ4w8mpG/xQa1vg+KluO6lsg=';
export const FLEEK_BUCKET = '21b51aba-8282-4ef2-9094-9bdf26ab4427-bucket';
export const FLEEK_OPTIONS = [
  'data',
  'bucket',
  'key',
  'hash',
  'publicUrl'
]

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://videso.xyz';