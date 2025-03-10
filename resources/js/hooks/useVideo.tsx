import React, { useState } from 'react'
import { toast } from 'sonner'

const useVideo = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      setIsMuted(newMutedState)
      videoRef.current.muted = newMutedState
      if (newMutedState) {
        setVolume(0)
      } else {
        setVolume(videoRef.current.volume) // Restore previous volume when unmuted
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value)
      setVolume(newVolume)
      if (videoRef.current) {
        videoRef.current.volume = newVolume
        setIsMuted(newVolume === 0)
      }
  }

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  const togglePictureInPicture = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await video.requestPictureInPicture()
      }
    } catch (error) {
      console.error('PiP error:', error)
      toast.error('Picture in Picture is not supported')
    }
  }

  return  {
    toggleMute,
    handleVolumeChange,
    togglePlayPause,
    togglePictureInPicture,
    isMuted,
    volume
  }
}

export default useVideo
