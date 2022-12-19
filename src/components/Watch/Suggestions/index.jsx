import { useState } from 'react'
import AllVideos from './Tabs/AllVideos'
import UserVideos from './Tabs/UserVideos'
import { Button } from '@components/UI/Button';
import { useDidToAddress } from '@utils/functions/getDidToAddress';
import { getDisplay, getUsername } from '@utils/functions/getProfileName';

const SuggestedVideos = ({ video, channel, currentVideoId }) => {
    const [selectedTab, setSelectedTab] = useState('all');

    const { address } = useDidToAddress(video.creator_details?.did)
    const username = getUsername(video.creator_details?.profile, address, video.did)
    const displayName = getDisplay(video.creator_details?.profile, address, video.did)

    const Tab = ({ isSelected, tab, children }) => {
        return (
            <>
                <Button
                    onClick={() => setSelectedTab(tab)}
                    variant={`${isSelected ? `primary` : `light`}`}
                    className='!rounded-full !px-6'
                >
                    {children}
                </Button>
            </>
        )
    }

    return (
        <>
            <div className="pt-3 md:pt-0 md:-mt-3 pb-3">
                <div className="space-y-4 w-full md:w-auto flex flex-col">
                    <div className='px-2 md:px-0 flex space-x-4 overflow-hidden md:max-w-full max-w-[300px]'>
                        <Tab isSelected={selectedTab === 'all'} tab='all'>All</Tab>
                        <Tab isSelected={selectedTab === 'user'} tab='user'>{displayName}</Tab>
                    </div>
                    <div>
                        {selectedTab === 'user' ?
                            <UserVideos video={video} channel={channel} currentVideoId={currentVideoId} />
                            : <AllVideos video={video} channel={channel} currentVideoId={currentVideoId} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuggestedVideos