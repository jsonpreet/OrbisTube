import { NoDataFound } from '@components/UI/NoDataFound';
import WatchLater from './WatchLater';
import History from './History';
import { NextSeo } from 'next-seo';
import { APP } from '@utils/constants';
import { useContext } from 'react';
import { GlobalContext } from '@context/app';
import { Loader2 } from '@components/UI/Loader';

function Library() {
    const { orbis, user, isLoggedIn, isConnected } = useContext(GlobalContext);
    // if (!isConnected) {
    //     return <div className='flex items-center justify-center'><Loader2/></div>
    // }
    return (
        <>
            <NextSeo
                title='Library'
                canonical={`${APP.URL}/library`}
                openGraph={{
                    title: 'Library',
                    url: `${APP.URL}/library`,
                }}
            />
            {isLoggedIn ?
                <>
                    <div className='flex flex-col space-y-4 px-0'>
                        <div className='space-y-4'>
                            <h3 className="text-base font-medium">History</h3>
                            <History />
                        </div>
                        <div className='space-y-4'>
                            <h3 className="text-base font-medium">Watch Later</h3>
                            <WatchLater />
                        </div>
                    </div>
                </>
                :
                <NoDataFound
                    isCenter
                    withImage
                    heading="Enjoy your favorite videos"
                    text="Sign in to access videos that you’ve liked or saved"
                    isHeading={true}
                />
            }
        </>
    )
}

export default Library