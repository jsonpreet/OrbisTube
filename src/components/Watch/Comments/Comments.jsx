import usePersistStore from '@store/persist'
import CommentsShimmer from '@components/Shimmers/CommentsShimmer'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { BiComment } from 'react-icons/bi'
import NewComment from './NewComment'
import { GlobalContext } from '@context/app'

const Comment = dynamic(() => import('./Comment'))

const Comments = ({ video, isVideoOwner }) => {
    const { orbis, isLoggedIn, user } = useContext(GlobalContext)
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState(null)


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video])

    const refetchComments = async () => {
        await fetchData();
    }

    
    async function fetchData() {
        let { data, error } = await orbis.getPosts({ master: video.stream_id });
        if (data && data.length > 0) {
            setComments(data)
        }
        setLoading(false)
    }

    if (loading) return <CommentsShimmer />

    return (
        <div className="pb-4 md:px-0 px-3">
            <div className="flex items-center justify-between">
                <h1 className="flex items-center my-4 space-x-2">
                    <BiComment size={22} />
                    <span>
                        {video.count_replies}
                    </span>
                    <span>Comments</span>
                    
                </h1>
            </div>
            {isLoggedIn ? (
                <NewComment video={video} refetch={refetchComments} />
            ) : null}
            {/* {video.count_replies === 0 ? (
                <NoDataFound text="Be the first to comment." />
            ) : null} */}
            {!loading ? (
                <>
                    <div className=" space-y-4">
                        {comments?.map((comment) => (
                            <Comment key={`${comment.stream_id}`} comment={comment}
                        />
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Comments