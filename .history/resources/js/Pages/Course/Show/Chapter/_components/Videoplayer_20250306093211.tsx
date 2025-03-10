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
  const [isHovering, setIsHovering] = useState(false)
  const [hoverTime, setHoverTime] = useState(0)
  const [thumbnailPos, setThumbnailPos] = useState(0)
  const progressBarRef = useRef<HTMLDivElement>(null)

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

  const handleSliderHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width)
    const time = percentage * duration

    setHoverTime(time)
    setThumbnailPos(Math.max(0, Math.min(x - 40, rect.width - 80))) // 80 is thumbnail width
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
      className="group relative w-full max-w-full h-full bg-black"
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
          className="w-full h-full aspect-video object-cover cursor-pointer"
        />

        {/* Controls overlay - shows on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pt-20">
          {/* Progress bar container */}
          <div
            ref={progressBarRef}
            className="relative w-full h-3 group/progress cursor-pointer mb-2"
            onMouseMove={handleSliderHover}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Thumbnail preview */}
            {isHovering && (
              <div
                className="absolute bottom-full mb-2 bg-black rounded-sm overflow-hidden transform -translate-x-1/2"
                style={{ left: thumbnailPos }}
              >
                <div className="p-1 text-xs text-white text-center">
                  {formatTime(hoverTime)}
                </div>
                {/* Here you would show a video thumbnail if available */}
              </div>
            )}

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 group-hover/progress:h-3 transition-all bg-white/30 rounded-full overflow-hidden">
              {/* Buffered progress */}
              <div
                className="absolute h-full bg-white/50"
                style={{ width: `${(bufferedTime / duration) * 100}%` }}
              />
              {/* Played progress */}
              <div
                className="absolute h-full bg-red-600"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                {/* Thumb */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full scale-0 group-hover/progress:scale-100 transition-transform" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="text-white hover:bg-white/10"
            >
              {videoRef.current?.paused ?
                <PlayIcon className="h-6 w-6" />
                : <PauseIcon className="h-6 w-6" />
              }
            </Button>

            <div className="flex items-center gap-2 text-white">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="ml-auto">
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
    </div>
  )
}

export default VideoPlayer
