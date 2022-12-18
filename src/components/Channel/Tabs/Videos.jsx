import { GlobalContext } from "@context/app";
import { VideoCard } from "@components/Common/Cards"
import TimelineShimmer from "@components/Shimmers/TimelineShimmer"
import { NoDataFound } from "@components/UI/NoDataFound"
import { useContext, useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { APP_CONTEXT } from "@app/utils/constants";


const Videos = ({channel}) => {
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
    }, [channel])

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


    if (isError) {
        return <NoDataFound 
            isCenter
            withImage
            isHeading={true}
            heading="Something went wrong"
            text="We are unable to fetch the latest videos. Please try again later."
          />
    } 

    if (!isLoading && (videos.length === 0 || noData)) {
        return <NoDataFound 
            isCenter
            withImage
            text="No Videos Found!."
          />
    } 

    if (isLoading) {
        return (
            <div><TimelineShimmer cols={28} /></div>
        )
    }

    if (isFetched) {
        return (
            <>
                <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
                    {videos.length > 0 && videos.map((video) => {
                            return (
                                <VideoCard key={`${video.stream_id}`} video={video} />
                            )
                        })
                    }
                </div>
            </>
        
        )
    }
}

export default Videos