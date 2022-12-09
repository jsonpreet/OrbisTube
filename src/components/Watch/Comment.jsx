import useCleanPostBody from '@utils/functions/getCleanPostBody'
import useDidToAddress from '@utils/functions/getDidToAddress'
import useGetUsername from '@utils/functions/getProfileName'
import Link from 'next/link'
import { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import ReactTimeAgo from 'react-time-ago'
import Reactions from './Reactions'

const Comment = ({ comment }) => {
    const [characterLimit, setCharacterLimit] = useState(200)
    const userProfile = comment.creator_details;
    const { address } = useDidToAddress(userProfile.did);
    const username = useGetUsername(userProfile.profile, address, userProfile.did);
    const body = useCleanPostBody(comment, characterLimit);

    return (
        <div className="flex items-start justify-between">
            <div className="flex items-start justify-between">
                <Link
                href={`/@${username}`}
                className="flex-none mr-3 mt-0.5"
                >
                <img
                  className="w-9 h-9 rounded-full"
                  src={userProfile.profile.pfp}
                  alt={username}
                  draggable={false}
                />
                </Link>
                <div className="flex flex-col items-start mr-2">
                    <span className="flex items-center mb-1 space-x-1">
                        <Link
                        href={`/@${username}`}
                        className="flex items-center space-x-1.5 text-sm font-medium"
                        >
                            <span>{username}</span>
                        </Link>
                        <span className="middot" />
                        <span className="inline-flex items-center opacity-70 space-x-1 text-xs">
                            <span><ReactTimeAgo date={comment.timestamp * 1000} locale="en-US" /></span>
                        </span>
                    </span>
                    <div
                        className='text-sm overflow-hidden break-words line-clamp-3'
                    >
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
                        <Reactions iconSize={14} showTipButton={false} showButton={false} video={comment} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment