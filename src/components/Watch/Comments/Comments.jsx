import CommentsShimmer from '@components/Shimmers/CommentsShimmer'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { BiComment } from 'react-icons/bi'
import NewComment from './NewComment'
import { GlobalContext } from '@context/app'
import { NoDataFound } from '@components/UI/NoDataFound'
import { ProfilePicture } from '@app/utils/functions/getProfilePicture'

const Comment = dynamic(() => import('./Comment'))

const Comments = ({ video, isVideoOwner }) => {
    const { orbis, isLoggedIn, user } = useContext(GlobalContext)
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState(null)
    const [totalComments, setTotalComments] = useState(video.count_replies)

    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video])

    const refetchComments = async () => {
        fetchComments();
    }

    const fetchComments = async () => {
        let { data, error } = await orbis.getPosts({ master: video.stream_id });
        setTotalComments(data.length)
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
                        {totalComments}
                    </span>
                    <span>Comments</span>
                    
                </h1>
            </div>
            {isLoggedIn ? (
                <NewComment video={video} refetch={refetchComments} />
            ) : <NoDataFound text="Sign in to write a comment." />}
            {/* {video.count_replies === 0 ? (
                <NoDataFound text="Be the first to comment." />
            ) : null} */}
            {!loading ? (
                <>
                    <div className=" space-y-4">
                        {comments?.map((comment) => {
                            return (
                                comment.reply_to ?
                                    <div key={`${comment.stream_id}`}>
                                        <div className='flex items-center mb-2'>
                                            <div className='border-t-2 border-l-2 border-gray-700 mt-2 w-5 h-5 flex items-end ml-4'></div>
                                            <div className='flex space-x-3 items-center'>
                                                <ProfilePicture details={comment.reply_to_creator_details} imgClass='object-cover rounded-full bg-dropdown w-6 h-6' />
                                                <span className="text-sm">{comment.reply_to_details.body?.substring(0, 60)}...</span>
                                            </div>
                                        </div>
                                        <Comment refetch={refetchComments} key={`${comment.stream_id}`} video={video} comment={comment} />
                                    </div>
                                : 
                                    <Comment refetch={refetchComments} key={`${comment.stream_id}`} video={video} comment={comment} />
                            )
                        })}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Comments