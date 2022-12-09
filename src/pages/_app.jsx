import '../styles/globals.scss'
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import Layout from '@components/Common/Layout';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '@context/app';
import { Orbis } from '@orbisclub/orbis-sdk';

/** Import TimeAgo globally */
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import usePersistStore from '@app/store/persist';
en.long.minute = {
  current: "this minute",
  future: {one: '{0} min.', other: '{0} min.'},
  past: {one: '{0} min. ago', other: '{0} mins. ago'}
}
TimeAgo.addLocale(en);

/** Initiate the Orbis class object */
let orbis = new Orbis();

function MyApp({ Component, pageProps }) {
  const { user, setUser} = usePersistStore()
  const [supabase] = useState(() => createBrowserSupabaseClient())
  useEffect(() => {
    if(!user) {
      checkUserIsConnected();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  /** We call this function on launch to see if the user has an existing Ceramic session. */
  async function checkUserIsConnected() {
    let res = await orbis.isConnected();

    /** If SDK returns user details we save it in state */
    if(res && res.status == 200) {
      setUser(res.details);
    }
  }
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
          <GlobalContext.Provider value={{ user, setUser, orbis }}>
            <SessionContextProvider
              supabaseClient={supabase}
              initialSession={pageProps.initialSession}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionContextProvider>
          </GlobalContext.Provider>
        </LivepeerConfig>
      </ThemeProvider>
    </>
  )
}

export default MyApp
