import '../styles/globals.scss'
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import Layout from '@app/components/Common/Layout';
import { useMemo } from 'react';

function MyApp({ Component, pageProps }) {

  const livepeerClient = useMemo(() => {
    return createReactClient({
      provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_LIVEPEER_KEY,
      }),
    });
  }, []);

  return (
    <>
      <ThemeProvider enableSystem={false} attribute="class">
        <NextNProgress color="#db2777" showOnShallow={true} />
        <LivepeerConfig dehydratedState={pageProps?.dehydratedState} client={livepeerClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LivepeerConfig>
      </ThemeProvider>
    </>
  )
}

export default MyApp
