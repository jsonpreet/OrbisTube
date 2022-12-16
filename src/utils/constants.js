export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/quicktime'
]


export const APP = {
  Name: 'OrbisTube',
  URL: 'https://orbistube.xyz',
  Description: 'OrbisTube is a decentralized video-sharing social media platform built with Orbis.',
  Twitter: 'OrbisTube',
  Meta: {
    image: `/meta.png`,
    type: 'website',
  }
}

export const DEFAULT_SEO = {
  title: "OrbisTube",
  description: "OrbisTube is a decentralized video-sharing social media platform built with Orbis.",
  canonical: "https://orbistube.xyz",
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://orbistube.xyz',
    siteName: 'OrbisTube',
    title: "OrbisTube",
    description: "OrbisTube is a decentralized video-sharing social media platform built with Orbis.",
    images: [
      {
        url: 'https://orbistube.xyz/meta.png',
        width: 1200,
        height: 630,
        alt: 'OrbisTube',
      },
    ],
  },
};

export const APP_CONTEXT = 'kjzl6cwe1jw146citufva4acuo2s64ld0gxap1w2q3rdp54o4y7uu6n2vavfc1l' //'21b51aba82824ef290949bdf26ab4427';

export const WEB3_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzNGI1OTY0MUYzODA5ODcwN2NCNzIyZkU1MzVlZTc2MzBmNjZiOTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAyNzM1OTg4ODksIm5hbWUiOiJ2b3JiaXMifQ.Kr9ZTOzckP2nEJRwMWW8rhu7WsW9EvxoM8sSnXlfa9M';

export const IMAGE_CDN_URL = 'https://ik.imagekit.io/gzmagoxn0r'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://orbistube.xyz';
export const VIDEO_CDN_URL = 'https://cdn.livepeer.com'