import Reactions from "./Reactions"
import { ProfilePicture } from "@utils/functions/getProfilePicture"
import { useDidToAddress } from "@utils/functions/getDidToAddress"
import { getDisplay, getUsername } from "@utils/functions/getProfileName"
import ReactTimeAgo from "react-time-ago"
import { useContext, useState } from "react"
import InputMentions from "@components/UI/InputMentions"
import { Button } from "@app/components/UI/Button"
import { GlobalContext } from "@app/context/app"
import { useRouter } from "next/router"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { toast } from "react-hot-toast"
import clsx from "clsx"
import DeleteModal from "@app/components/Common/Modals/DeleteModal"
import Options from "./Options"

export const Post = ({ post, refetch, channel }) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { orbis, isLoggedIn, user, isConnected } = useContext(GlobalContext)
    const { address } = useDidToAddress(post?.creator_details?.did)
    const username = getUsername(post?.creator_details?.profile, address, post?.did)
    const displayName = getDisplay(post?.creator_details?.profile, address, post?.did)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showNewComment, setShowNewComment] = useState(false)
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('')
    const [mentions, setMentions] = useState([])

    const createComment = async () => {
        if (!comment) return
        setLoading(true)
        const { data: community, error } = await supabase.from('communities').select('*').eq('user', channel.did);
        if (community && community.length > 0) {
            let res = await orbis.createPost({ body: comment, mentions: mentions, context: community[0].channel, master: post.stream_id, reply_to: post.stream_id });
            if (res && res.status === 200) {
                setLoading(false)
                toast.success('Comment created successfully');
                setComment('')
                refetch()
                setMentions([])
                setShowNewComment(false)
            } else {
                setLoading(false);
                toast.error('Something went wrong, please try again later.');
            }
        }
    }

    const cancel = () => {
        setShowNewComment(false)
        setComment('')
        setMentions([])
        setLoading(false)
    }


    return (
        <div>
            <DeleteModal title='Delete Post' message='Post Deleted' refetch={refetch} video={post} show={showDeleteModal} setShow={setShowDeleteModal} />
            {post.reply_to ?
            <>
                <div className='flex ml-4 items-center mb-2 pt-4'>
                    <div className='border-t-2 border-l-2 border-gray-700 mt-2 w-5 h-5 flex items-end ml-4'></div>
                    <div className='flex space-x-3 items-center'>
                        <ProfilePicture details={post.reply_to_creator_details} imgClass='object-cover rounded-full bg-dropdown w-6 h-6' />
                        <span className="text-sm">{post.reply_to_details.body?.substring(0, 60)}...</span>
                    </div>
                </div>
            </> : null }
            <div className={clsx(
                'flex group p-4 w-full items-start justify-start space-x-2',
                {
                    'pt-0': post.reply_to
                }
            )}>
                <div className="flex space-x-2 items-center">
                    <ProfilePicture details={post.creator_details} imgClass="w-10 h-10 rounded-full" />
                </div>
                <div className='flex-1 space-y-1'>
                    <div className="flex space-x-2 items-center">
                        <span className="font-medium text-sm">{displayName}</span>
                        <span className="middot" />
                        <span className="whitespace-nowrap text-sm">
                            <ReactTimeAgo date={post.timestamp * 1000} locale="en-US" />
                        </span>
                    </div>
                    <p className="text-gray-800 dark:text-white">{post.content.body}</p>
                    <div>
                        <Reactions post={post} showNewComment={showNewComment} setShowNewComment={setShowNewComment} />
                    </div>
                    {isLoggedIn && showNewComment && (
                        <div className="flex flex-col pt-4 space-y-4">
                            <div className="flex w-full mb-10 items-start justify-start space-x-2">
                                <div className="flex space-x-2 items-center">
                                    <ProfilePicture details={user} imgClass="w-8 h-8 rounded-full" />
                                </div>
                                <div className='flex-1 space-y-3'>
                                    <InputMentions
                                        label=""
                                        placeholder="Reply to this post here..."
                                        autoComplete="off"
                                        value={comment}
                                        onFocus={() => null}
                                        onAdd={(id, display) => {
                                            let mention = { 'did': id, 'username': display }
                                            setMentions([...mentions, mention])
                                        }}
                                        onContentChange={(value) => {
                                            setComment(value)
                                        }}
                                        mentionsSelector="input-mentions-textarea !h-10 !min-h-0"
                                    />
                                    <div className="space-x-2">
                                        <Button
                                            variant='danger'
                                            size='sm'
                                            onClick={cancel}
                                        >
                                            Cancel
                                        </Button>
                                        <Button 
                                            loading={loading}
                                            size='sm'
                                            onClick={() => createComment()}
                                        >
                                            Comment 
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <Options
                    refetch={refetch}
                    post={post}
                    setShowDeleteModal={setShowDeleteModal}
                    showDeleteModal={showDeleteModal}
                />
            </div>
        </div>
    )
}