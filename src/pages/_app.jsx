import '../styles/globals.scss'

/** Import TimeAgo globally */
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
en.long.minute = {
  current: "this minute",
  future: {one: '{0} min.', other: '{0} min.'},
  past: {one: '{0} min. ago', other: '{0} mins. ago'}
}
TimeAgo.addLocale(en);

/** Initiate the Orbis class object */

import Loading from '@components/Common/Loading';
import { lazy, Suspense } from 'react';
const Providers = lazy(() => import('@components/Common/Providers'));
const Layout = lazy(() => import('@components/Common/Layout'));


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Providers pageProps={pageProps}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Providers>
      </Suspense>
    </>
  )
}

export default MyApp
