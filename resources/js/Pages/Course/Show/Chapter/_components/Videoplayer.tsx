import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import useActivityLogger from '@/hooks/useActivityLog'
import { Chapter } from '@/types'
import { router } from '@inertiajs/react'
import Hls from 'hls.js'
import { CheckCircle2Icon, ChevronLeft, ChevronRight, SettingsIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  src: string; // URL of the master playlist (e.g., master.m3u8)
  chapter: Chapter & { course: { slug: string } }
  nextChapter: Chapter
  previousChapter: Chapter
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({src, chapter, nextChapter, previousChapter}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null)
  const [qualities, setQualities] = useState<{ label: string; index: number; width: number; height: number }[]>([])
  const [selectedQuality, setSelectedQuality] = useState<number | 'auto'>('auto')
  const {logActivity} = useActivityLogger()

  // Initialize HLS and load qualities from master.m3u8
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    let hls: Hls | null = null

    if (Hls.isSupported()) {
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
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError()
              break
            default:
              hls?.destroy()
              break
          }
        }
      })
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS for Safari
      videoElement.src = src
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play().catch((err) => console.error('Native HLS play error:', err))
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

  // Render quality label with resolution
  const renderLabel = (label: string, width: number, height: number) => {
    if (label === 'Auto') return 'Auto'

    // Use height to determine the "p" label (common video quality notation)
    const heightLabel = `${height}p`

    // Return the label with full resolution in parentheses
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


  const navigateToNextChapter = () => {
    // courses/new-course-laravel/chapters/9e40da81-4a6c-4684-885a-2f63ad06ceef
    console.log('Next Chapter')
    router.visit(`/courses/${chapter?.course.slug}/chapters/${nextChapter.id}`)
  }

  return (
    <div onDoubleClick={enterFullScreen} ref={containerRef} className="relative w-full max-w-full bg-red-600">
      <video
        onMouseDown={(e) => logActivity({
          activityType: 'video_mouse_down',
          metadata: JSON.stringify({x: e.clientX, y: e.clientY})
        })}
        onCanPlay={() => console.log('Video can play')}
        onPlay={() => logActivity({
          activityType: 'video_play',
          metadata: JSON.stringify({
            currentTime: videoRef.current?.currentTime,
            videoDuration: videoRef.current?.duration,
            videoSrc: videoRef.current?.src,
            chapterId: 1
          })
        })}
        onPause={() => logActivity({
          activityType: 'video_pause',
          metadata: JSON.stringify({
            currentTime: videoRef.current?.currentTime,
            videoDuration: videoRef.current?.duration,
            videoSrc: videoRef.current?.src,
            chapterId: 1
          })
        })}
        onEnded={() => console.log('Video ended')}
        onSeeking={() => console.log('Video seeking')}
        onSeeked={() => console.log('Video seeked')}
        onLoadedMetadata={() => logActivity({
          activityType: 'video_loaded_metadata',
          metadata: JSON.stringify({
            currentTime: videoRef.current?.currentTime,
            videoDuration: videoRef.current?.duration,
            videoSrc: videoRef.current?.src,
            chapterId: 1
          })
        })}
        onError={(e) => console.error('Video error:', e)}
        ref={videoRef}
        controls
        className="relative w-full h-auto max-h-[calc(100vh-100px)] rounded-md aspect-video object-cover bg-black p-0.5"
      />
      <Button className="absolute top-2 left-2 z-10">
        <CheckCircle2Icon className="h-5 w-5"/>
      </Button>
      {/*Previous Icon on Left middle*/}
      <Button size={'sm'} className="absolute top-1/2 transform -translate-y-1/2 z-10 rounded-none">
        <ChevronLeft className="h-5 w-5"/>
      </Button>
      <Button
        onClick={navigateToNextChapter}
        size={'sm'} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 rounded-none">
        <ChevronRight className="h-5 w-5"/>
      </Button>
      {/* Gear Icon and Quality Selector */}
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 transition-opacity"
            >
              <SettingsIcon className="h-5 w-5"/>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-black bg-opacity-90 border-none text-white mr-2">
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => handleQualityChange('auto')}
            >
              <span>Auto</span>
              {selectedQuality === 'auto' && (
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"/>
              )}
            </DropdownMenuItem>

            {qualities.map((q) => (
              <DropdownMenuItem
                key={q.index}
                className="flex items-center justify-between px-4"
                onClick={() => handleQualityChange(q.index)}
              >
                <span>{renderLabel(q.label, q.width, q.height)}</span>
                {selectedQuality === q.index && (
                  <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"/>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default VideoPlayer
