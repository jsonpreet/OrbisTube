import clsx from 'clsx';
import { Suspense, useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import Custom404 from '@app/pages/500';
import ChannelShimmer from '@components/Shimmers/ChannelShimmer';
import { Loader2 } from '@components/UI/Loader';
import { NoDataFound } from '@components/UI/NoDataFound';
import { NextSeo } from 'next-seo';
import { getUsername } from '@utils/functions/getProfileName';
import { useDidToAddress } from '@utils/functions/getDidToAddress';
import { APP } from '@utils/constants';
import { Tab } from '@headlessui/react';

const ChannelVideos = dynamic(() => import("./Tabs/Videos"), {
  suspense: true,
});

const ChannelInfo = dynamic(() => import("./Info"), {
    suspense: true
});

const About = dynamic(() => import("./Tabs/About"), {
  suspense: true,
});

const Community = dynamic(() => import("./Tabs/Community/Community"), {
  suspense: true,
});

const Channel = ({ isError, channel : profile, loading, isDid }) => {
    const channel = isDid ? profile : profile[0]
    const router = useRouter()
    const { query } = router;
    const [routeTab, setRouteTab] = useState('videos')
    const [selectedTab, setSelectedTab] = useState(0)
    const { address } = useDidToAddress(channel?.did)
    const username = getUsername(channel, address, channel?.did)

    useEffect(() => {
        if (query.tab) {
            setRouteTab(query.tab)
            setSelectedTab(getDefaultTab(query.tab))
        } else {
            setRouteTab('videos')
            setSelectedTab(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const channelTabs = {
        0: "Videos",
        2: "Community",
        1: "About",
    }
        console.log(channel)

    const changeTab = (index) => {
        setSelectedTab(index);
        const tab = channelTabs[index].toLowerCase()
        router.replace(`/${channel.username !== null ? username : channel.did}/${tab}`);
    }

    const getDefaultTab = (tab) => {
        if (tab) {
            return Object.keys(channelTabs).find(key => channelTabs[key].toLowerCase() === tab.toLowerCase());
        }
        return 0;
    }

    const Loader = () => {
        return (
            <div className="flex items-center mt-20 justify-center">
                <Loader2 />
            </div>
        )
    }

    const TabItem = ({ selected, index, title, isHidden = false }) => {
        const isSelected = selected === index ? true : false;
        return (
            <div
                className={
                    clsx(
                        'px-4 cursor-pointer mr-4 md:px-8 py-2 flex rounded-full items-center tracking-wider text-sm space-x-2 uppercase font-medium focus:outline-none hover:text-white',
                        isSelected
                        ? 'bg-brand-500 hover:bg-brand-600 text-white font-semibold opacity-100'
                            : 'bg-primary hover:bg-brand-600',
                    )
                }
                onClick={() => changeTab(index)}
            >
                <span>{title}</span>
            </div>
        )
    }

    if (isError) {
        return <NoDataFound 
            isCenter
            withImage
            isHeading={true}
            heading="Something went wrong"
            text="We are unable to fetch the channel. Please try again later."
        />
    } 

    if(!channel) return <Custom404 />

    if (loading) return <ChannelShimmer />

    return (
        <>
            <NextSeo
                title={channel ? `${getUsername(channel, address, channel?.did)} - ${APP.Name}` : APP.Name}
                canonical={`${APP.URL}${router.asPath}`}
                openGraph={{
                    title: channel ? `${getUsername(channel, address, channel?.did)} - ${APP.Name}` : APP.Name,
                    url: `${APP.URL}${router.asPath}`,
                }}
            />
            {channel ?
                <div className="">
                    <ChannelInfo channel={channel}/>
                    <div className="realtive mb-5 mx-auto">
                        <div className='flex justify-center mb-5 mx-auto'>
                            {channelTabs && Object.keys(channelTabs).map((key) => {
                                return (
                                    <TabItem
                                        key={key}
                                        index={key}
                                        title={channelTabs[key]}
                                        selected={selectedTab}
                                    />
                                )
                            })}
                        </div>
                        <div className="md:py-3 p-0 focus:outline-none">
                            {routeTab === 'videos' && 
                                <Suspense fallback={<Loader />}>
                                    <ChannelVideos channel={channel} />
                                </Suspense>
                            }
                            {routeTab === 'about' &&
                                <Suspense fallback={<Loader/>}>
                                    <About channel={channel} />
                                </Suspense>
                            }
                            {routeTab === 'community' &&
                                <Suspense fallback={<Loader/>}>
                                    <Community channel={channel} />
                                </Suspense>
                            }
                        </div>
                    </div>
                </div>
        : <ChannelShimmer /> }
        </>
    )
}

export default Channel