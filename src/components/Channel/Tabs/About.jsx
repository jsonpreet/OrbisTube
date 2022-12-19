import Link from 'next/link'
import { FaDiscord, FaGlobe, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FiFlag } from 'react-icons/fi'
import Linkify from 'linkify-react'
import "linkify-plugin-mention"
import { LinkifyOptions } from '@utils/functions/getLinkifyOptions'

function About({ channel }) {
    const channelExtra = channel?.details?.profile?.data ? channel?.details?.profile?.data : null;
    const DiscordURL = channelExtra !== null ? channelExtra.DiscordURL : null;
    const InstagramURL = channelExtra !== null ? channelExtra.InstagramURL : null;
    const TwitterURL = channelExtra !== null ? channelExtra.TwitterURL : null;
    const YoutubeURL = channelExtra !== null ? channelExtra.YoutubeURL : null;
    const WebsiteURL = channelExtra !== null ? channelExtra.WebsiteURL : null;
    const WebsiteTitle = channelExtra !== null ? channelExtra.WebsiteTitle : 'Website';
    if (channel && channelExtra) {
        return (
            <>
                <div className='max-w-7xl mx-auto md:px-0 px-4'>
                    <div className='flex flex-col bg-secondary rounded-lg border theme-border p-4 space-y-6'>
                        <div className="flex flex-col">
                            <h3 className='mb-5'>Description</h3>
                            <div className='overflow-hidden leading-6 text-sm break-words'>
                                <Linkify options={LinkifyOptions}>
                                    {channelExtra?.Description}
                                </Linkify>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col space-y-2">
                                {channelExtra !== null && channelExtra.Location !== '' &&
                                    <div>
                                        <span className='text-sm text-primary'>Location: {channelExtra.Location}</span>
                                    </div>
                                }
                                {channelExtra !== null && channelExtra.Languages !== '' &&
                                    <div>
                                        <span className='text-sm text-primary'>Language: {channelExtra.Languages}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <h3 className='mb-3 font-bold'>Links:</h3>
                            <div className="flex space-x-3">
                                {TwitterURL &&
                                    <div>
                                        <Link
                                            href={TwitterURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaTwitter size={18} />
                                            <span className='ml-2'>Twitter</span>
                                        </Link>
                                    </div>
                                }
                                {InstagramURL &&
                                    <div>
                                        <Link
                                            href={InstagramURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaInstagram size={18} />
                                            <span className='ml-2'>Instagram</span>
                                        </Link>
                                    </div>
                                }
                                {YoutubeURL &&
                                    <div>
                                        <Link
                                            href={YoutubeURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaYoutube size={18} />
                                            <span className='ml-2'>Youtube</span>
                                        </Link>
                                    </div>
                                }
                                {WebsiteURL &&
                                    <div>
                                        <Link
                                            href={WebsiteURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaGlobe size={18} />
                                            <span className='ml-2'>{WebsiteTitle}</span>
                                        </Link>
                                    </div>
                                }
                                {DiscordURL &&
                                    <div>
                                        <Link
                                            href={DiscordURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaDiscord size={18} />
                                            <span className='ml-2'>Discord</span>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export default About