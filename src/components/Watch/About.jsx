import { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import ReactTimeAgo from 'react-time-ago'
import useCleanPostBody from '@utils/functions/getCleanPostBody'
import Tags from './Tags'

const About = ({views, video }) => {
    const body = useCleanPostBody(video);
    const [characterLimit, setCharacterLimit] = useState(200)

    return (
        <div className="flex items-start justify-between w-full light-button-secondary p-4 rounded-none md:rounded-xl">
            <div className="flex flex-col flex-1 overflow-hidden break-words">
                <div className='text-[14px] flex space-x-1 items-center font-medium mb-3'>
                    <span><ReactTimeAgo date={video.timestamp * 1000} locale="en-US" /></span>
                    <Tags video={video}/>
                </div>
                {video.content.body !== null && (
                    <div className="text-sm md:text-sm">
                        {body}
                    </div>
                )}
                {video.content?.body && characterLimit && video.content.body.length > characterLimit &&
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
            </div>
        </div>
    )
}

export default About