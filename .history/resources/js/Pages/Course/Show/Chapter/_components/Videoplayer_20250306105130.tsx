import ReactPlayer from 'react-player'
import Hls from 'hls.js'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/Components/ui/button'
import { SettingsIcon, Maximize2Icon, Minimize2Icon, PictureInPicture2Icon } from 'lucide-react'
import { toast } from 'sonner'
import VideoQualitySwitcher from './VideoQualitySwitcher'
import { Chapter } from '@/types'
import { router } from '@inertiajs/react'
import { CheckCircle2Icon, ChevronLeft, ChevronRight, PlayIcon, PauseIcon } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  chapter: Chapter & { course: { slug: string } }
  nextChapterId: string
  previousChapterId: string
  isCompleted: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, chapter, nextChapterId, previousChapterId, isCompleted }) => {
  const [qualities, setQualities] = useState<{ label: string; index: number; width: number; height: number }[]>([])
  const [selectedQuality, setSelectedQuality] = useState<number | 'auto'>('auto')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState({ played: 0, loaded: 0 })
  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const { logActivity } = useActivityLogger()

  // Initialize HLS
  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
        startLevel: -1, // Auto quality by default
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
      })

      hlsRef.current = hls
    }
  }, [src])

  const handleQualityChange = (qualityIndex: number | 'auto') => {
    if (!hlsRef.current) return

    setSelectedQuality(qualityIndex)
    hlsRef.current.currentLevel = qualityIndex === 'auto' ? -1 : qualityIndex
  }

  const handleProgress = (state: { played: number; loaded: number }) => {
    setProgress(state)
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
      const video = playerRef.current?.getInternalPlayer()
      if (!video) return

      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await (video as HTMLVideoElement).requestPictureInPicture()
      }
    } catch (error) {
      toast.error('Picture in Picture is not supported')
    }
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

  return (
    <div
      ref={containerRef}
      className="relative group aspect-video bg-black"
    >
      <ReactPlayer
        ref={playerRef}
        url={src}
        width="100%"
        height="100%"
        playing={playing}
        onProgress={handleProgress}
        onEnded={() => {
          setPlaying(false)
          markAsCompleted(chapter.id, chapter.course_id)
        }}
        config={{
          file: {
            forceHLS: true,
            hlsOptions: {
              // Pass the HLS instance
              hlsRef: hlsRef.current,
            },
          }
        }}
      />

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pt-20">
        {/* Progress bar */}
        <div className="relative w-full h-1 group/progress cursor-pointer mb-2 hover:h-1.5 transition-all">
          <div className="absolute bottom-0 left-0 right-0 h-full bg-white/20 rounded-full overflow-hidden">
            {/* Buffered */}
            <div
              className="absolute h-full bg-white/30 transition-all duration-300"
              style={{ width: `${progress.loaded * 100}%` }}
            />
            {/* Played */}
            <div
              className="absolute h-full bg-red-600 transition-all duration-300"
              style={{ width: `${progress.played * 100}%` }}
            />
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

          <div className="ml-auto flex items-center gap-2">
            <VideoQualitySwitcher
              qualities={qualities}
              selectedQuality={selectedQuality}
              handleQualityChange={handleQualityChange}
              renderLabel={(label, width, height) => `${height}p (${width}x${height})`}
            />

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

export default VideoPlayer
