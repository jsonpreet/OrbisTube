import { Button } from '@components/UI/Button'
import { useContext, useState } from 'react'
import InputMentions from '@components/UI/InputMentions'
import { toast } from 'react-hot-toast'
import { ProfilePicture } from '@utils/functions/getProfilePicture'
import { GlobalContext } from '@context/app'
import { APP_CONTEXT } from '@utils/constants'


const NewComment = ({ reply, video, refetch, isReply = false }) => {
    const channel = video.creator_details;
    const { orbis, isLoggedIn, user } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [comment, setComment] = useState('')
    const [mentions, setMentions] = useState([])


    const submitComment = async () => {
        setLoading(true);
        if (comment.trim().length > 0) {
            try {
                const request = {
                    mentions: mentions,
                    context:APP_CONTEXT,
                    body: comment,
                    master: video.stream_id,
                    reply_to: isReply ? reply.stream_id : video.stream_id
                }
                let res = await orbis.createPost(request);
                if (res && res.status === 200) {
                    setComment('');
                    setLoading(false);
                    setShowButtons(false);
                    toast.success('Congratulations! Comment Posted.');
                }
            } catch (error) {
                console.log(error)
                toast.error(`Error: ${error.message}`);
            }
            finally {
                refetch()
            }
        } else {
            setLoading(false);
            toast.error('Please write something to post.');
        }
    }

    const cancel = () => {
        setShowButtons(false)
        setComment('')
        setLoading(false)
    }

    const onFocus = () => {
        setShowButtons(true)
    }

    return (
        <div className="mt-1 mb-5 flex space-x-3">
            <div className="flex-none">
                <ProfilePicture details={user} imgClass={`object-cover rounded-full bg-dropdown w-8 h-8 ${isReply ? `md:w-8 md:h-8` : `md:w-10 md:h-10`}`} />
            </div>
            <div className="flex flex-col flex-1 space-y-2 md:space-y-3">
                <div>
                    <InputMentions
                        placeholder="Tell about video (type @ to mention a channel) or add #Hashtags"
                        autoComplete="off"
                        value={comment}
                        onFocus={onFocus}
                        onAdd={(id, display) => {
                            let mention = { 'did': id, 'username': display }
                            setMentions([...mentions, mention])
                        }}
                        onContentChange={(value) => {
                            setComment(value)
                        }}
                        mentionsSelector="input-mentions-textarea-small h-20 md:h-10"
                    />
                </div>
                {showButtons ?
                    <div className='flex justify-end space-x-3'>
                        <Button variant='danger' onClick={cancel}>Cancel</Button>
                        <Button onClick={submitComment} loading={loading}  disabled={loading}>Comment</Button>
                    </div>
                : null}    
            </div>
        </div>
    )
}

export default NewComment