import clsx from 'clsx';
import { Suspense } from 'react';
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

const Community = dynamic(() => import("./Tabs/Community"), {
  suspense: true,
});

const Channel = ({ isError, channel : profile, loading, isDid }) => {
    const channel = isDid ? profile : profile[0]
    const router = useRouter()
    const { address } = useDidToAddress(channel?.did)

    const channelTabs = {
        0: "Videos",
        2: "Community",
        1: "About",
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

    const Loader = () => {
        return (
            <div className="flex items-center mt-20 justify-center">
                <Loader2 />
            </div>
        )
    }

    const TabItem = ({ index, title }) => {
        return (
            <Tab
                className={({ selected }) =>
                    clsx(
                        'px-4 cursor-pointer mr-4 md:px-8 py-2 flex rounded-full items-center tracking-wider text-sm space-x-2 uppercase font-medium focus:outline-none hover:text-white',
                        selected
                        ? 'bg-brand-500 hover:bg-brand-600 text-white font-semibold opacity-100'
                            : 'bg-primary hover:bg-brand-600',
                    )
                }
            >
                <span>{title}</span>
            </Tab>
        )
    }

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
                        <Tab.Group as="div" className="w-full" defaultIndex={0}>
                            <Tab.List className="flex items-center justify-center no-scrollbar">
                                {channelTabs && Object.keys(channelTabs).map((key) => {
                                    return (
                                        <TabItem
                                            key={key}
                                            index={key}
                                            title={channelTabs[key]}
                                        />
                                    )
                                })}
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel className="py-6 focus:outline-none">
                                    <Suspense fallback={<Loader/>}>
                                        <ChannelVideos channel={channel} />
                                    </Suspense>
                                </Tab.Panel>
                                <Tab.Panel className="py-6 focus:outline-none">
                                    <Suspense fallback={<Loader/>}>
                                        <About channel={channel} />
                                    </Suspense>
                                </Tab.Panel>
                                <Tab.Panel className="py-6 focus:outline-none">
                                    <Suspense fallback={<Loader/>}>
                                        <Community channel={channel} />
                                    </Suspense>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
        : <ChannelShimmer /> }
        </>
    )
}

export default Channel