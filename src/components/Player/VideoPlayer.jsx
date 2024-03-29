
import clsx from 'clsx'
import { Player } from '@livepeer/react'
import { getPlaybackIdFromUrl } from '@utils/functions/getVideoUrl'

const PlayerInstance = ({ video, ratio, source, poster }) => {
  const playbackId = getPlaybackIdFromUrl(source)
  return (
    <div className='md:relative z-[5]'>
      <Player
        poster={poster}
        playbackId={playbackId}
        aspectRatio={ratio}
        objectFit="contain"
        showPipButton={true}
        autoPlay={false}
        loop={true}
        showTitle={false}
        showUploadingIndicator={false}
      />
    </div>
  )
}

const VideoPlayer = ({ video, poster, ratio = '16to9', wrapperClassName, source }) => {

  return (
    <div className={clsx('overflow-hidden', wrapperClassName)}>
      <PlayerInstance
        video={video}
        ratio={ratio}
        poster={poster}
        source={source}
      />
    </div>
  )
}

export default VideoPlayer