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

const VideoPlayer: React.FC<VideoPlayerProps> = ({src, chapter, nextChapterId, previousChapterId, isCompleted}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null)
  const [qualities, setQualities] = useState<{ label: string; index: number; width: number; height: number }[]>([])
  const [selectedQuality, setSelectedQuality] = useState<number | 'auto'>('auto')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const {logActivity} = useActivityLogger()

  // Initialize HLS and load qualities from master.m3u8
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    let hls: Hls | null

    if (Hls.isSupported()) {
      // disable auto play
      videoElement.autoplay = false
      hls = new Hls({
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

        // Set available qualities
        setQualities(availableQualities || [])

        // Find the HD quality level (720p or 1080p)
        const hdLevel = availableQualities?.find(
          (level) => level.height === 720 || level.height === 1080
        )

        // Set HD as the default quality
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

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
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
      })
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS for Safari
      videoElement.src = src
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play().catch((err) => console.error('Native HLS play error:', err))
        toast.info('Using native HLS playback')
      })
    }

    return () => {
      if (hls) hls.destroy()
    }
  }, [src])

  // Handle quality selection
  const handleQualityChange = (qualityIndex: number | 'auto') => {
    setSelectedQuality(qualityIndex)

    if (hlsInstance) {
      hlsInstance.currentLevel = qualityIndex === 'auto' ? -1 : qualityIndex
    }
  }

  const renderLabel = (label: string, width: number, height: number) => {
    if (label === 'Auto') return 'Auto'
    const heightLabel = `${height}p`
    return `${heightLabel} (${width}x${height})`
  }

  // Enter full-screen mode for the container
  const enterFullScreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        ;(containerRef.current as any).webkitRequestFullscreen() // For Safari
      } else if ((containerRef.current as any).msRequestFullscreen) {
        ;(containerRef.current as any).msRequestFullscreen() // For IE/Edge
      }
    }
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

  // Update current time and duration
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const updateTime = () => setCurrentTime(videoElement.currentTime)
    const updateDuration = () => setDuration(videoElement.duration)

    videoElement.addEventListener('timeupdate', updateTime)
    videoElement.addEventListener('loadedmetadata', updateDuration)

    return () => {
      videoElement.removeEventListener('timeupdate', updateTime)
      videoElement.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const newTime = parseFloat(e.target.value)
    videoElement.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Format time to display as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div
      onDoubleClick={enterFullScreen}
      ref={containerRef}
      className="relative z-99999999 w-full max-w-full bg-red-600 h-full"
    >
      {/* Container for video and buttons */}
      <div className="h-full">
        <video
          onMouseDown={(e) =>
            logActivity({
              activityType: 'video_mouse_down',
              metadata: JSON.stringify({x: e.clientX, y: e.clientY})
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
          className="w-full h-full rounded-md aspect-video object-cover bg-black p-0.5"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 flex items-center">
          <Button
            size={'sm'}
            onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()}
            className="mr-2"
          >
            {videoRef.current?.paused ?
              <PlayIcon className="h-5 w-5"/>
              : <PauseIcon className="h-5 w-5"/>
            }
          </Button>
          <span className="text-white mr-2">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="flex-1 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-1 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
          />
          <span className="text-white ml-2">{formatTime(duration)}</span>
          <VideoQualitySwitcher
            qualities={qualities}
            selectedQuality={selectedQuality}
            handleQualityChange={handleQualityChange}
            renderLabel={renderLabel}
          />
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
