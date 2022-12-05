import useAppStore from '@store/app'
import usePersistStore from '@store/persist'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DropZone from './DropZone'
import UploadForm from './Form'
import toast from 'react-hot-toast'

function Upload() {
    const router = useRouter()
    const {isLoggedIn, user} = usePersistStore()
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    // const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    // const setResetUploadedVideo = useAppStore((state) => state.setResetUploadedVideo)
    // const [newPostHash, setNewPostHash] = useState(null)
    // const [mediaID, setMediaId] = useState(null)
    // const videoStreamInterval = null


    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    
    return uploadedVideo?.file ? <UploadForm/> : <DropZone />
}

export default Upload