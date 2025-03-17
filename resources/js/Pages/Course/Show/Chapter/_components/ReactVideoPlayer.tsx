import ReactPlayer from 'react-player'
import Hls from 'hls.js'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/Components/ui/button'
import { PlayIcon, PauseIcon, Maximize2Icon, Minimize2Icon, PictureInPicture2Icon } from 'lucide-react'
import { toast } from 'sonner'
import VideoQualitySwitcher from './VideoQualitySwitcher'
import { Chapter } from '@/types'
import { router } from '@inertiajs/react'
import useActivityLogger from '@/hooks/useActivityLog'

interface ReactVideoPlayerProps {
  src: string
  chapter: Chapter & { course: { slug: string } }
  nextChapterId: string
  previousChapterId: string
  isCompleted: boolean
}

const ReactVideoPlayer = ({ src, chapter, isCompleted }: ReactVideoPlayerProps) => {
  // States
  const [qualities, setQualities] = useState<{ label: string; index: number; width: number; height: number }[]>([])
  const [selectedQuality, setSelectedQuality] = useState<number | 'auto'>('auto')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverTime, setHoverTime] = useState(0)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  // Refs
  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null)
  const { logActivity } = useActivityLogger()

  // Helper functions
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const generateThumbnail = (time: number) => {
    const video = playerRef.current?.getInternalPlayer() as HTMLVideoElement
    const canvas = thumbnailCanvasRef.current
    if (!video || !canvas) return null

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

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

  // HLS setup
  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        maxBufferSize: 60 * 1000 * 1000
      })

      hls.loadSource(src)
      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        const availableQualities = data.levels.map((level, index) => ({
          index,
          label: level.height > 0 ? `${level.height}p` : `${Math.round(level.bitrate / 1000)}kbps`,
          width: level.width,
          height: level.height
        }))
        setQualities(availableQualities)

        // Set HD as default quality
        const hdLevel = availableQualities.find(
          (level) => level.height === 720 || level.height === 1080
        )
        if (hdLevel) {
          hls.currentLevel = hdLevel.index
          setSelectedQuality(hdLevel.index)
        }
      })

      hlsRef.current = hls
    }
  }, [src])

  // Event handlers
  const handleQualityChange = (qualityIndex: number | 'auto') => {
    if (!hlsRef.current) return

    setSelectedQuality(qualityIndex)
    hlsRef.current.currentLevel = qualityIndex === 'auto' ? -1 : qualityIndex

    logActivity({
      activityType: 'quality_change',
      metadata: JSON.stringify({ quality: qualityIndex })
    })
  }

  const handleProgress = ({ playedSeconds, loadedSeconds }: { playedSeconds: number; loadedSeconds: number }) => {
    setCurrentTime(playedSeconds)
    setBuffered(loadedSeconds)
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const togglePiP = async () => {
    try {
      const video = playerRef.current?.getInternalPlayer() as HTMLVideoElement
      if (!video) return

      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await video.requestPictureInPicture()
      }
    } catch (error) {
      toast.error('Picture in Picture is not supported')
    }
  }

  const handleSliderHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width)

    const time = percentage * duration
    setHoverTime(time)
    setHoverPosition(percentage * 100)

    // Generate thumbnail
    const thumbnail = generateThumbnail(time)
    if (thumbnail) {
      setThumbnailUrl(thumbnail)
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !playerRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width)

    playerRef.current.seekTo(percentage, 'fraction')
  }

  const markAsCompleted = () => {
    if (isCompleted) return

    router.post(route('progress.store'), {
      chapter_id: chapter.id,
      course_id: chapter.course_id
    }, {
      onSuccess: () => toast.success('Chapter marked as completed'),
      onError: () => toast.error('Failed to mark chapter as completed')
    })
  }

  // @ts-ignore
  return (
    <div
      ref={containerRef}
      className="relative group aspect-video bg-black"
      onDoubleClick={toggleFullScreen}
    >
      {/* Hidden canvas for thumbnail generation */}
      <canvas
        ref={thumbnailCanvasRef}
        className="hidden"
      />

      <ReactPlayer
        ref={playerRef}
        url={src}
        width="100%"
        height="100%"
        playing={playing}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={markAsCompleted}
        onPlay={() => {
          setPlaying(true)
          logActivity({
            activityType: 'video_play',
            metadata: JSON.stringify({ currentTime, duration })
          })
        }}
        onPause={() => {
          setPlaying(false)
          logActivity({
            activityType: 'video_pause',
            metadata: JSON.stringify({ currentTime, duration })
          })
        }}
        config={{
          file: {
            forceHLS: true,
            hlsOptions: {
              hlsRef: hlsRef.current,
            },
          }
        }}
      />

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pt-20">
        {/* Progress bar container */}
        <div className="relative" style={{ height: isHovering ? '100px' : '10px' }}>
          {/* Thumbnail preview */}
          {isHovering && thumbnailUrl && (
            <div
              className="absolute bottom-[20px] bg-black/90 rounded-md overflow-hidden shadow-xl border border-white/10"
              style={{
                // @ts-ignore
                left: hoverPosition && (
                  hoverPosition <= 8 ? 0 :
                    hoverPosition >= 92 ? 'auto' : `${hoverPosition}%`
                ),
                right: hoverPosition && hoverPosition >= 92 ? 0 : 'auto',
                // @ts-ignore
                transform: hoverPosition && (
                  hoverPosition <= 8 || hoverPosition >= 92 ?
                    'none' : 'translateX(-50%)'
                ),
                width: 160,
                height: 90,
                marginBottom: 8
              }}
            >
              <img
                src={thumbnailUrl}
                alt="Preview"
                className="w-full h-[90px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 py-1 px-2 text-xs text-white text-center bg-black/90 font-medium">
                {formatTime(hoverTime)}
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="absolute bottom-0 w-full h-1 group/progress cursor-pointer hover:h-1.5 transition-all"
            onMouseMove={handleSliderHover}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false)
              setHoverPosition(null)
              setThumbnailUrl(null)
            }}
            onClick={handleProgressBarClick}
          >
            <div className="absolute bottom-0 left-0 right-0 h-full bg-white/20 rounded-full overflow-hidden">
              {/* Buffered */}
              <div
                className="absolute h-full bg-white/30 transition-all duration-300"
                style={{ width: `${(buffered / duration) * 100}%` }}
              />
              {/* Played */}
              <div
                className="absolute h-full bg-red-600 transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              {/* Hover indicator */}
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
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 px-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPlaying(!playing)}
            className="text-white hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            {playing ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6 ml-0.5" />
            )}
          </Button>

          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <span>{formatTime(currentTime)}</span>
            <span className="opacity-60">/</span>
            <span className="opacity-60">{formatTime(duration)}</span>
          </div>

          <div className="ml-auto md:flex items-center gap-2 hidden">
            {/* <VideoQualitySwitcher
              qualities={qualities}
              selectedQuality={selectedQuality}
              handleQualityChange={handleQualityChange}
              renderLabel={(label, width, height) => `${height}p (${width}x${height})`}
            /> */}

            <Button
              variant="ghost"
              size="sm"
              onClick={togglePiP}
              className="text-white hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <PictureInPicture2Icon className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullScreen}
              className="text-white hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              {isFullscreen ? (
                <Minimize2Icon className="h-5 w-5" />
              ) : (
                <Maximize2Icon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReactVideoPlayer
