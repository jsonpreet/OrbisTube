import { APP } from '@utils/constants'
import Modal from '@components/UI/Modal'
import toast from 'react-hot-toast'
import { Button } from '@components/UI/Button'
import { getUsername } from '@utils/functions/getProfileName'
import { useContext, useState } from 'react'
import { GlobalContext } from '@context/app'
import { useRouter } from 'next/router'

const DeleteModal = ({ rootRef, show, setShow, video }) => {
    const { orbis } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const hideVideo = async () => {
        setLoading(true)
        let res = await orbis.deletePost(video.stream_id);
        if (res.status === 200) {
            toast.success('Video Deleted!')
            setTimeout(() => router.push(`/${getUsername(video.creator_details.profile, video.did)}`, undefined, { shallow: true }), 1000)
            setLoading(false)
        }
    }
    return (
        <Modal
            title="Delete Video"
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