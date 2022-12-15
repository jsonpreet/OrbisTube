import { Button } from '@components/UI/Button'
import { useState } from 'react'
import InputMentions from '../../UI/InputMentions'
import { toast } from 'react-hot-toast'
import { useDidToAddress } from '@utils/functions/getDidToAddress'
import { useGetUsername } from '@utils/functions/getProfileName'


const NewComment = ({ video, refetch }) => {
    const channel = video.creator_details;
    const [loading, setLoading] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [comment, setComment] = useState('')
    const { address } = useDidToAddress(channel.did);
    const username = useGetUsername(channel.profile, address, channel.did);


    const submitComment = async () => {
        setLoading(true);
        if (comment.trim().length > 0) {
            
        } else {
            setLoading(false);
            toast.error('Please write something to post.');
        }
    }

    const cancel = () => {
        setShowButtons(false)
        setComment('')
    }

    const onFocus = () => {
        setShowButtons(true)
    }

    return (
        <div className="mt-1 mb-5 flex space-x-3">
            <div className="flex-none">
                <img
                    className="w-10 h-10 rounded-full"
                    src={channel.profile.pfp}
                    alt={username}
                    draggable={false}
                />
            </div>
            <div className="flex flex-col flex-1 space-y-2 md:space-y-3">
                <div>
                    <InputMentions
                        placeholder="Tell about video (type @ to mention a channel) or add #Hashtags"
                        autoComplete="off"
                        value={comment}
                        onFocus={onFocus}
                        onContentChange={(value) => {
                            setComment(value)
                        }}
                        mentionsSelector="input-mentions-textarea-small h-20 md:h-10"
                    />
                </div>
                {showButtons ?
                    <div className='flex justify-end space-x-3'>
                        <Button variant='light' onClick={cancel} disabled={loading}>Cancel</Button>
                        <Button onClick={submitComment} disabled={loading}>Comment</Button>
                    </div>
                : null}    
            </div>
        </div>
    )
}

export default NewComment