import { CardShimmer } from '@components/Shimmers/VideoCardShimmer'
import dynamic from 'next/dynamic'
import ChannelInfo from './Info'

const VideoPlayer = dynamic(() => import('../Player/VideoPlayer'), {
  loading: () => <CardShimmer />,
  ssr: false
})

const Video = ({ views, video }) => {
  const userProfile = video.creator_details;

  return (
    <>
      <VideoPlayer
        source={video.content.data.VideoUrl}
        hls={video.content.data.VideoUrl}
        video={video}
        poster={video.content.data.Thumbnail}
      />
      <div className="md:px-0 px-3 flex flex-col">
        <div>
            <h1 className="text-lg md:text-2xl font-medium line-clamp-2">
              {video.content.title}
            </h1>
          {/* <VideoMeta video={video} /> */}
        </div>
        <div className='flex md:flex-row flex-col overflow-hidden justify-between md:items-center mt-3 flex-shrink-0'>
          <ChannelInfo channel={userProfile} video={video}/>
          {/* <VideoActions video={video} /> */}
        </div>
      </div>
    </>
  )
}

export default Video