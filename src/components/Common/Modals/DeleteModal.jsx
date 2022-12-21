import { APP } from '@utils/constants'
import Modal from '@components/UI/Modal'
import toast from 'react-hot-toast'
import { Button } from '@components/UI/Button'
import { getUsername } from '@utils/functions/getProfileName'
import { useContext, useState } from 'react'
import { GlobalContext } from '@context/app'
import { useRouter } from 'next/router'

const DeleteModal = ({ rootRef, title='Delete Video', message='Video Deleted', show, setShow, video, isPost = false, isComment = false, refetch }) => {
    const { orbis } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const hideVideo = async () => {
        setLoading(true)
        try {
            let res = await orbis.deletePost(video.stream_id);
            console.log(res)
        } catch (error) {

        } finally {
            toast.success(message)
            if (!isComment && !isPost) {
                setTimeout(() => router.push(`/${getUsername(video.creator_details.profile, video.did)}`, undefined, { shallow: true }), 1000)
            } 
            setShow(false)
            refetch()
            setLoading(false)
        }
    }
    return (
        <Modal
            title={title}
            onClose={() => setShow(false)}
            show={show}
            ref={rootRef}
            panelClassName="w-full md:max-w-lg"
        >
            <div className="w-full px-5 flex flex-col space-y-6">
                <div className='text-center'>
                    <h3 className='font-bold text-lg mb-3'>Are you sure you want to delete this post?</h3>
                    <p>If you ask for deletion your post might be removed from the Ceramic nodes hosting it.</p>
                </div>
                <div className='flex items-center space-x-3 justify-center'>
                    <Button
                        variant='danger'
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => hideVideo()}
                        loading={loading}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal