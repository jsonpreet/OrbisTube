import { useDidToAddress } from '@utils/functions/getDidToAddress'
import { getDisplay, getUsername, useGetUsername } from '@utils/functions/getProfileName'
import usePersistStore from '@store/persist'
import { formatNumber } from '@utils/functions'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../UI/Button'
import { GlobalContext } from '@app/context/app'
import { ProfileBadges, ProfilePicture } from '@app/utils/functions/getProfilePicture'

function Info({ video, channel, isLoggedIn, user, isConnected }) {
    const { orbis } = useContext(GlobalContext)
    const [followers, setFollowers] = useState(video?.creator_details.count_followers)
    const [loading, setLoading] = useState(true)
    const [subscribing, setSubscribing] = useState(false)
    const followRef = useRef(null);
    const [follow, setFollow] = useState(false)
    const { address } = useDidToAddress(channel?.did)
    const username = getUsername(channel?.profile, address, channel?.did)
    const displayName = getDisplay(channel?.profile, address, channel?.did)

    useEffect(() => {
        if (isLoggedIn && user) {
            checkIsFollowing()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected])

    const checkIsFollowing = async () => {
        try {
            let { data, error } = await orbis.getIsFollowing(user.did, channel.did);
            if (data) {
                setFollow(data)
            }
            if (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const onFollow = async() => {
        if (!isLoggedIn) {
            return toast.error('Please login to Subscribe this user');
        }
        try {
            setSubscribing(true)
            let res = await orbis.setFollow(channel.did, !follow);
            console.log(res)
            setFollow(!follow)
            setFollowers(!follow ? followers + 1 : followers - 1)
        }  catch (error) {
            setSubscribing(false)
            toast.error('Something went wrong');
        } finally {
            setSubscribing(false)
        }
    }
    
    return (
        <>
            <div className='flex items-center md:justify-start overflow-hidden flex-1 justify-between space-x-3'>
                <div className='flex space-x-2'>
                    <Link href={`/${video.creator_details.profile !== null ? username : video.creator_details.did}`} className="flex-none">
                        <ProfilePicture details={channel} imgClass='object-cover rounded-full bg-dropdown w-8 h-8 md:w-10 md:h-10'/>
                    </Link>
                    <div className='flex flex-col'>
                        <Link
                            href={`/${video.creator_details.profile !== null ? username : video.creator_details.did}`}
                            className="flex items-center w-fit space-x-1.5 font-medium"
                        >
                            <span>{displayName}</span>  
                            <ProfileBadges details={video?.creator_details} />
                        </Link>
                        {!loading ?
                            <span className="text-[14px] leading-4 text-secondary">
                                {formatNumber(followers)} {followers > 1 ? `subscribers` : `subscriber`}
                            </span>
                            : <div className="h-2 bg-gray-300 rounded dark:bg-gray-700" />
                        }
                    </div>
                </div>
                {channel && channel.did !== user?.did ?
                    <div ref={followRef}>
                        {!follow ?
                            <Button className={`${subscribing ? `animate-pulse` : ``}`} variant="dark" onClick={() => onFollow(follow)}>
                                <span>Subscribe</span>
                            </Button>
                            :
                        
                            <Button className={`${subscribing ? `animate-pulse` : ``}`} variant="light" onClick={() => onFollow(follow)}>
                                <span>Subscribed</span>
                            </Button>
                        }
                    </div>
                    : null
                }
            </div>
        </>
    )
}

export default Info