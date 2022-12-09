import useDidToAddress from '@utils/functions/getDidToAddress'
import useGetUsername from '@utils/functions/getProfileName'
import usePersistStore from '@store/persist'
import { formatNumber } from '@utils/functions'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../UI/Button'
import { GlobalContext } from '@app/context/app'

function ChannelInfo({ video, channel }) {
    const { orbis } = useContext(GlobalContext)
    const [followers, setFollowers] = useState(0)
    const [loading, setLoading] = useState(true)
    const [subscribing, setSubscribing] = useState(false)
    const followRef = useRef(null);
    const [follow, setFollow] = useState(false)
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const { address } = useDidToAddress(channel.did);
    const username = useGetUsername(channel.profile, address, channel.did);

    useEffect(() => {
        if (isLoggedIn) {
            checkIsFollowing()
        }
        fetchProfileFollowers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchProfileFollowers = async () => {
        let { data, error } = await orbis.getProfileFollowers(channel.did);
        if (data) {
            setFollowers(data.length)
            setLoading(false)
        }
        if (error) {
            console.log(error)
        }
    }

    const checkIsFollowing = async () => {
        let { data, error } = await orbis.getIsFollowing(
            user.did,
            channel.did
        );
        if (data) {
            console.log(data)
        }
        if (error) {
            console.log(error)
        }
    }
    
    const onFollow = async() => {
        if (!isLoggedIn) {
            return toast.error('Please login to Subscribe this user');
        }
        try{
            
        }  catch (error) {
            setSubscribing(false)
            toast.error('Something went wrong');
        }
    }
    
    return (
        <>
            <div className='flex items-center md:justify-start overflow-hidden flex-1 justify-between space-x-3'>
                <div className='flex space-x-2'>
                    <Link href={`/@${username}`} className="flex-none">
                        <img
                            className="w-10 h-10 rounded-full"
                            src={channel.profile.pfp}
                            alt={username}
                            draggable={false}
                        />
                    </Link>
                    <div className='flex flex-col'>
                        <Link
                            href={`/@${username}`}
                            className="flex items-center w-fit space-x-1.5 font-medium"
                        >
                            <span>{username}</span>  
                        </Link>
                        {!loading ?
                            <span className="text-[14px] leading-4 text-secondary">
                                {formatNumber(followers)} subscribers
                            </span>
                            : <div className="h-2 bg-gray-300 rounded dark:bg-gray-700" />
                        }
                    </div>
                </div>
                {channel.did !== user.did ?
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

export default ChannelInfo