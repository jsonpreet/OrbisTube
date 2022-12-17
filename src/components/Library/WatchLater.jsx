import { NoDataFound } from '@components/UI/NoDataFound';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@context/app';
import Carousel from "react-multi-carousel";
import VideoCardSmall from '@components/Common/Cards/SmallCard';
import { isBrowser } from 'react-device-detect';
import TimelineShimmer from '../Shimmers/TimelineShimmer';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const WatchLater = () => {
  const { orbis, user, isLoggedIn } = useContext(GlobalContext);
  const supabase = useSupabaseClient()
  const [videos, setVideos] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [isFetched, setFetched] = useState(false)
  const [noData, setNoDataFound] = useState(false)

  useEffect(() => {
    getHistory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const getHistory = async () => {
    try {
      const { data, error } = await supabase.from('watchlater').select('*').limit(32).eq('user', user.did).order('id', { ascending: false } );
      if (data.length > 0) {
        getVideos(data);
        setLoading(false)
        setFetched(true)
      } else {
        setLoading(false)
        setNoDataFound(true)
      }
        
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(`User ${user.did} WatchLater`, error);
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
      } else {
        setVideos([]);
      }
    }
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  if (isError) {
    return <NoDataFound 
      isCenter
      withImage
      title="Something went wrong"
      description="We are unable to fetch the latest videos. Please try again later."
    />
  } 

  if (isFetched && (videos.length === 0 || noData)) {
    return <NoDataFound 
      isCenter
      withImage
      title="Something went wrong"
      description="We are unable to fetch the latest videos. Please try again later."
    />
  } 

  if (isLoading) {
    return (
      <div><TimelineShimmer cols={8} /></div>
    )
  }

  if (isFetched) {
    return (
      <>
        <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
          {isBrowser ?
            <>
              {videos.map((video) => {
                return (
                  <VideoCardSmall userProfile={video.ProfileEntryResponse} key={`${video.PostHashHex}`} video={video} />
                )
              })}
            </>
            : 
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={false}
              infinite={false}
            >
              {videos.map((video) => {
                  return (
                    <VideoCardSmall userProfile={video.ProfileEntryResponse} key={`${video.PostHashHex}`} video={video} />
                  )
                })
              }
            </Carousel>
          }
        </div>
      </>
    )
  }
}

export default WatchLater