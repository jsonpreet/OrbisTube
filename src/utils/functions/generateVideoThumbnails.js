const canvasImageFromVideo = (
  file,
  currentTime
) => {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    video.autoplay = true
    video.muted = true
    video.src = URL.createObjectURL(file)
    video.onloadedmetadata = () => {
      video.currentTime = currentTime
    }
    video.oncanplay = () => {
      setTimeout(() => {
        const ctx = canvas.getContext('2d')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        return resolve(canvas.toDataURL('image/png'))
      }, 100)
    }
  })
}

export const generateVideoThumbnails = (
  file,
  count
) => {
  return new Promise((resolve) => {
    try {
      // creating video element to get duration
      const video = document.createElement('video')
      video.autoplay = true
      video.muted = true
      video.src = URL.createObjectURL(file)
      video.onloadeddata = async () => {
        const thumbnailArray = []
        const averageSplitTime = Math.floor(video.duration / count)
        for (let i = 0; i < count; i++) {
          const currentTime = averageSplitTime * i
          const thumbnail = await canvasImageFromVideo(file, currentTime)
          thumbnailArray.push(thumbnail)
        }
        resolve(thumbnailArray)
      }
    } catch (error) {
      console.error('[Error Generate Video Thumbnails]', error)
      resolve([])
    }
  })
}