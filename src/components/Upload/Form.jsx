import { Listbox, Combobox, Transition } from '@headlessui/react'
import useAppStore from '@store/app'
import { APP } from '@utils/constants'
import { NextSeo } from 'next-seo'
import { Fragment, useEffect, useState } from 'react'
import { Button } from '../UI/Button'
import InputMentions from '../UI/InputMentions'
import Category from './Category'
import UploadVideo from './Video'
import { HiChevronUpDown } from "react-icons/hi2";
import { LANGUAGES } from '@app/data/languages'
import { BsCheck } from 'react-icons/bs'


function UploadForm({onUpload, onCancel}) {
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState(LANGUAGES[0])
    const [query, setQuery] = useState('')

    const filteredLanguage =
    query === ''
      ? LANGUAGES
      : LANGUAGES.filter((lang) =>
          lang
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )


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
                                <div>
                                    <Combobox value={language} onChange={setLanguage}>
                                    {/* <Listbox value={language} onChange={setLanguage}> */}
                                        <div className="relative z-20 mt-1">
                                            <div className="relative w-full cursor-default overflow-hidden bg-primary border theme-border rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-300 sm:text-sm">
                                                <Combobox.Input
                                                    className="w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                    displayValue={(language) => language}
                                                    onChange={(event) => setQuery(event.target.value)}
                                                />
                                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <HiChevronUpDown
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </Combobox.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                            afterLeave={() => setQuery('')}
                                        >
                                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {filteredLanguage.length === 0 && query !== '' ? (
                                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                        Nothing found.
                                                    </div>
                                                ) : (
                                                filteredLanguage.map((lang) => (
                                                    <Combobox.Option
                                                        key={lang}
                                                        className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active ? 'bg-brand-600 text-white' : 'text-gray-900'
                                                        }`
                                                        }
                                                        value={lang}
                                                    >
                                                {({ selected, active }) => (
                                                <>
                                                    <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                    >
                                                    {lang}
                                                    </span>
                                                    {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active ? 'text-white' : 'text-brand-600'
                                                        }`}
                                                    >
                                                        <BsCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                    ) : null}
                                                </>
                                                )}
                                            </Combobox.Option>
                                            ))
                                        )}
                                        </Combobox.Options>
                                    </Transition>
                                    </div>
                                </Combobox>
                                </div>
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