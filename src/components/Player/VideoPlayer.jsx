
import clsx from 'clsx'
import { useRef } from 'react'
import { Player } from '@livepeer/react'

const PlayerInstance = ({ video, ratio, source, poster }) => {
  const playerRef = useRef(null)

  return (
    <div className='md:relative z-[5]'>
      <Player
        poster={poster}
        src={source}
        aspectRatio={ratio}
        objectFit="contain"
        showPipButton={true}
        autoPlay={false}
        muted={false}
        loop={false}
        showTitle={false}
        showUploadingIndicator={false}
      />
    </div>
  )
}

const VideoPlayer = ({
  video,
  poster,
  ratio = '16to9',
  wrapperClassName,
  source
}) => {

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