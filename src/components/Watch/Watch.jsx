import { GlobalContext } from "@context/app"
import Custom500 from "@app/pages/404"
import useAppStore from "@store/app"
import usePersistStore from "@store/persist"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { WatchVideoShimmer } from "../Shimmers/WatchVideoShimmer"
import { NextSeo } from "next-seo"
import { APP } from "@utils/constants"
import Video from "./Video"
import About from "./About"
import Comments from "./Comments/Comments"

function Watch({ post, loading, isError }) {
    const router = useRouter()
    const post_id = router.query.id;
    const { orbis, isLoggedIn, user } = useContext(GlobalContext)
    const addToRecentlyWatched = usePersistStore((state) => state.addToRecentlyWatched)
    const setVideoWatchTime = useAppStore((state) => state.setVideoWatchTime)
    const [video, setVideo] = useState(post)
    
    const isVideoOwner = isLoggedIn ? user.did === post.creator_details?.did : false

    if (isError) {
        return <Custom500 />
    }

    if (loading || !video) return <WatchVideoShimmer />
    return (
        <>
            <NextSeo
                title={video ? video.content.title : 'Watch'}
                description={video ? video.content.title : 'Watch'}
                canonical={`${APP.URL}/watch/${router.asPath}`}
                openGraph={{
                    title: video ? video.content.title : 'Watch',
                    description: video ? video.content.title : 'Watch',
                    url: `${APP.URL}/watch/${router.asPath}`,
                    images: [
                        {
                            url: video ? video.content.data.Thumbnail : '',
                            alt: video ? video.content.title : 'Watch',
                        },
                    ],
                }}
            />
            <div className="w-full flex md:flex-row flex-col">
                <div className="flex md:pr-6 md:flex-1 flex-col space-y-4">
                    <Video video={video} />
                    <About video={video} />
                    {video && isVideoOwner ?
                        <Comments video={video} isVideoOwner={isVideoOwner} /> :
                        video.content.data.Comments ? <Comments video={video} isVideoOwner={isVideoOwner} /> : null}
                </div>
                <div className="w-full md:min-w-[300px] md:max-w-[400px]">
                    {/* <SuggestedVideos video={video} currentVideoId={video?.PostHashHex} /> */}
                </div>
            </div>
        </>
    )
}

export default Watch