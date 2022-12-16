import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import ThumbnailOverlays from './ThumbnailOverlays'
import VideoOptions from './Options'
import ShareModal from '../ShareModal'
import useAppStore from '@store/app'
import { useDidToAddress } from '@utils/functions/getDidToAddress'
import { getUsername, useGetUsername } from '@utils/functions/getProfileName'
/** Clean time ago for post */
import ReactTimeAgo from 'react-time-ago'



const VideoCard = ({ video }) => {
  const [showShare, setShowShare] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const uploadedVideo = useAppStore((state) => state.uploadedVideo)
  const [views, setViews] = useState(0)
  const { address } = useDidToAddress(video.creator_details?.did);
  const username = useGetUsername(video.creator_details?.profile, address, video.creator_details?.did);

  return (
    <>
    
      <div className="relative">
          <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
          <Link href={`/watch/${video.stream_id}`}>
            <div className="relative rounded-none md:rounded-xl aspect-w-16 overflow-hidden aspect-h-9">
              <img
                src={video.content.data.Thumbnail}
                draggable={false}
                className={clsx(
                  'object-center bg-primary w-full h-full md:rounded-xl lg:w-full lg:h-full',
                  'object-cover'
                )}
                alt="thumbnail"
              />
              <ThumbnailOverlays video={video} />
            </div>
          </Link>
          <div className="p-2">
            <div className="flex items-start space-x-2.5">
              <Link href={`/${getUsername(video.creator_details.profile, video.did)}`} className="flex-none mt-0.5">
                <img
                  className="w-9 h-9 rounded-full"
                  src={video.creator_details?.profile.pfp}
                  alt={getUsername(video?.creator_details.profile, video.did)}
                  draggable={false}
                />
              </Link>
              <div className="grid flex-1">
                <div className='flex w-full items-start justify-between '>
                  <div className="flex flex-col w-full items-start pr-2 justify-between min-w-0">
                    <Link
                      href={`/watch/${video.stream_id}`}
                      className="text-[15px] font-medium line-clamp-2 break-words"
                      >
                        {video.content.title}
                    </Link>
                    <Link
                      href={`/${getUsername(video.creator_details.profile, video.did)}`}
                      className="flex hover:text-black dark:hover:text-white w-fit items-center space-x-1.5 text-[14px] text-light"
                    >
                      <span>{getUsername(video.creator_details.profile, video.did)}</span>
                    </Link>
                    <div className="flex overflow-hidden text-[13px] text-light">
                      <span className="whitespace-nowrap">
                        {video.count_likes > 1 ? `${video.count_likes} likes` : `${video.count_likes} like`}
                      </span>
                      <span className="middot" />
                        <span className="whitespace-nowrap">
                          <ReactTimeAgo date={video.timestamp * 1000} locale="en-US" />
                        </span>
                    </div>
                  </div>
                  <VideoOptions
                    video={video}
                    setShowShare={setShowShare}
                    setShowReport={setShowReport}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default VideoCard