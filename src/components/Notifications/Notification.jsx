import { ProfileBadges, ProfilePicture } from '@utils/functions/getProfilePicture'
import { getDisplay, getUsername } from '@app/utils/functions/getProfileName'
import { useDidToAddress } from '@app/utils/functions/getDidToAddress'
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { FaSmile } from 'react-icons/fa';
import NotificationPost from './NotificationPost';
import Link from 'next/link';

function Notification({notification}) {
    const user = notification.user_notifiying_details;
    console.log(notification)
    const profile = user.profile !== null ? user.profile : null;
    const profileData = profile && profile.data !== null ? profile.data : null;
    const avatar = profileData ? profileData.Avatar ? profileData.Avatar : profile.pfp : null;
    const { address } = useDidToAddress(user?.did)
    const username = getUsername(user.profile, address, user.did)
    const displayName = getDisplay(user.profile, address, user.did)
    return (
        <>
            <div>
                <div className="flex items-cemter space-x-2">
                    <div className="flex-shrink-0">
                        <Link href={`/${profile !== null ? username : user.did}`}>
                            {profileData ?
                                <img className="w-8 h-8 rounded-full" src={avatar} alt="pfp" />
                                :
                                <ProfilePicture details={user} imgClass='w-8 h-8 rounded-full' />
                            }
                        </Link>
                    </div>
                    <div className="flex-1 flex space-x-1 min-w-0">
                        <Link href={`/${profile !== null ? username : user.did}`}
                            className="text-sm font-medium text-secondary flex space-x-1 items-center">
                            <span>{displayName}</span>
                            <ProfileBadges details={user} />
                        </Link>
                        <p className="text-sm text-secondary flex">
                            <span className="text-sm flex items-center text-secondary">
                                {
                                    notification.family === 'reaction' ?
                                        notification.content.type === 'like' ?
                                        <>
                                            <FiThumbsUp size={17} className='text-brand2-500 dark:text-brand2-400'/>
                                            <span className='ml-1.5'>your post</span>
                                        </> :
                                        notification.content.type === 'haha' ?
                                            <>
                                                <FaSmile size={17} className='text-brand2-500 dark:text-brand2-400' />
                                                <span className='ml-1.5'>your post</span>
                                            </> :
                                            notification.content.type === 'downvote' ?
                                                <>
                                                    <FiThumbsDown size={17} className='text-brand2-500 dark:text-brand2-400'/>
                                                    <span className='ml-1.5'>your post</span>
                                                </> :  
                                                null
                                :
                                notification.family === 'reply_to' ?
                                'replied on your post' :  
                                notification.family === 'follow' ?
                                    'started following you' :
                                    notification.family === 'mention' ?
                                'mentioned you in a post' : null
                                }
                            </span>
                        </p>
                    </div>
                </div>
                <div className='ml-8'>
                    {notification.post_details && notification.post_details !== null && notification.post_details.stream_id !== null && notification.post_details.stream_id !== null ?
                        <NotificationPost post={notification.post_details} />
                    : null}
                </div>
            </div>
        </>
    )
}

export default Notification