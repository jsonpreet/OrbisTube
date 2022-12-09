import { ThemeProvider } from 'next-themes';
import '@rainbow-me/rainbowkit/styles.css';
import usePersistStore from '@app/store/persist';
import { Orbis } from '@orbisclub/orbis-sdk';
import { GlobalContext } from '@context/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useEffect, useMemo, useState } from 'react';
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react';
import NextNProgress from 'nextjs-progressbar';


let orbis = new Orbis();

const Providers = ({ children, pageProps }) => {
    const { user, setUser} = usePersistStore()
    const [supabase] = useState(() => createBrowserSupabaseClient())
    const [ready, setReady] = useState(false)
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
        <ThemeProvider defaultTheme="light" attribute="class">
        <NextNProgress color="#db2777" showOnShallow={true} />
            <SessionContextProvider
            supabaseClient={supabase}
            initialSession={pageProps.initialSession}
            >
                <LivepeerConfig dehydratedState={pageProps?.dehydratedState} client={livepeerClient}>
                    <GlobalContext.Provider value={{ user, setUser, orbis }}>
                        {children}
                    </GlobalContext.Provider>
                </LivepeerConfig>
            </SessionContextProvider>
        </ThemeProvider>
    );
};

export default Providers;
