import { ThemeProvider } from 'next-themes';
import '@rainbow-me/rainbowkit/styles.css';
import { Orbis } from '@orbisclub/orbis-sdk';
import { GlobalContext } from '@context/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';
import { LivepeerConfig } from '@livepeer/react';
import NextNProgress from 'nextjs-progressbar';
import { livepeerClient, playerTheme } from '@utils/functions/getLivePeer';

let orbis = new Orbis();

const Providers = ({ children, pageProps }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
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
            setLoggedIn(true);
        }
    }
    return (
        <ThemeProvider defaultTheme="light" attribute="class">
        <NextNProgress color="#8B5CF6" showOnShallow={true} />
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <LivepeerConfig client={livepeerClient()} theme={playerTheme}>
                    <GlobalContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser, orbis }}>
                        {children}
                    </GlobalContext.Provider>
                </LivepeerConfig>
            </SessionContextProvider>
        </ThemeProvider>
    );
};

export default Providers;
