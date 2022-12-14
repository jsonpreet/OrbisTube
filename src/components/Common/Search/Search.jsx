import { DESO_CONFIG } from '@utils/constants';
import { Loader2 } from '@components/UI/Loader'
import clsx from 'clsx';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside';
import { isBrowser } from 'react-device-detect';
import { AiOutlineSearch } from 'react-icons/ai'
import { GlobalContext } from '@context/app';
import Modal from '@components/UI/Modal';
import { getUsername } from '@utils/functions/getProfileName';
import { getProfilePicture, ProfilePicture } from '@utils/functions/getProfilePicture';
import { RiSearch2Line } from 'react-icons/ri';


const Search = () => {
    const [results, setResults] = useState('')
    const resultsRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [keyword, setKeyword] = useState('')
    const { orbis } = useContext(GlobalContext)

    useEffect(() => {
        setLoading(true)
        const getData = setTimeout(async() => {
        if (keyword.length > 0) {
            try {
                const { data: profiles, error } = await orbis.getProfilesByUsername(keyword);
                if (profiles && profiles !== null) {
                    setShowResults(true);
                    setLoading(false);
                    setResults(profiles.slice(0, 10));
                    console.log(profiles);
                }
            } catch (error) {
                setLoading(false);
                setResults('');
                console.log(error);
            }
        } else {
            setResults('');
            setShowResults(false);
            setLoading(false);
        }
        }, 700)
        return () => clearTimeout(getData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword])

    const clearSearch = () => {
        setKeyword('')
        setResults('');
        setShowResults(false);
        setLoading(false);
        setShowSearchModal(false);
    }

    const ref = useDetectClickOutside({ onTriggered: clearSearch });

    return (
        <>
            {isBrowser ? (
                <>
                    <div className="md:w-96 flex">
                        <div ref={ref} className='w-full mx-auto'>
                            <div className="relative mt-1">
                                <div className="relative w-full drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)] overflow-hidden cursor-default bg-white dark:bg-black rounded-lg">
                                    <input
                                        className="w-full py-2.5 pl-12 pr-3 bg-transparent focus:outline-none"
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="Search"
                                        value={keyword}
                                    />
                                    <div className="absolute inset-y-0 left-3 flex items-center pr-2">
                                        {loading ? <Loader2 className='w-5 h-5'/> : <RiSearch2Line className='text-brand-500' size={24} />}
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                    'md:absolute w-full mt-1 py-3 text-base bg-white overflow-hidden dark:bg-theme rounded-lg drop-shadow-xl focus:outline-none sm:text-sm',
                                    { hidden: !showResults}
                                    )}
                                >
                                    <div className="overflow-y-auto max-h-[80vh] no-scrollbar focus:outline-none">
                                    {results.length > 0 && results.map((channel) => (
                                        <div
                                            key={channel.did}
                                            className="relative pl-3 pr-4 cursor-default select-none hover:bg-gray-100 dark:hover:bg-gray-900"
                                        >
                                            <Link
                                            href={`/@${getUsername(channel?.details.profile, channel.did)}`}
                                                key={getUsername(channel?.details.profile, channel.did)}
                                            onClick={() => clearSearch()}
                                            className="flex flex-col justify-center py-2 space-y-1 rounded-xl"
                                            >
                                            <span className="flex items-center justify-between">
                                                <div className="inline-flex items-start w-3/4 space-x-2">
                                                    <ProfilePicture imgClass='w-8 h-8 rounded-full' details={channel.details}/>
                                                    <div className="flex items-center space-x-1">
                                                        <p className=" mt-1 text-sm">
                                                            <span>{getUsername(channel?.details.profile, channel.did)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </span>
                                            </Link>
                                        </div>
                                    ))}
                                    {!results?.length && !loading && (
                                        <div className="relative p-5 text-center cursor-default select-none">
                                            No results found.
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </>
                )
                : (
                    <Modal
                        title="Search"
                        onClose={() => setShowSearchModal(false)}
                        show={showSearchModal}
                        panelClassName="max-w-md min-h-[50vh]"
                    >
                        <div className="relative w-full overflow-hidden cursor-default border shadow-inner customBorder bg-primary dark:border-gray-800 mb-3 rounded-full">
                            <input
                                className="w-full py-2.5 pl-3 pr-10 bg-transparent focus:outline-none"
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search"
                                value={keyword}
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center pr-2">
                                {loading ? <Loader2 className='w-5 h-5'/> : <AiOutlineSearch size={24} />}
                            </div>
                        </div>
                        {/* {results.length > 0 && results.map((channel) => (
                            <div
                                key={channel.ProfilePublicKeyBase58Check}
                                className="relative cursor-default select-none hover:bg-gray-100 -ml-4 -mr-4 px-4 dark:hover:bg-gray-900"
                            >
                            <Link
                                href={`/@${channel.Username}`}
                                key={channel.Username}
                                onClick={() => clearSearch()}
                                className="flex flex-col justify-center py-2 space-y-1 rounded-xl"
                            >
                                <span className="flex items-center justify-between">
                                    <div className="inline-flex items-start w-3/4 space-x-2">
                                        <img
                                        className="w-6 h-6 rounded-full"
                                        src={getProfilePicture(channel)}
                                        draggable={false}
                                        alt={channel?.Username}
                                        />
                                        <div className="flex items-center space-x-1">
                                            <p className="text-sm">
                                                <span>{channel.Username}</span>
                                            </p>
                                        </div>
                                    </div>
                                </span>
                            </Link>
                        </div>
                        ))} */}
                        {showResults && results?.length === 0 && !loading && (
                        <div className="relative p-5 text-center cursor-default select-none">
                            No results found.
                        </div>
                        )}
                    </Modal>
                )
            }
            <div className="md:hidden flex items-center">
                <button onClick={() => setShowSearchModal(true)} className='w-10 h-10 text-secondary hover-primary flex items-center justify-center rounded-full'>
                <AiOutlineSearch size={24} />
                </button>
            </div>
        </>
    )
}
export default Search