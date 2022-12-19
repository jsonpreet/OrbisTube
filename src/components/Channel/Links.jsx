import clsx from 'clsx';
import Link from 'next/link'
import { FaDiscord, FaGlobe, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function ChannelLinks({channel}) {
    const channelExtra = channel?.details?.profile?.data ? channel?.details?.profile?.data : null;
    const DiscordURL = channelExtra?.DiscordURL !== null ? channelExtra?.DiscordURL : null;
    const InstagramURL = channelExtra?.InstagramURL !== null ? channelExtra?.InstagramURL : null;
    const TwitterURL = channelExtra?.TwitterURL !== null ? channelExtra?.TwitterURL : null;
    const YoutubeURL = channelExtra?.YoutubeURL !== null ? channelExtra?.YoutubeURL : null;
    const WebsiteURL = channelExtra?.WebsiteURL !== null ? channelExtra?.WebsiteURL : null;
    const WebsiteTitle = channelExtra?.WebsiteTitle !== null ? channelExtra?.WebsiteTitle : 'Website';
    const anyLinks = TwitterURL || InstagramURL || WebsiteURL || DiscordURL || YoutubeURL;
    return (
        <>
            <div className="absolute bottom-4 right-4 md:block hidden">
                <div className={clsx( "flex space-x-2 p-2 rounded-lg", {
                    "bg-white bg-opacity-70": anyLinks,
                    })}>
                    {TwitterURL &&
                        <div>
                            <Link
                                href={TwitterURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#1da1f2]'
                                title='Twitter'
                            >
                                <FaTwitter size={21} />
                            </Link> 
                        </div>
                    }
                    {InstagramURL &&
                        <div>
                            <Link
                                href={InstagramURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#e1306c]'
                                title='Instagram'
                            >
                                <FaInstagram size={21} />
                            </Link>    
                        </div>
                    }
                    {WebsiteURL &&
                        <div>
                            <Link
                                href={WebsiteURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#405de6]'
                                title={WebsiteTitle}
                            >
                                <FaGlobe size={21} />
                            </Link>  
                        </div>
                    }
                    {DiscordURL &&
                        <div>
                            <Link
                                href={DiscordURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#5865f2]'
                                title='Discord'
                            >
                                <FaDiscord size={21} />
                            </Link>
                        </div>
                    }
                    {YoutubeURL &&
                        <div>
                            <Link
                                href={YoutubeURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#ff0000]'
                                title='Youtube'
                            >
                                <FaYoutube size={21} />
                            </Link> 
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ChannelLinks