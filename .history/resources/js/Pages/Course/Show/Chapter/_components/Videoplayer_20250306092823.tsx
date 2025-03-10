import { Button } from '@/Components/ui/button'
import useActivityLogger from '@/hooks/useActivityLog'
import { cn } from '@/lib/utils'
import VideoQualitySwitcher from '@/Pages/Course/Show/Chapter/_components/VideoQualitySwitcher'
import { Chapter } from '@/types'
import { router } from '@inertiajs/react'
import Hls from 'hls.js'
import { CheckCircle2Icon, ChevronLeft, ChevronRight, PlayIcon, PauseIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

interface VideoPlayerProps {
  src: string; // URL of the master playlist (e.g., master.m3u8)
  chapter: Chapter & { course: { slug: string } }
  nextChapterId: string
  previousChapterId: string
  isCompleted: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, chapter, nextChapterId, previousChapterId, isCompleted }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null)
  const [qualities, setQualities] = useState<{ label: string; index: number; width: number; height: number }[]>([])
  const [selectedQuality, setSelectedQuality] = useState<number | 'auto'>('auto')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [bufferedTime, setBufferedTime] = useState(0)
  const { logActivity } = useActivityLogger()

  // Helper functions
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleHlsError = (hls: Hls, data: any) => {
    if (!data.fatal) return

    console.error(`HLS Fatal Error: ${data.type}`, data)
    switch (data.type) {
      case Hls.ErrorTypes.NETWORK_ERROR:
        hls?.startLoad()
        toast.error('Network error occurred. Retrying...')
        break
      case Hls.ErrorTypes.MEDIA_ERROR:
        hls?.recoverMediaError()
        toast.error('Media error occurred. Recovering...')
        break
      default:
        hls?.destroy()
        toast.error('An error occurred. Please try again later.')
        break
    }
  }

  const setupHlsInstance = (videoElement: HTMLVideoElement) => {
    const hls = new Hls({
      autoStartLoad: true,
      maxBufferLength: 30,
      maxMaxBufferLength: 60,
      maxBufferSize: 60 * 1000 * 1000
    })

    hls.loadSource(src)
    hls.attachMedia(videoElement)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      const availableQualities = hls?.levels.map((level, index) => ({
        index,
        label: level.height > 0 ? `${level.height}p` : `${Math.round(level.bitrate / 1000)}kbps`,
        width: level.width,
        height: level.height
      }))

      setQualities(availableQualities || [])

      // Set HD as default quality
      const hdLevel = availableQualities?.find(
        (level) => level.height === 720 || level.height === 1080
      )
      if (hdLevel) {
        hls!.currentLevel = hdLevel.index
        setSelectedQuality(hdLevel.index)
      }

      setHlsInstance(hls)
      videoElement.play().catch((err) => console.error('Auto-play error:', err))
    })

    hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
      const level = hls?.levels[data.level]
      console.log(`Switched to quality: ${level?.height}p`)
    })

    hls.on(Hls.Events.ERROR, (_, data) => handleHlsError(hls, data))

    return hls
  }

  // Video initialization
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    let hls: Hls | null = null
    videoElement.autoplay = false

    if (Hls.isSupported()) {
      hls = setupHlsInstance(videoElement)
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS for Safari
      videoElement.src = src
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play().catch((err) => console.error('Native HLS play error:', err))
        toast.info('Using native HLS playback')
      })
    }

    return () => hls?.destroy()
  }, [src])

  // Time tracking
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const updateTime = () => setCurrentTime(videoElement.currentTime)
    const updateDuration = () => setDuration(videoElement.duration)
    const updateBuffer = () => {
      const buffered = videoElement.buffered
      if (buffered.length > 0) {
        setBufferedTime(buffered.end(buffered.length - 1))
      }
    }

    videoElement.addEventListener('timeupdate', updateTime)
    videoElement.addEventListener('loadedmetadata', updateDuration)
    videoElement.addEventListener('progress', updateBuffer)

    return () => {
      videoElement.removeEventListener('timeupdate', updateTime)
      videoElement.removeEventListener('loadedmetadata', updateDuration)
      videoElement.removeEventListener('progress', updateBuffer)
    }
  }, [])

  // Event handlers
  const handleQualityChange = (qualityIndex: number | 'auto') => {
    setSelectedQuality(qualityIndex)
    if (hlsInstance) {
      hlsInstance.currentLevel = qualityIndex === 'auto' ? -1 : qualityIndex
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const newTime = parseFloat(e.target.value)
    videoElement.currentTime = newTime
    setCurrentTime(newTime)
  }

  const enterFullScreen = () => {
    const container = containerRef.current
    if (!container) return

    if (container.requestFullscreen) {
      container.requestFullscreen()
    } else if ((container as any).webkitRequestFullscreen) {
      (container as any).webkitRequestFullscreen()
    } else if ((container as any).msRequestFullscreen) {
      (container as any).msRequestFullscreen()
    }
  }

  const renderLabel = (label: string, width: number, height: number) => {
    if (label === 'Auto') return 'Auto'
    return `${height}p (${width}x${height})`
  }

  const navigateToChapter = (chapterId: string) => {
    // if the video is in full-screen mode, do
    router.visit(`/courses/${chapter?.course.slug}/chapters/${chapterId}`)
  }

  const markAsCompleted = (chapterId: string, courseId: string) => {
    if (isCompleted) return
    router.post(route('progress.store'), {
      chapter_id: chapterId,
      course_id: courseId
    },
      {
        onSuccess: () => {
          return toast.success('Chapter marked as completed')
        },
        onError: (error) => {
          console.error('Mark as completed error:', error)
          return toast.error('Failed to mark chapter as completed')
        }
      }
    )
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

  return (
    <div
      onDoubleClick={enterFullScreen}
      ref={containerRef}
      className="relative w-full max-w-full h-full"
    >
      <div className="h-full">
        <video
          onMouseDown={(e) =>
            logActivity({
              activityType: 'video_mouse_down',
              metadata: JSON.stringify({ x: e.clientX, y: e.clientY })
            })
          }
          onCanPlay={() => console.log('Video can play')}
          onPlay={() =>
            logActivity({
              activityType: 'video_play',
              metadata: JSON.stringify({
                currentTime: videoRef.current?.currentTime,
                videoDuration: videoRef.current?.duration,
                videoSrc: videoRef.current?.src,
                chapterId: 1
              })
            })
          }
          onPause={() =>
            logActivity({
              activityType: 'video_pause',
              metadata: JSON.stringify({
                currentTime: videoRef.current?.currentTime,
                videoDuration: videoRef.current?.duration,
                videoSrc: videoRef.current?.src,
                chapterId: 1
              })
            })
          }
          onEnded={() => markAsCompleted(chapter.id, chapter.course_id)}
          onSeeking={() => console.log('Video seeking')}
          onSeeked={() => console.log('Video seeked')}
          onLoadedMetadata={() =>
            logActivity({
              activityType: 'video_loaded_metadata',
              metadata: JSON.stringify({
                currentTime: videoRef.current?.currentTime,
                videoDuration: videoRef.current?.duration,
                videoSrc: videoRef.current?.src,
                chapterId: 1
              })
            })
          }
          onError={(e) => console.error('Video error:', e)}
          ref={videoRef}
          onClick={togglePlayPause}
          className="w-full h-full rounded-md aspect-video object-cover bg-black p-0.5 cursor-pointer"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 flex items-center z-[99998]">
          <Button
            size={'sm'}
            onClick={togglePlayPause}
            className="mr-2"
          >
            {videoRef.current?.paused ?
              <PlayIcon className="h-5 w-5" />
              : <PauseIcon className="h-5 w-5" />
            }
          </Button>
          <span className="text-white mr-2">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="flex-1 cursor-pointer appearance-none bg-transparent
              [&::-webkit-slider-runnable-track]:rounded-full
              [&::-webkit-slider-runnable-track]:bg-gradient-to-r
              [&::-webkit-slider-runnable-track]:from-red-500
              [&::-webkit-slider-runnable-track]:from-[0%]
              [&::-webkit-slider-runnable-track]:via-red-500
              [&::-webkit-slider-runnable-track]:via-[var(--played)]
              [&::-webkit-slider-runnable-track]:via-blue-400
              [&::-webkit-slider-runnable-track]:via-[var(--played)]
              [&::-webkit-slider-runnable-track]:to-gray-300
              [&::-webkit-slider-runnable-track]:h-1
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:mt-[-4px]
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-150
              hover:[&::-webkit-slider-thumb]:scale-125
              active:[&::-webkit-slider-thumb]:scale-110
              [&::-moz-range-track]:rounded-full
              [&::-moz-range-track]:bg-gradient-to-r
              [&::-moz-range-track]:from-red-500
              [&::-moz-range-track]:from-[0%]
              [&::-moz-range-track]:via-red-500
              [&::-moz-range-track]:via-[var(--played)]
              [&::-moz-range-track]:via-blue-400
              [&::-moz-range-track]:via-[var(--played)]
              [&::-moz-range-track]:to-gray-300
              [&::-moz-range-track]:h-1
              [&::-moz-range-thumb]:appearance-none
              [&::-moz-range-thumb]:h-3
              [&::-moz-range-thumb]:w-3
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:shadow-lg
              [&::-moz-range-thumb]:transition-all
              [&::-moz-range-thumb]:duration-150
              hover:[&::-moz-range-thumb]:scale-125
              active:[&::-moz-range-thumb]:scale-110"
            style={{
              '--played': `${(currentTime / duration) * 100}%`,
              '--buffered': `${(bufferedTime / duration) * 100}%`,
              background: `linear-gradient(to right,
                var(--red-500) 0%,
                var(--red-500) ${(currentTime / duration) * 100}%,
                var(--blue-400) ${(currentTime / duration) * 100}%,
                var(--blue-400) ${(bufferedTime / duration) * 100}%,
                var(--gray-300) ${(bufferedTime / duration) * 100}%,
                var(--gray-300) 100%)`
            } as React.CSSProperties}
          />
          <span className="text-white ml-2">{formatTime(duration)}</span>
          <div className="relative" style={{ zIndex: 99999 }}>
            <VideoQualitySwitcher
              qualities={qualities}
              selectedQuality={selectedQuality}
              handleQualityChange={handleQualityChange}
              renderLabel={renderLabel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
