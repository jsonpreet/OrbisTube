import { Button } from '@components/UI/Button';
import { getCoverPicture } from '@utils/functions/getCoverPicture';
import { getProfileExtraData } from '@utils/functions/getProfileExtraData';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { BiUpload } from 'react-icons/bi';
import { GlobalContext } from '@context/app';
import { useDidToAddress } from '@utils/functions/getDidToAddress';
import { LANGUAGES } from '@data/languages';
import { Combobox, Transition } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';
import { BsCheck } from 'react-icons/bs';
import StorageClient from '@utils/functions/uploadToIpfs';
import { getProfilePicture } from '@utils/functions/getProfilePicture';

function Settings() {
    const { orbis, user, isLoggedIn, isConnected } = useContext(GlobalContext);
    const router = useRouter()
    const rootRef = useRef(null)
    const [cover, setCover] = useState(null)
    const [newCover, setNewCover] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [newAvatar, setNewAvatar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [uploadingCover, setUploadingCover] = useState(false)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [languages, setLanguages] = useState(LANGUAGES[0])
    const [twitterLink, setTwitterLink] = useState('')
    const [instagramLink, setInstagramLink] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [discordLink, setDiscordLink] = useState('')
    const [websiteTitle, setWebsiteTitle] = useState('')
    const [websiteLink, setWebsiteLink] = useState('')
    const { address } = useDidToAddress(user?.did)
    const [query, setQuery] = useState('')
    const avatarRef = useRef(null);
    const coverRef = useRef(null);

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
        if (!isConnected || !isLoggedIn) {
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, isLoggedIn, isConnected])
    

    useEffect(() => {
        if (isLoggedIn) {
            const cover = getCoverPicture(user.profile);
            const avatar = getProfilePicture(user.profile, address);
            setCover(cover);
            setAvatar(avatar)
            const extraData = getProfileExtraData(user.profile);
            setDisplayName(extraData?.DisplayName || user?.profile?.username)
            setDescription(extraData?.Description || user?.profile?.description)
            setLocation(extraData?.Location || '')
            setLanguages(extraData?.Languages || LANGUAGES[0])
            setTwitterLink(extraData?.TwitterURL || '')
            setInstagramLink(extraData?.InstagramURL || '')
            setYoutubeLink(extraData?.YoutubeURL || '')
            setDiscordLink(extraData?.DiscordURL || '')
            setWebsiteTitle(extraData?.WebsiteTitle || '')
            setWebsiteLink(extraData?.WebsiteURL || '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoggedIn, user])

    const handleCover = async (e) => {
        setUploadingCover(true);
        try {
            const extraData = getProfileExtraData(user.profile);
            const file = e.target.files[0]
            const imageURI = await new StorageClient().storeFiles(file);
            const request = {
                ...user.profile,
                data: {
                    Avatar: extraData?.Avatar !== undefined ? extraData?.Avatar : null,
                    DisplayName: displayName ? displayName : null,
                    Description: description ? description : null,
                    Location: location ? location : null,
                    Languages: languages,
                    TwitterURL: twitterLink ? twitterLink : null,
                    InstagramURL: instagramLink ? instagramLink : null,
                    YoutubeURL: youtubeLink ? youtubeLink : null,
                    DiscordURL: discordLink ? discordLink : null,
                    WebsiteTitle: websiteTitle ? websiteTitle : null,
                    WebsiteURL: websiteLink ? websiteLink : null,
                    Cover: imageURI,
                }
            }
            if (imageURI) {
                try {
                    const { data, error } = await orbis.updateProfile(request);
                    if (error) {
                        console.log(error)
                        toast.error("Something went wrong")
                    } else {
                        setNewCover(imageURI)
                    }
                } catch (error) {
                    console.log(error)
                    toast.error("Something went wrong")
                } finally {
                    setUploadingCover(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAvatar = async (e) => {
        setUploadingAvatar(true);
        try {
            
            const extraData = getProfileExtraData(user.profile);
            const file = e.target.files[0]
            const imageURI = await new StorageClient().storeFiles(file);
            const request = {
                ...user.profile,
                data: {
                    Cover: extraData?.Cover !== undefined ? extraData?.Cover : null,
                    DisplayName: displayName ? displayName : null,
                    Description: description ? description : null,
                    Location: location ? location : null,
                    Languages: languages,
                    TwitterURL: twitterLink ? twitterLink : null,
                    InstagramURL: instagramLink ? instagramLink : null,
                    YoutubeURL: youtubeLink ? youtubeLink : null,
                    DiscordURL: discordLink ? discordLink : null,
                    WebsiteTitle: websiteTitle ? websiteTitle : null,
                    WebsiteURL: websiteLink ? websiteLink : null,
                    Avatar: imageURI,
                }
            }
            if (imageURI) {
                try {
                    const { data, error } = await orbis.updateProfile(request);
                    if (error) {
                        console.log(error)
                        toast.error("Something went wrong")
                    } else {
                        setNewAvatar(imageURI)
                    }
                } catch (error) {
                    console.log(error)
                    toast.error("Something went wrong")
                } finally {
                    setUploadingAvatar(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const selectAvatar = () => {
        avatarRef.current.click()
    }

    const selectCover = () => {
        coverRef.current.click()
    }
    
    const updateChannel = async () => {
        setLoading(true);
        const extraData = getProfileExtraData(user.profile);
        const payload = {
            description: user.profile ? user.profile.description : null,
            pfp: user.profile ? user.profile.pfp : null,
            username: user.profile ? user.profile.username : null,
            data: {
                Avatar: extraData?.Avatar !== undefined ? extraData?.Avatar : null,
                Cover: extraData?.Cover !== undefined ? extraData?.Cover : null,
                DisplayName: displayName ? displayName : null,
                Description: description ? description : null,
                Location: location ? location : null,
                Languages: languages,
                TwitterURL: twitterLink ? twitterLink : null,
                InstagramURL: instagramLink ? instagramLink : null,
                YoutubeURL: youtubeLink ? youtubeLink : null,
                DiscordURL: discordLink ? discordLink : null,
                WebsiteTitle: websiteTitle ? websiteTitle : null,
                WebsiteURL: websiteLink ? websiteLink : null,
            }
        }
        console.log(payload)
        try {
            const {data, error} = await orbis.updateProfile(payload);
            if (error) {
                setLoading(false);
                console.log(error);
                toast.error("Something went wrong");
            } else {
                toast.success("Channel Updated!");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    
    return (
        <>
            <div ref={rootRef} className=''>
                <div className='flex max-w-7xl mx-auto flex-col'>
                    <div className='flex rounded-md flex-col'>
                        <div
                            style={{
                                backgroundImage: `url(${newCover ? newCover : cover})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}
                            className=' w-full md:h-72 h-28 relative flex justify-center items-center bg-primary rounded-xl border theme-border '>
                            <div className='flex w-full md:h-72 h-28 justify-end items-end pb-3 pr-3 relative group z-10'>
                                <div className='flex items-center space-x-3'>
                                    <Button onClick={selectCover} loading={uploadingCover} variant='light'>
                                        Change Cover
                                    </Button>
                                    <input
                                        ref={coverRef}
                                        type="file"
                                        onChange={handleCover}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full mx-auto md:px-0 px-4'>
                            <div className='flex -mt-10 md:-mt-20 space-x-3 items-center'>
                                <div
                                    className={`${uploadingAvatar ? `animate-pulse` : ``} w-20 h-20 md:w-36 md:h-36 my-2 group rounded-full relative z-20 flex items-center bg-primary justify-center dark:border-[#2D2D33] border-white border-4`}
                                    style={{
                                    backgroundImage: `url(${newAvatar ? newAvatar : avatar})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                }}>
                                    <button onClick={selectAvatar} className='bg-white/[.7] dark:bg-black/[.7] hidden group-hover:flex rounded-full px-2 py-2 hover:bg-white/[.9]'>
                                        <BiUpload size={24} />
                                    </button>
                                    <input
                                        ref={avatarRef}
                                        type="file"
                                        onChange={handleAvatar}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <div className='flex w-full md:flex-row flex-col space-x-0 space-y-0 md:space-y-0 md:space-x-10 mt-5'>
                                <div className='flex bg-secondary p-4 rounded-lg w-full flex-col'>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-medium text-sm'>Channel Name</label>
                                        <input
                                            type='text'
                                            placeholder='Display Name'
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full text-sm py-2.5 px-3 bg-secondary border theme-border rounded-md focus:outline-none"
                                        />
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-medium text-sm'>Channel Description</label>
                                        <textarea
                                            type='text'
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                            placeholder='Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places.'
                                            className="w-full text-sm py-2.5 px-3 resize-none h-36 bg-secondary border theme-border rounded-md focus:outline-none"
                                        >
                                        </textarea>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-medium text-sm'>Language</label>
                                        <div>
                                            <Combobox value={languages} onChange={setLanguages}>
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
                                        <label className='font-medium text-sm'>Location</label>
                                        <input
                                            type='text'
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder='Add Location'
                                            className="w-full text-sm py-2.5 px-3 bg-secondary border theme-border rounded-md focus:outline-none"
                                        />
                                    </div>
                                    <div className='hidden md:block'>
                                        <Button
                                            variant='primary'
                                            size='md'
                                                loading = { loading }
                                            onClick={updateChannel}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                                <div className='flex bg-secondary p-4 rounded-lg w-full flex-col'>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-medium text-sm'>Twitter</label>
                                        <div className='flex'>
                                            <input
                                                type='text'
                                                value={twitterLink}
                                                onChange={(e) => setTwitterLink(e.target.value)}
                                                placeholder='Set your twitter username'
                                                className="w-full text-sm py-2.5 px-3 bg-secondary border theme-border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-medium text-sm'>Instagram</label>
                                        <div className='flex'>
                                            <input
                                                type='text'
                                                onChange={(e) => setInstagramLink(e.target.value)}
                                                value={instagramLink}
                                                placeholder='Set your instagram username'
                                                className="w-full text-sm py-2.5 px-3 bg-secondary border theme-border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-medium text-sm'>Youtube</label>
                                        <div className='flex'>
                                            <input
                                                type='text'
                                                value={youtubeLink}
                                                onChange={(e) => setYoutubeLink(e.target.value)}
                                                placeholder='Set your youtube url'
                                                className="w-full text-sm py-2.5 px-3 bg-secondary border theme-border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-medium text-sm'>Discord</label>
                                        <div className='flex'>
                                            <input
                                                type='text'
                                                value={discordLink}
                                                onChange={(e) => setDiscordLink(e.target.value)}
                                                placeholder='Set your discord url'
                                                className="w-full flex-1 text-sm py-2.5 px-3 bg-secondary border theme-border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-medium text-sm'>Website</label>
                                        <div className='flex md:flex-row flex-col space-x-0 space-y-2 md:space-y-0 md:space-x-3'>
                                            <div className='w-full md:max-w-[200px]'>
                                                <input
                                                    type='text'
                                                    value={websiteTitle}
                                                    onChange={(e) => setWebsiteTitle(e.target.value)}
                                                    placeholder='Set title'
                                                    className="w-full text-sm py-2.5 px-3 bg-secondary border theme-border rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-1'>
                                                <input
                                                    type='text'
                                                    value={websiteLink}
                                                    onChange={(e) => setWebsiteLink(e.target.value)}
                                                    placeholder='Set your website url'
                                                    className="w-full text-sm py-2.5 px-3 bg-secondary border theme-border rounded-md focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='block md:hidden'>
                                        <Button
                                            variant='primary'
                                            size='md'
                                                loading = { loading }
                                            onClick={updateChannel}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings