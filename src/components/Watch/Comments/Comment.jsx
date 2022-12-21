import useCleanPostBody from '@utils/functions/getCleanPostBody'
import { getDisplay, getUsername } from '@utils/functions/getProfileName'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import ReactTimeAgo from 'react-time-ago'
import { ProfilePicture } from '@utils/functions/getProfilePicture'
import DeleteModal from '@components/Common/Modals/DeleteModal'
import Options from './Options'
import Reactions from './Reactions'
import NewComment from './NewComment'
import { GlobalContext } from '@context/app'
import { useDidToAddress } from '@utils/functions/getDidToAddress'

const Comment = ({ video, comment, refetch }) => {
    const { orbis, isLoggedIn, user } = useContext(GlobalContext)
    const [characterLimit, setCharacterLimit] = useState(200)
    const userProfile = comment.creator_details;
    const body = useCleanPostBody(comment, characterLimit);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSubComment, setShowSubComment] = useState(false)
    const { address } = useDidToAddress(userProfile?.did)
    const username = getUsername(userProfile?.profile, address, userProfile?.did)
    const displayName = getDisplay(userProfile?.profile, address, userProfile?.did)
    return (
        <>
            <DeleteModal title='Delete Comment' message='Comment Deleted' refetch={refetch} isComment={true} video={comment} show={showDeleteModal} setShow={setShowDeleteModal} />
            <div className="flex items-start justify-between group">
                <div className="flex flex-1 items-start justify-between">
                    <Link
                    href={`/${comment.creator_details.profile !== null ? username : comment.creator_details.did}`}
                    className="flex-none mr-3 mt-0.5"
                    >
                        <ProfilePicture details={userProfile} imgClass='object-cover rounded-full bg-dropdown w-8 h-8'/>
                    </Link>
                    <div className="flex flex-col items-start flex-1 mr-2">
                        <span className="flex items-center mb-1 space-x-1">
                            <Link
                            href={`/${comment.creator_details.profile !== null ? username : comment.creator_details.did}`}
                            className="flex items-center space-x-1.5 text-sm font-medium"
                            >
                                <span>{displayName}</span>
                            </Link>
                            <span className="middot" />
                            <span className="inline-flex items-center opacity-70 space-x-1 text-xs">
                                <span><ReactTimeAgo date={comment.timestamp * 1000} locale="en-US" /></span>
                            </span>
                        </span>
                        <div className='text-sm overflow-hidden break-words line-clamp-3'>
                            {comment.content.body !== null && (
                                <div className="text-sm md:text-sm">
                                    {body}
                                </div>
                            )}
                        </div>
                        {comment.content?.body && characterLimit && comment.content.body.length > characterLimit &&
                            <div className="inline-flex mt-3">
                                <button
                                    type="button"
                                    onClick={() => setCharacterLimit(null)}
                                    className="flex items-center mt-2 text-xs outline-none"
                                >
                                    Show more <BiChevronDown className="text-sm" />
                                </button>
                            </div>
                        }
                        <div className="mt-1 flex items-center space-x-1">
                            <Reactions setShowSubComment={setShowSubComment} showSubComment={showSubComment} comment={comment} />
                        </div>
                        {showSubComment ?
                            <div className='flex-1 mt-2 w-full'>
                                <NewComment isReply={true} video={video} reply={comment} refetch={refetch}/>
                            </div>
                        : null
                        }
                    </div>
                </div>
                <Options
                    refetch={refetch}
                    comment={comment}
                    setShowDeleteModal={setShowDeleteModal}
                    showDeleteModal={showDeleteModal}
                />
            </div>
        </>
    )
}

export default Comment