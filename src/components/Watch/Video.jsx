import { CardShimmer } from '@components/Shimmers/VideoCardShimmer'
import dynamic from 'next/dynamic'
import Actions from './Actions'
import Info from './Info'
import { useContext } from 'react'
import { GlobalContext } from '@context/app'

// const Info = dynamic(() => import('./Info'), {
//   loading: () => <InfoShimmer />
// })

const VideoPlayer = dynamic(() => import('../Player/VideoPlayer'), {
  loading: () => <CardShimmer />,
  ssr: false
})

const Video = ({ views, video }) => {
  const userProfile = video.creator_details;
  const { isLoggedIn, user, isConnected } = useContext(GlobalContext)
  return (
    <>
      <VideoPlayer
        source={video.content.data.VideoUrl}
        video={video}
        poster={video.content.data.Thumbnail}
      />
      <div className="md:px-0 px-3 flex flex-col">
        <div>
            <h1 className="text-lg md:text-2xl font-medium line-clamp-2">
              {video.content.title}
            </h1>
        </div>
        <div className='flex md:flex-row flex-col justify-between md:items-center mt-3 flex-shrink-0'>
          <Info user={user} isConnected={isConnected} isLoggedIn={isLoggedIn} channel={userProfile} video={video}/>
          <Actions video={video} />
        </div>
      </div>
    </>
  )
}

export default Video