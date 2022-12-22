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
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import SuggestedVideos from "./Suggestions"

function Watch({ post : video, loading, isError }) {
    console.log(video)
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { orbis, isLoggedIn, user } = useContext(GlobalContext)
    const addToRecentlyWatched = usePersistStore((state) => state.addToRecentlyWatched)
    const setVideoWatchTime = useAppStore((state) => state.setVideoWatchTime)
    
    const isVideoOwner = isLoggedIn ? user.did === video.creator_details?.did : false
    
    useEffect(() => {
        if (isLoggedIn && video) {
            addToHistory()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video, isLoggedIn, user])

    const addToHistory = async() => {
        console.log(video.stream_id, 'adding to history');
        try {
            const { data: post, error } = await supabase.from('history').select('*').eq('stream_id', video.stream_id).eq('user', user.did);
            if (post && post.length > 0) {
                await supabase.from('history').update({ lastwatched: new Date() }).eq('stream_id', video.stream_id).eq('user', user.did);
            } else {
                const request = { user: user.did, stream_id: video.stream_id, lastwatched: new Date() }

                supabase.from('history').insert([request]).then((res) => {
                    if (res.error) {
                        console.log(video.stream_id, 'watched', res.error);
                    }
                })
            }
        } catch (error) {
            console.log(video.stream_id, 'watched', error);
        }
    }

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
                    <SuggestedVideos video={video} channel={video.creator_details} currentVideoId={video?.stream_id} />
                </div>
            </div>
        </>
    )
}

export default Watch