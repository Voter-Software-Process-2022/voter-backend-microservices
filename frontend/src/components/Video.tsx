import React from 'react'
import type { VideoProps } from '../interfaces/components/video'

const video =
  'https://voteryak3bdpro-bucket.s3.ap-southeast-1.amazonaws.com/videos/bangkok-video1.mp4'

const Video: React.FC<VideoProps> = ({ children }) => {
  return (
    <div className='bg-video'>
      <video src={video} autoPlay loop muted></video>
      {children}
    </div>
  )
}

export default Video
