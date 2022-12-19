import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDidToAddress } from '@utils/functions/getDidToAddress'
import { getDisplay, getUsername } from '@utils/functions/getProfileName'
import ShareModal from '@components/Common/Modals/ShareModal'
import DeleteModal from '@components/Common/Modals/DeleteModal'
import EditModal from '@components/Common/Modals/EditModal'
import ThumbnailOverlays from '@components/Common/Cards/ThumbnailOverlays'
import { ProfileBadges, ProfilePicture } from '@utils/functions/getProfilePicture'
import ReactTimeAgo from 'react-time-ago'
import VideoOptions from '@components/Common/Cards/Options'

const SuggestedVideoCard = ({ video }) => {
    const [showShareModal, setShowShareModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const { address } = useDidToAddress(video.creator_details?.did)
    const username = getUsername(video.creator_details?.profile, address, video.did)
    const displayName = getDisplay(video.creator_details?.profile, address, video.did)
  
    return (
    <>
        {video.content.data ?
            <div className="flex w-full justify-between group">
                <ShareModal video={video} show={showShareModal} setShow={setShowShareModal} />
                <DeleteModal video={video} show={showDeleteModal} setShow={setShowDeleteModal} />
                <EditModal video={video} show={showEditModal} setShow={setShowEditModal} />
                <div className="flex md:flex-row flex-col w-full">
                    <div className="flex-none overflow-hidden rounded-none md:rounded-xl w-full md:w-40">
                        <Link
                            href={`/watch/${video.stream_id}`}
                            className="rounded-xl cursor-pointer"
                        >
                            <div className="relative rounded-none md:rounded-xl aspect-w-16 overflow-hidden aspect-h-9">
                                <LazyLoadImage
                                    delayTime={100}
                                    className={clsx(
                                    'object-center bg-secondary w-full h-full rounded-lg lg:w-full lg:h-full object-cover'
                                    )}
                                    alt={`Video by ${username}`}
                                    wrapperClassName='w-full'
                                    placeholderSrc='/placeholder.png'
                                    src={video.content.data.Thumbnail}
                                />
                                <ThumbnailOverlays video={video} />
                            </div>
                        </Link>
                    </div>
                    <div className="px-3 py-3 md:py-0 md:px-2.5 flex flex-row justify-between w-full">
                        <div className='flex space-x-2.5 md:space-x-0'>
                            <div className="md:hidden flex flex-col">
                                <Link href={`/${video.creator_details.profile !== null ? username : video.creator_details.did}`} className="flex-none mt-0.5">
                                    <ProfilePicture details={video?.creator_details} imgClass='object-cover rounded-full bg-dropdown w-8 h-8 md:w-9 md:h-9'/>
                                </Link>
                            </div>
                            <div className="flex md:space-y-1 space-y-0 flex-col md:w-auto items-start">
                                <div className="break-words w-full md:mb-0 overflow-hidden">
                                    <Link
                                        href={`/watch/${video.stream_id}`}
                                        className="text-sm font-medium line-clamp-2 break-words"
                                    >
                                        <span className="flex line-clamp-2">
                                            {video.content.title}
                                        </span>
                                    </Link>
                                </div>
                                <div className='flex md:space-y-1 space-y-0 flex-col items-start'>
                                    <div className="truncate">
                                        <Link
                                            href={`/${video.creator_details.profile !== null ? username : video.creator_details.did}`}
                                            className="flex hover:text-black dark:hover:text-white w-fit items-center space-x-1 text-[14px] text-light"
                                        >
                                            <span>{displayName}</span>
                                            <ProfileBadges details={video?.creator_details} />
                                        </Link>
                                    </div>
                                    <div>
                                        <div className="flex truncate items-center text-xs text-light">
                                            <span className="whitespace-nowrap">
                                                {video.count_likes > 1 ? `${video.count_likes} likes` : `${video.count_likes} like`}
                                            </span>
                                            <span className="middot" />
                                            <span className="whitespace-nowrap">
                                                <ReactTimeAgo date={video.timestamp * 1000} locale="en-US" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <VideoOptions
                            video={video}
                            setShowShareModal={setShowShareModal}
                            setShowEditModal={setShowEditModal}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    </div>
                </div>
            </div>
        : null
      }
    </>
    )
}

export default SuggestedVideoCard