import { GlobalContext } from "@context/app";
import { VideoCard } from "@components/Common/Cards"
import TimelineShimmer from "@components/Shimmers/TimelineShimmer"
import { NoDataFound } from "@components/UI/NoDataFound"
import { useContext, useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


const Videos = () => {
    const { orbis, user, isLoggedIn } = useContext(GlobalContext);
    const supabase = useSupabaseClient()
    const [videos, setVideos] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const [isFetched, setFetched] = useState(false)
    const [noData, setNoDataFound] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            getHistory()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getHistory = async () => {
        try {
            const { data, error } = await supabase.from('history').select('*').limit(32).eq('user', user.did).order('id', { ascending: false } );
            if (data.length > 0) {
                getVideos(data);
            } else {
                setLoading(false)
                setNoDataFound(true)
            }
            
        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(`User ${user.did} History`, error);
        }
    }

    const getVideos = async (ids) => {
        const posts = [];
        for (let i = 0; i < ids.length; i++) {
            let query = orbis.getPost(ids[i].stream_id);
            const { data, error, status } = await query;
            /** Handle API query errors */
            if(error) {
                console.log("Error querying posts: ", error);
                return;
            }

            /** Update state with posts returned */
            if(data) {
                posts.push(data);
                setVideos(posts)
                setLoading(false)
                setFetched(true)

            } else {
                setVideos([]);
                setLoading(false)
                setNoDataFound(true)
            }
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