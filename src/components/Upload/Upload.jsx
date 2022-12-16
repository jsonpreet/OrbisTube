import useAppStore from '@store/app'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import DropZone from './DropZone'
import UploadForm from './Form'
import toast from 'react-hot-toast'
import { useCreateAsset } from '@livepeer/react';
import { APP_CONTEXT, VIDEO_CDN_URL } from '@utils/constants'
import { GlobalContext } from '@context/app'

function Upload() {
    const router = useRouter()
    const { orbis, isLoggedIn, user } = useContext(GlobalContext);
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const setResetUploadedVideo = useAppStore((state) => state.setResetUploadedVideo)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { mutate: createAsset, data: assets, status, progress, error } = useCreateAsset(
        // we use a `const` assertion here to provide better Typescript types
        // for the returned data
        uploadedVideo.file
        ? { sources: [{ name: uploadedVideo.file.name, file: uploadedVideo.file }],
          noWait: false, }
        : null,
    );

    
    useEffect(() => {
        progress?.[0].phase === 'failed'
            ? toast.error('Failed to process video.')
            : progress?.[0].phase === 'waiting'
                ? setUploadedVideo({ buttonText: 'Waiting', percentText: 'Waiting', loading: true, percent: 0 })
                : progress?.[0].phase === 'uploading'
                    ? setUploadedVideo({ buttonText: 'Uploading Video...', loading: true, percentText: 'Uploading', percent: Math.round(progress?.[0]?.progress * 100) })
                    : progress?.[0].phase === 'processing'
                        ? setUploadedVideo({ buttonText: 'Processing Video...', loading: true, percentText: 'Processing', percent: Math.round(progress?.[0]?.progress * 100) })
                        : progress?.[0].phase === 'ready'
                            ? setUploadedVideo({ buttonText: 'Posting Video...', loading: true, readyToPost: true, percentText: 'Ready', percent: Math.round(progress?.[0]?.progress * 100) })
                            : setUploadedVideo({ buttonText: 'Submit Video', loading: false, percent: 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress])

    useEffect(() => {
        if (status === 'loading' || (assets?.[0] && assets[0].status?.phase !== 'ready')) {
            setLoading(true);
        } else {
            setLoading(false);
        }
        if (assets && assets[0] && assets[0].status?.phase === 'ready') {
            setUploadedVideo({ videoURL: `https://livepeer-vod.studio/hls/${assets[0]?.playbackId}/video` })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, assets])


    useEffect(() => {
        if (uploadedVideo.readyToPost) {
            submitPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedVideo])

    const submitPost = async () => {
        try {
            const request = {
                title: uploadedVideo.title,
                mentions: uploadedVideo.mentions,
                context:APP_CONTEXT,
                tags: [{ slug: uploadedVideo.videoCategory.tag, title: uploadedVideo.videoCategory.name }],
                data: {
                    Language: uploadedVideo.language,
                    Thumbnail: uploadedVideo.thumbnail,
                    isSensitiveContent: uploadedVideo.isSensitiveContent,
                    isNSFW: uploadedVideo.isNSFW,
                    isNSFWThumbnail: uploadedVideo.isNSFWThumbnail,
                    Comments: uploadedVideo.allowComments,
                    VideoUrl: uploadedVideo.videoURL,
                    isLivePeer: true,
                    Duration: uploadedVideo.durationInSeconds
                },
                body: uploadedVideo.description,
            }
            let res = await orbis.createPost(request);
            console.log(res);
            if (res && res.status === 200) {
                toast.success('Congratulations! Video Published.');
                setResetUploadedVideo()
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            setResetUploadedVideo()
            toast.error(`Error: ${error.message}`);
        }
    }

    const checkFieldsData = () => {
        if (uploadedVideo.title !== '' || uploadedVideo.description !== '' || uploadedVideo.language !== '' || uploadedVideo.tags.length > 0) {
            return true;
        }
        return false
    }

    const onUpload = () => {
        if (!checkFieldsData()) {
            return toast.error('All fields required!')
        }
        const file = uploadedVideo.file
        if (file.size > 1 * (1024 * 1024 * 1024)) {
            toast.error('File is too large. Please choose a file less than 1GB');
            return;
        }
        createAsset();
    }

    const onCancel = () => {
        setResetUploadedVideo()
    }

    
    return uploadedVideo?.file ? <UploadForm onCancel={onCancel} onUpload={onUpload}/> : <DropZone />
}

export default Upload