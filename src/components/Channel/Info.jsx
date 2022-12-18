import ChannelLinks from './Links';
import Tooltip from '../UI/Tooltip';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { formatNumber } from '@utils/functions';
import { getCoverPicture } from '@utils/functions/getCoverPicture';
import { Button } from '../UI/Button';
import Link from 'next/link';
import { useDidToAddress } from '@utils/functions/getDidToAddress';
import { getUsername } from '@utils/functions/getProfileName';
import { ProfilePicture } from '@utils/functions/getProfilePicture';
import { GlobalContext } from '@context/app';

function ChannelInfo({ channel }) {
    const { orbis, user, isLoggedIn, isConnected } = useContext(GlobalContext);
    const cover = getCoverPicture(channel)
    const [subscribing, setSubscribing] = useState(false)
    const followRef = useRef(null);
    const [follow, setFollow] = useState(false)
    const { address } = useDidToAddress(channel?.did)
    const [followers, setFollowers] = useState(channel?.count_followers)
    const username = getUsername(channel, address, channel?.did)

    useEffect(() => {
        if (isLoggedIn && user) {
            checkIsFollowing()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, isLoggedIn, user])

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

    const checkIsFollowing = async () => {
        try {
            let { data, error } = await orbis.getIsFollowing(user.did, channel.did);
            if (data) {
                console.log(data)
                setFollow(data)
            }
            if (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="flex flex-col w-full mb-4">
                <div style={{
                    backgroundImage: `url(${cover})`,
                    backgroundPosition: 'center',
                    
                }} className="bg-white bg-no-repeat w-full bg-cover object-cover relative rounded-xl border theme-border md:h-72 h-28 dark:bg-gray-700">
                    {/* <ChannelLinks channel={channel} /> */}
                </div>
                <div className="relative z-10 w-full mx-auto flex items-center md:space-x-5">
                    <div className="w-20 h-20 bg-white border-white border-4 dark:border-gray-900 rounded-full md:relative md:-mt-10 -mt-7 absolute -top-2 md:w-32 md:h-32 md:ml-0 ml-4 dark:bg-gray-700">
                        <ProfilePicture details={channel.details} imgClass='w-20 h-20 md:w-[120px] md:h-[120px] object-cover rounded-full'/>
                    </div>
                    <div className="flex-none md:flex-1 w-full md:w-auto md:p-0 p-4 flex flex-col mt-5 md:mt-2 space-y-2">
                        <div className='flex space-x-10 items-center justify-between md:justify-end w-full -mb-0 -mt-0 md:-mb-1'>
                            <div className='flex flex-col mt-4 md:mt-0 mb-2 flex-none md:flex-1 items-start'>
                                <div className='flex items-center'>
                                    <Tooltip placement='top' contentClass='text-[12px]' title={getUsername(channel, address, channel?.did)}>
                                        <h3 className='text-xl md:text-2xl mr-1 md:mr-2 tracking-wide leading-0 hover:opacity-100 opacity-80'>{getUsername(channel, address, channel?.did)}</h3>
                                    </Tooltip>    
                                </div>
                                <div className='flex md:-mt-0 -mt-1 items-center'>
                                    <p className='text-sm tracking-wide text-light leading-0'>{getUsername(channel, address, channel?.did)}</p>
                                </div>
                                <div className='flex mt-2 md:mt-1.5 items-center'>
                                    <span className="leading-none text-light">
                                        {formatNumber(channel.count_followers)} subscribers
                                    </span>
                                </div>
                            </div>
                            {isLoggedIn ?
                                channel?.did !== user.did ?
                                <div className='justify-start md:justify-end' ref={followRef}>
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
                                    :
                                    <div className='justify-start md:justify-end'>
                                        <Link
                                            className='relative inline-block disabled:opacity-50 rounded-full group px-5 md:py-2 py-1.5 text-sm font-medium primary-button md:rounded-full'
                                            href={`/${channel.profile !== null ? username : channel.did}/settings`}>
                                            <span>Customize Channel</span>
                                        </Link>
                                    </div>
                                : 
                                <Button className={`${subscribing ? `animate-pulse` : ``}`} variant="dark" onClick={() => onFollow(follow)}>
                                    <span>Subscribe</span>
                                </Button>
                            }
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}

export default ChannelInfo