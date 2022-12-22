import { SuggestedVideosShimmer } from '@components/Shimmers/WatchVideoShimmer'
import SuggestedVideoCard from '../VideoCard'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@context/app';
import { APP_CONTEXT } from '@utils/constants';

function UserVideos({channel, currentVideoId}) {
    const { orbis, user, isLoggedIn } = useContext(GlobalContext);
    const supabase = useSupabaseClient()
    const [videos, setVideos] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const [isFetched, setFetched] = useState(false)
    const [noData, setNoDataFound] = useState(false)

    useEffect(() => {
        getVideos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channel, orbis])

    const getVideos = async () => {
        try {
            let { data, error } = await orbis.getPosts({ context: APP_CONTEXT, did: channel?.did });
            if (data) {
                if (data.length > 0) {
                    setFetched(true)
                    setVideos(data)
                } else {
                    setFetched(true)
                    setNoDataFound(true)
                }
            }
            else {
                setFetched(true)
                setError(true)
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {!isLoading && isFetched ? (
                <>
                    <div className='bg-secondary flex flex-col space-y-3 p-4 rounded-lg'>
                        {videos.map(video => {
                            return (
                                <SuggestedVideoCard channel={channel} key={`${video.stream_id}`} video={video} />
                            )
                        })}
                    </div>
                </>
            ): <SuggestedVideosShimmer />}
        </>
    )
}

export default UserVideos