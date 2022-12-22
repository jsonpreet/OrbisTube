import { createReactClient, studioProvider } from '@livepeer/react'
export const livepeerClient = () => {
  return createReactClient({
    provider: studioProvider({
      apiKey: process.env.NEXT_PUBLIC_LIVEPEER_KEY,
    }),
  });
}

export const playerTheme = {
  colors: {
    accent: '#fff',
    progressLeft: '#ef466f',
    loading: '#ef466f'
  },
  fonts: {
    display: 'Roboto'
  },
  fontSizes: {
    timeFontSize: '12px'
  },
  space: {
    timeMarginX: '20px'
  },
  sizes: {
    iconButtonSize: '35px',
    loading: '30px',
    thumb: '7px',
    thumbActive: '7px',
    trackActive: '3px',
    trackInactive: '3px'
  },
  radii: {
    containerBorderRadius: '0px',
  },
}