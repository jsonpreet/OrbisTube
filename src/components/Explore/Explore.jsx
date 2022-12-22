import { NextSeo } from 'next-seo';
import { APP } from '@utils/constants';
import { useContext } from 'react';
import { GlobalContext } from '@context/app';
import RecentVideos from '../Home/RecentVideos';

function Explore() {
    const { isLoggedIn } = useContext(GlobalContext);
    return (
        <>
            <NextSeo
                title='Explore'
                canonical={`${APP.URL}/explore`}
                openGraph={{
                    title: 'Explore',
                    url: `${APP.URL}/explore`,
                }}
            />
           <RecentVideos/>
            
        </>
    )
    
}

export default Explore