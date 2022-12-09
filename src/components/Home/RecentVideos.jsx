import { VideoCard } from '@components/Common/Cards';
import TimelineShimmer from '@components/Shimmers/TimelineShimmer';
import { Loader2 } from '@components/UI/Loader';
import { NoDataFound } from '@components/UI/NoDataFound';
import { GlobalContext } from '@context/app';
import usePersistStore from '@store/persist';
import { APP, APP_CONTEXT } from '@utils/constants';
import { useContext, useEffect, useState } from 'react';

function RecentVideos() {
  const { orbis, user } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    setPage(0);
    load(true, autoRefresh, false, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [APP_CONTEXT, user])

  /** Refresh feed with latest post and reset pagination */
  function refresh() {
    setPage(0);
    load(false, false, true, 0);
  }

  /** Load more posts and add it to the existing array */
  function loadMore() {
    let _page = page + 1;
    load(false, false, false, _page);
    setPage(_page);
  }

  /** Load posts from Orbis */
  async function load(showLoadingState, autoRefresh = false, showRefresh = false, _page) {
    /** Show loading state if requested */
    if(showLoadingState) {
      setLoading(true);
    }

    /** Show refresh state on the RefreshButton */
    if(showRefresh) {
      setRefreshing(true);
    }

    /** Perform query against Orbis API */
    let query = orbis.getPosts({context: APP_CONTEXT, only_master: true}, _page);
    const { data, error, status } = await query;

    /** Handle API query errors */
    if(error) {
      console.log("Error querying posts: ", error);
      return;
    }

    /** Update state with posts returned */
    if(data) {
      if(_page == 0) {
        setPosts(data);
      } else {
        let _posts = [...posts];
        let __posts = _posts.concat(data);
        setPosts(__posts);
      }

    } else {
      setPosts([]);
    }

    /** Show feed as loaded */
    setLoading(false);
    setRefreshing(false);

    /** If auto refresh is enabled we refresh this query every 5 seconds. */
    if(autoRefresh) {
      await sleep(false, 10000);
      load();
    }
  }

  return (
    <>
      {
        posts && posts.length > 0 ? (
          <>
            <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
              {posts.map(video => {
                return (
                  <VideoCard key={`${video.stream_id}`} video={video} />
                )
              })}
            </div>

            {refreshing ? 
              <div className="p-15">
                <Loader2 />
              </div>
            :
              <div className="p-15">
                <div className="btn black" onClick={() => loadMore()}>Load older posts</div>
              </div>
            }
          </>
        )
        : (
          <div><TimelineShimmer cols={28} /></div>
        )
      }
    </>
    
  )
}

export default RecentVideos