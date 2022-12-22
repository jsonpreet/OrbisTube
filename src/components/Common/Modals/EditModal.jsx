import Modal from '@components/UI/Modal'
import toast from 'react-hot-toast'
import InputMentions from '@components/UI/InputMentions'
import Category from '@components/Upload/Category'
import { Combobox, Transition } from '@headlessui/react'
import { HiChevronUpDown } from 'react-icons/hi2'
import { Fragment, useContext, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { LANGUAGES } from '@data/languages'
import { Button } from '@components/UI/Button'
import { GlobalContext } from '@context/app'
import { APP_CONTEXT } from '@utils/constants'
import { useRouter } from 'next/router'

const EditModal = ({ rootRef, show, setShow, video }) => {
    const data = video.content.data;
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { orbis } = useContext(GlobalContext)
    const [title, setTitle] = useState(video.content.title)
    const [description, setDescription] = useState(video.content.body)
    const [mentions, setMentions] = useState(video.content.mentions)
    const [language, setLanguage] = useState(data.Language)
    const [query, setQuery] = useState('')
    const [comments, setComments] = useState(data.Comments)
    const [category, setCategory] = useState(video.content.tags[0])

    const filteredLanguage =
    query === ''
      ? LANGUAGES
      : LANGUAGES.filter((lang) =>
          lang
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

    const updatePost = async () => {
        setLoading(true)
        try {
            const request = {
                title: title,
                mentions: mentions,
                context:APP_CONTEXT,
                tags: [category],
                data: {
                    Language: language,
                    Thumbnail: data.Thumbnail,
                    isSensitiveContent: data.isSensitiveContent,
                    isNSFW: data.isNSFW,
                    isNSFWThumbnail: data.isNSFWThumbnail,
                    Comments: comments,
                    VideoUrl: data.VideoUrl,
                    isLivePeer: true,
                    Duration: data.Duration
                },
                body: description,
            }
            let res = await orbis.editPost(video.stream_id, request);
            if (res && res.status === 200) {
                toast.success('Congratulations! Video Updated.');
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Edit Video"
            onClose={() => setShow(false)}
            show={show}
            ref={rootRef}
            panelClassName="w-full md:max-w-4xl"
        >
            <div className="w-full px-5 flex flex-col">
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
                                setMentions([...mentions, mention])
                            }}
                            onContentChange={(value) => {
                                setDescription(value)
                            }}
                            mentionsSelector="input-mentions-textarea"
                        />
                    </div>
                    <div className="mb-4 ">
                        <Category setCategory={setCategory} category={category} />
                    </div>
                    <div className='mb-4 flex flex-col space-y-2'>
                        <label className='font-medium text-sm'>Language</label>
                        <div>
                            <Combobox value={language} onChange={setLanguage}>
                            {/* <Listbox value={language} onChange={setLanguage}> */}
                                <div className="relative mt-1">
                                    <div className="relative w-full cursor-default overflow-hidden bg-primary border theme-border rounded-md text-left focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-300 sm:text-sm">
                                        <Combobox.Input
                                            className="w-full bg-primary border theme-border rounded-md dark:text-white focus-visible:ring-0 text-black border-none py-2.5 pl-3 pr-10 text-sm leading-5 focus:ring-0"
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
                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md dropdown-shadow bg-dropdown py-1 text-base focus:outline-none sm:text-sm">
                                        {filteredLanguage.length === 0 && query !== '' ? (
                                            <div className="relative cursor-default select-none py-2 px-4 text-light">
                                                Nothing found.
                                            </div>
                                        ) : (
                                        filteredLanguage.map((lang) => (
                                            <Combobox.Option
                                                key={lang}
                                                className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? 'bg-gray-100 dark:bg-gray-800' : 'dark:text-white text-gray-900'
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
                                                active ? 'text-white' : 'text-brand-600 dark:text-white'
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
                    <div className='mb-6 flex flex-col space-y-2'>
                        <label className='font-medium text-sm'>Comments</label>
                        <div className='flex space-x-3'>
                            <div className="flex items-center">
                                <input
                                    id="bordered-radio-1"
                                    type="radio"
                                    value="true"
                                    name="bordered-radio"
                                    checked={comments === true}
                                    onChange={(e) => setComments(true)}
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
                                    checked={comments === false}
                                    onChange={(e) => setComments(false)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="bordered-radio-2" className="py-1 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Disable</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={() => updatePost()}
                            loading={loading}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditModal