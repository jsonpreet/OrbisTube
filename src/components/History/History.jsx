import { NoDataFound } from '@components/UI/NoDataFound';
import Videos from './Videos';
import { NextSeo } from 'next-seo';
import { APP } from '@utils/constants';
import { useContext } from 'react';
import { GlobalContext } from '@context/app';

function History() {
    const { isLoggedIn } = useContext(GlobalContext);
    return (
        <>
            <NextSeo
                title='History'
                canonical={`${APP.URL}/history`}
                openGraph={{
                    title: 'History',
                    url: `${APP.URL}/history`,
                }}
            />
            {isLoggedIn ?
                <>
                    <Videos />
                </>
                :
                <NoDataFound
                    isCenter
                    withImage
                    heading="Keep track of what you watch"
                    text="Watch history isn't viewable when signed out."
                    isHeading={true}
                />
            }
        </>
    )
    
}

export default History