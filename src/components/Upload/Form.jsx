import useAppStore from '@store/app'
import { APP } from '@utils/constants'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { Button } from '../UI/Button'
import InputMentions from '../UI/InputMentions'
import Category from './Category'
import UploadVideo from './Video'


function UploadForm({onUpload, onCancel}) {
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')

    useEffect(() => {
        setUploadedVideo({ title: title })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[title])

    useEffect(() => {
        setUploadedVideo({ description: description })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[description])

    useEffect(() => {
        setUploadedVideo({ language: language })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[language])


    console.log(uploadedVideo)
    
    return (
        <>
            <NextSeo
                title='Upload Video'
                canonical={`${APP.URL}/upload`}
                openGraph={{
                    title: 'Upload Video',
                    url: `${APP.URL}/upload`,
                }}
            />
            <div className='md:px-16 px-4 max-w-7xl mx-auto mt-5'>
                <h3 className='mb-5 text-2xl font-bold'>Upload Video</h3>
                <div className="grid h-full gap-5 md:grid-cols-2">
                    <div className="flex flex-col rounded-lg p-5 bg-secondary justify-between">
                        <div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <label className='font-medium text-sm'>Title</label>
                                <input
                                    type='text'
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                    placeholder='Title that describes your video'
                                    className="w-full text-sm py-2.5 px-3 bg-primary border theme-border rounded-md focus:outline-none"
                                />
                            </div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <InputMentions
                                    label="Description"
                                    placeholder="Tell viewers about your video (type @ to mention a channel)"
                                    autoComplete="off"
                                    value={description}
                                    onFocus={() => null}
                                    onAdd={(id, display) => {
                                        let mention = { 'did': id, 'username': display }
                                        setUploadedVideo({mentions: [...uploadedVideo.mentions, mention]})
                                    }}
                                    onContentChange={(value) => {
                                        setDescription(value)
                                        setUploadedVideo({description: value})
                                    }}
                                    mentionsSelector="input-mentions-textarea"
                                />
                            </div>
                            <div className="mb-4 ">
                                <Category />
                            </div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <label className='font-medium text-sm'>Language</label>
                                <input
                                    type='text'
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value)
                                        setUploadedVideo({ language: language})
                                    }}
                                    placeholder='Video Language'
                                    className="w-full text-sm py-2.5 px-3 bg-primary border theme-border rounded-md focus:outline-none"
                                />
                            </div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <label className='font-medium text-sm'>Comments</label>
                                <div className='flex space-x-3'>
                                    <div className="flex items-center">
                                        <input
                                            id="bordered-radio-1"
                                            type="radio"
                                            value="true"
                                            name="bordered-radio"
                                            onChange={(e) => setUploadedVideo({allowComments: true})}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="bordered-radio-1" className="py-1 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Allow</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="bordered-radio-2"
                                            type="radio"
                                            value="false"
                                            name="bordered-radio"
                                            onChange={(e) => setUploadedVideo({allowComments: false})}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="bordered-radio-2" className="py-1 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Disable</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between">
                        <UploadVideo />
                    </div>
                </div>
                <div className="flex items-center space-x-4 justify-start mt-5">
                    <Button
                        loading={uploadedVideo.loading || uploadedVideo.uploadingThumbnail}
                        disabled={uploadedVideo.loading || uploadedVideo.uploadingThumbnail}
                        onClick={() => onUpload()}
                    >
                        {uploadedVideo.uploadingThumbnail
                        ? 'Uploading thumbnail'
                        : uploadedVideo.buttonText}
                    </Button>
                    <Button variant="light" onClick={() => onCancel()} type="button">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UploadForm