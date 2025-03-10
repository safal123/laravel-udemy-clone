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
  const [thumbnailPos, setThumbnailPos] = useState<{
    left: string | number
    right: string | number
    transform: string
  }>({
    left: 0,
    right: 'auto',
    transform: 'none'
  })
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)

  // Add this constant at the top of the component
  const THUMBNAIL_WIDTH = 160
  const THUMBNAIL_HEIGHT = 90
  const THUMBNAIL_MARGIN = 16 // Space between thumbnail and progress bar

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

  const generateThumbnail = (time: number) => {
    const video = videoRef.current
    const canvas = thumbnailCanvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set thumbnail dimensions
    canvas.width = 160  // Width of thumbnail
    canvas.height = 90  // Height of thumbnail (16:9 ratio)

    // Save current video time
    const currentVideoTime = video.currentTime

    // Update video time to capture frame
    video.currentTime = time

    // Draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Reset video time
    video.currentTime = currentVideoTime

    return canvas.toDataURL('image/jpeg')
  }

  const handleSliderHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width)
    const time = percentage * duration

    setHoverTime(time)
    setHoverPosition(percentage * 100)

    // Calculate thumbnail position
    const halfWidth = THUMBNAIL_WIDTH / 2
    let position

    if (x <= halfWidth) {
      // Near left edge
      position = {
        left: 0,
        right: 'auto',
        transform: 'none'
      }
    } else if (x >= rect.width - halfWidth) {
      // Near right edge
      position = {
        left: 'auto',
        right: 0,
        transform: 'none'
      }
    } else {
      // In the middle
      position = {
        left: `${x}px`,
        right: 'auto',
        transform: 'translateX(-50%)'
      }
    }

    setThumbnailPos(position)

    // Generate thumbnail
    const thumbnail = generateThumbnail(time)
    if (thumbnail) {
      setThumbnailUrl(thumbnail)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setHoverPosition(null)
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width)
    const newTime = percentage * duration

    videoRef.current.currentTime = newTime
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
      className="group relative w-full max-w-full h-full bg-black"
    >
      {/* Hidden canvas for thumbnail generation */}
      <canvas
        ref={thumbnailCanvasRef}
        className="hidden"
      />

      <div className="h-full relative group">
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

        {/* Add a large centered play/pause button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="lg"
            onClick={togglePlayPause}
            className="text-white bg-black/20 hover:bg-black/40 rounded-full w-16 h-16 flex items-center justify-center"
          >
            {videoRef.current?.paused ?
              <PlayIcon className="h-8 w-8" />
              : <PauseIcon className="h-8 w-8" />
            }
          </Button>
        </div>

        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pt-20">
          {/* Progress bar container */}
          <div
            ref={progressBarRef}
            className="relative w-full h-1 group/progress cursor-pointer mb-2 hover:h-1.5 transition-all"
            onMouseMove={handleSliderHover}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            onClick={handleProgressBarClick}
          >
            {/* Thumbnail preview */}
            {isHovering && (
              <div
                className="absolute bottom-full mb-3 bg-black/90 rounded-md overflow-hidden shadow-xl border border-white/10"
                style={{
                  left: thumbnailPos.left,
                  right: thumbnailPos.right,
                  transform: thumbnailPos.transform,
                  width: THUMBNAIL_WIDTH,
                  height: THUMBNAIL_HEIGHT + 24, // Add space for the time display
                  marginBottom: THUMBNAIL_MARGIN
                }}
              >
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt="Preview"
                    className="w-full h-[90px] object-cover"
                  />
                )}
                <div className="py-1.5 px-2 text-xs text-white text-center bg-black/90 font-medium">
                  {formatTime(hoverTime)}
                </div>
              </div>
            )}

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-full bg-white/20 rounded-full overflow-hidden">
              {/* Buffered progress */}
              <div
                className="absolute h-full bg-white/30 transition-all duration-300"
                style={{ width: `${(bufferedTime / duration) * 100}%` }}
              />
              {/* Played progress */}
              <div
                className="absolute h-full bg-red-600 transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              {/* Hover progress indicator */}
              {hoverPosition !== null && (
                <div
                  className="absolute h-full bg-white/50 transition-all duration-300"
                  style={{
                    left: 0,
                    width: `${hoverPosition}%`,
                    background: 'linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.5) 100%)'
                  }}
                />
              )}
              {/* Thumb */}
              <div className="absolute h-full pointer-events-none" style={{ width: `${(currentTime / duration) * 100}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full scale-0 group-hover/progress:scale-100 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex items-center gap-4 px-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="text-white hover:bg-white/10 rounded-full w-10 h-10 flex items-center justify-center -ml-2"
            >
              {videoRef.current?.paused ?
                <PlayIcon className="h-6 w-6" />
                : <PauseIcon className="h-6 w-6" />
              }
            </Button>

            <div className="flex items-center gap-2 text-white text-sm font-medium">
              <span>{formatTime(currentTime)}</span>
              <span className="opacity-60">/</span>
              <span className="opacity-60">{formatTime(duration)}</span>
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
