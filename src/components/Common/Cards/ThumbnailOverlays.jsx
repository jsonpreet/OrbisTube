import { getTimeFromSeconds } from "@app/utils/functions"

const ThumbnailOverlays = ({ video }) => {
  return (
    <>
        <div>
          {video && video.content.data?.Duration ? (<span className="py-0.5 absolute bottom-3 right-2 text-xs px-1 text-white bg-black rounded">
            {getTimeFromSeconds(video.content.data?.Duration)}
          </span>
          ) : null}
        </div>
    </>
  )
}

export default ThumbnailOverlays

