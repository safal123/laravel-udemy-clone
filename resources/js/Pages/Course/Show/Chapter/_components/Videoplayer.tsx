import { Button } from '@/Components/ui/button'
import { Chapter } from '@/types'
import { router } from '@inertiajs/react'
import Hls from 'hls.js'
import {
  CheckIcon,
  ChevronDownIcon,
  Maximize2Icon,
  Minimize2Icon,
  MoreVerticalIcon,
  PauseIcon,
  PlayIcon,
  SettingsIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

interface VideoPlayerProps {
  src: string
  chapter: Chapter & { course: { slug: string } }
  nextChapterId: string
  previousChapterId: string
  isCompleted: boolean
}

interface Quality {
  index: number;
  label: string;
  width: number;
  height: number;
}

const VideoPlayer = ({
  src,
  chapter,
  nextChapterId,
  previousChapterId,
  isCompleted
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [hideControlsTimeout, setHideControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Quality settings
  const [qualities, setQualities] = useState<Quality[]>([])
  const [currentQuality, setCurrentQuality] = useState<number | 'auto'>('auto')
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSpeedOptions, setShowSpeedOptions] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    const initPlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60
        })

        hls.loadSource(src)
        hls.attachMedia(video)

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Get available quality levels
          if (hls) {
            const availableQualities = hls.levels.map((level, index) => ({
              index,
              label: level.height > 0 ? `${level.height}p` : `${Math.round(level.bitrate / 1000)}kbps`,
              width: level.width,
              height: level.height
            }))

            setQualities(availableQualities)

            // Set default to HD if available
            const hdLevel = availableQualities.find(
              level => level.height === 720 || level.height === 1080
            )

            if (hdLevel && hls) {
              hls.currentLevel = hdLevel.index
              setCurrentQuality(hdLevel.index)
            }
          }

          video.play().catch(() => {
            // Handle autoplay restriction
            console.log('Autoplay prevented by browser')
          })
        })

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                toast.error('Network error occurred. Retrying...')
                hls?.startLoad()
                break
              case Hls.ErrorTypes.MEDIA_ERROR:
                toast.error('Media error occurred. Recovering...')
                hls?.recoverMediaError()
                break
              default:
                toast.error('A playback error occurred')
                break
            }
          }
        })

        setHlsInstance(hls)
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = src
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => {
            console.log('Autoplay prevented by browser')
          })
        })
      } else {
        toast.error('HLS is not supported in this browser')
      }
    }

    initPlayer()

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [src])

  // Update time and duration
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const updatePlayState = () => setIsPlaying(!video.paused)

    const updateBuffer = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1))
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)

      // If this chapter is not marked as completed, mark it
      if (!isCompleted) {
        router.put(route('progress.update', chapter.progress[0].id), {
          is_completed: true,
          completed_at: new Date().toISOString()
        }, {
          onSuccess: () => {
            toast.success('Chapter completed')
          }
        })
      }

      // Navigate to next chapter if available
      if (nextChapterId) {
        setTimeout(() => {
          toast('Moving to next chapter...', {
            action: {
              label: 'Cancel',
              onClick: () => clearTimeout(navigateTimeout)
            }
          })

          const navigateTimeout = setTimeout(() => {
            router.visit(`/courses/${chapter.course.slug}/chapters/${nextChapterId}`)
          }, 5000)
        }, 1000)
      }
    }

    // Set initial playback speed
    video.playbackRate = playbackSpeed;

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('durationchange', updateDuration)
    video.addEventListener('play', updatePlayState)
    video.addEventListener('pause', updatePlayState)
    video.addEventListener('progress', updateBuffer)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('durationchange', updateDuration)
      video.removeEventListener('play', updatePlayState)
      video.removeEventListener('pause', updatePlayState)
      video.removeEventListener('progress', updateBuffer)
      video.removeEventListener('ended', handleEnded)
    }
  }, [chapter.course.slug, chapter.progress, isCompleted, nextChapterId, playbackSpeed])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Close quality menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showQualityMenu || showMobileMenu) {
        setShowQualityMenu(false)
        setShowMobileMenu(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showQualityMenu, showMobileMenu])

  // Controls visibility
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)

      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout)
      }

      const timeout = setTimeout(() => {
        if (isPlaying && !showQualityMenu && !showMobileMenu) {
          setShowControls(false)
        }
      }, 3000)

      setHideControlsTimeout(timeout)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('touchstart', handleMouseMove)
      container.addEventListener('mouseenter', () => setShowControls(true))
      container.addEventListener('mouseleave', () => {
        if (isPlaying && !showQualityMenu && !showMobileMenu) {
          setShowControls(false)
        }
      })
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('touchstart', handleMouseMove)
      }

      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout)
      }
    }
  }, [hideControlsTimeout, isPlaying, showQualityMenu, showMobileMenu])

  // Format time to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Control handlers
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const progress = progressRef.current
    if (!video || !progress) return

    const rect = progress.getBoundingClientRect()
    const percentage = (e.clientX - rect.left) / rect.width
    const newTime = percentage * duration

    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const navigateToPreviousChapter = () => {
    if (previousChapterId) {
      router.visit(`/courses/${chapter.course.slug}/chapters/${previousChapterId}`)
    }
  }

  const navigateToNextChapter = () => {
    if (nextChapterId) {
      router.visit(`/courses/${chapter.course.slug}/chapters/${nextChapterId}`)
    }
  }

  const toggleQualityMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowQualityMenu(!showQualityMenu)
    setShowMobileMenu(false)
  }

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMobileMenu(!showMobileMenu)
    setShowQualityMenu(false)
  }

  const changeQuality = (qualityIndex: number | 'auto', e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentQuality(qualityIndex)

    if (hlsInstance) {
      hlsInstance.currentLevel = qualityIndex === 'auto' ? -1 : qualityIndex
      toast.success(`Quality changed to ${qualityIndex === 'auto' ? 'Auto' : qualities.find(q => q.index === qualityIndex)?.label}`)
    }

    setShowQualityMenu(false)
    setShowMobileMenu(false)
  }

  const getQualityLabel = () => {
    if (currentQuality === 'auto') return 'Auto'
    const quality = qualities.find(q => q.index === currentQuality)
    return quality ? quality.label : 'Auto'
  }

  const changePlaybackSpeed = (speed: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    video.playbackRate = speed
    setPlaybackSpeed(speed)
    toast.success(`Playback speed set to ${speed}x`)
    setShowSpeedOptions(false)
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-black w-full h-full aspect-video group cursor-pointer"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        preload="auto"
      />

      {/* Video overlay - enables clicking anywhere to play/pause */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Play/Pause icon overlay */}
      {!showControls && !isPlaying && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
            <PlayIcon className="h-12 w-12 text-white" />
          </div>
        </div>
      )}

      {/* Mobile Settings Menu (Vimeo style) */}
      {showMobileMenu && (
        <div className="absolute inset-0 bg-gray-900/95 z-50 flex flex-col"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between py-4 px-5 border-b border-gray-800">
            <h3 className="text-white text-xl font-medium">Settings</h3>
            <button
              className="text-white p-1.5 rounded-full hover:bg-gray-800"
              onClick={() => setShowMobileMenu(false)}>
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Quality Options */}
            <div className="border-b border-gray-800">
              <div className="py-3 px-5 flex items-center justify-between">
                <span className="text-white text-base">Quality</span>
                <span className="text-white font-medium">{getQualityLabel()}</span>
              </div>

              <div className="pb-2">
                {qualities.length > 0 && (
                  <div className="py-2 px-5">
                    {currentQuality === 'auto' ? (
                      <div className="flex items-center text-red-500 font-medium">
                        <CheckIcon className="h-5 w-5 mr-3" />
                        <span>Auto</span>
                      </div>
                    ) : (
                      <button
                        className="w-full py-2 text-left text-white flex items-center"
                        onClick={(e) => changeQuality('auto', e)}
                      >
                        <span className="ml-8">Auto</span>
                      </button>
                    )}

                    {qualities.map((quality) => (
                      <button
                        key={quality.index}
                        className={`w-full py-2 text-left flex items-center ${currentQuality === quality.index ? 'text-red-500 font-medium' : 'text-white'
                          }`}
                        onClick={(e) => changeQuality(quality.index, e)}
                      >
                        {currentQuality === quality.index ? (
                          <CheckIcon className="h-5 w-5 mr-3" />
                        ) : (
                          <span className="ml-8"></span>
                        )}
                        <span>{quality.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Playback Speed Section */}
            <div className="border-b border-gray-800">
              <div
                className="py-3 px-5 flex items-center justify-between"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSpeedOptions(!showSpeedOptions);
                }}
              >
                <span className="text-white text-base">Speed</span>
                <span className="text-white font-medium flex items-center">
                  {playbackSpeed === 1 ? 'Normal' : `${playbackSpeed}x`}
                  <ChevronDownIcon className="h-5 w-5 ml-1" />
                </span>
              </div>

              {showSpeedOptions && (
                <div className="pb-2">
                  <div className="py-2 px-5">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        className={`w-full py-2 text-left flex items-center ${playbackSpeed === speed ? 'text-red-500 font-medium' : 'text-white'
                          }`}
                        onClick={(e) => changePlaybackSpeed(speed, e)}
                      >
                        {playbackSpeed === speed ? (
                          <CheckIcon className="h-5 w-5 mr-3" />
                        ) : (
                          <span className="ml-8"></span>
                        )}
                        <span>{speed === 1 ? 'Normal' : `${speed}x`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Audio Control Section */}
            <div className="border-b border-gray-800">
              <div className="py-3 px-5 flex items-center justify-between">
                <span className="text-white text-base">Audio</span>
                <span className="text-white font-medium">Original Audio</span>
              </div>

              <div className="px-5 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Volume</span>
                  <button
                    className="text-white rounded-full p-1 hover:bg-gray-800"
                    onClick={toggleMute}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeXIcon className="h-5 w-5" />
                    ) : (
                      <Volume2Icon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Chapters section */}
            <div className="border-b border-gray-800">
              <div className="py-3 px-5">
                <span className="text-white text-base">Chapters</span>
              </div>

              <div className="pb-2">
                <button
                  disabled={!previousChapterId}
                  className={`w-full py-2 px-5 text-left flex items-center ${previousChapterId ? 'text-white' : 'text-gray-600'
                    }`}
                  onClick={navigateToPreviousChapter}
                >
                  <span className="flex items-center gap-2">
                    <SkipBackIcon className="h-5 w-5" />
                    Previous Chapter
                  </span>
                </button>

                <button
                  disabled={!nextChapterId}
                  className={`w-full py-2 px-5 text-left flex items-center ${nextChapterId ? 'text-white' : 'text-gray-600'
                    }`}
                  onClick={navigateToNextChapter}
                >
                  <span className="flex items-center gap-2">
                    <SkipForwardIcon className="h-5 w-5" />
                    Next Chapter
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent 
          transition-opacity duration-300 p-4 pt-10 select-none ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="relative h-1.5 w-full bg-white/20 rounded-full mb-3 cursor-pointer group/progress"
          onClick={handleProgressClick}
        >
          {/* Buffered progress */}
          <div
            className="absolute h-full bg-white/30 rounded-full"
            style={{ width: `${(buffered / duration) * 100}%` }}
          />

          {/* Playback progress */}
          <div
            className="absolute h-full bg-red-600 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            {/* Seek handle */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 h-3 w-3 rounded-full 
              scale-0 group-hover/progress:scale-100 transition-transform" />
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause button */}
            <button
              className="text-white hover:text-red-500 transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </button>

            {/* Previous/Next chapter buttons - desktop only */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={!previousChapterId}
                onClick={navigateToPreviousChapter}
                className="text-white hover:text-red-500 transition-colors rounded-full p-1 opacity-80 hover:opacity-100 disabled:opacity-50"
              >
                <SkipBackIcon className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                disabled={!nextChapterId}
                onClick={navigateToNextChapter}
                className="text-white hover:text-red-500 transition-colors rounded-full p-1 opacity-80 hover:opacity-100 disabled:opacity-50"
              >
                <SkipForwardIcon className="h-5 w-5" />
              </Button>
            </div>

            {/* Time display */}
            <div className="text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <span className="text-white/60 mx-1">/</span>
              <span className="text-white/60">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <div className="block md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="text-white hover:text-red-500 transition-colors rounded-full p-1"
              >
                <MoreVerticalIcon className="h-5 w-5" />
              </Button>
            </div>

            {/* Quality selector - desktop only */}
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleQualityMenu}
                className="text-white hover:text-red-500 transition-colors rounded px-2 py-1 h-8 text-xs flex items-center gap-1"
              >
                <SettingsIcon className="h-4 w-4 mr-1" />
                <span>{getQualityLabel()}</span>
                <ChevronDownIcon className="h-3 w-3 ml-1" />
              </Button>

              {showQualityMenu && (
                <div className="absolute bottom-full mb-1 right-0 bg-gray-900/95 backdrop-blur-sm rounded-md shadow-lg border border-gray-700 overflow-hidden py-1 w-32 z-50"
                  onClick={e => e.stopPropagation()}>
                  <div className="px-3 py-1 text-xs text-gray-400 font-medium">Quality</div>

                  <button
                    className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-800 flex items-center justify-between ${currentQuality === 'auto' ? 'text-red-500' : 'text-white'}`}
                    onClick={(e) => changeQuality('auto', e)}
                  >
                    Auto
                    {currentQuality === 'auto' && <CheckIcon className="h-3 w-3" />}
                  </button>

                  {qualities.map((quality) => (
                    <button
                      key={quality.index}
                      className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-800 flex items-center justify-between ${currentQuality === quality.index ? 'text-red-500' : 'text-white'}`}
                      onClick={(e) => changeQuality(quality.index, e)}
                    >
                      {quality.label}
                      {currentQuality === quality.index && <CheckIcon className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Volume control - desktop only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                className="text-white hover:text-red-500 transition-colors"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeXIcon className="h-5 w-5" />
                ) : (
                  <Volume2Icon className="h-5 w-5" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-red-600 cursor-pointer"
              />
            </div>

            {/* Fullscreen button */}
            <button
              className="text-white hover:text-red-500 transition-colors"
              onClick={toggleFullScreen}
            >
              {isFullScreen ? (
                <Minimize2Icon className="h-5 w-5" />
              ) : (
                <Maximize2Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer