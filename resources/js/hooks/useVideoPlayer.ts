import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'

interface VideoPlayerHookProps {
  src: string
  chapter: any
  nextChapterId?: string
  isCompleted: boolean
  isPreview?: boolean
  onQualityChange?: (quality: string) => void
}

interface Quality {
  index: number
  label: string
  width: number
  height: number
}

interface ThumbnailPosition {
  left: string | number
  right: string | number
  transform: string
}

interface SpriteConfig {
  url: string
  width: number
  height: number
  cols: number
  rows: number
  count: number
  interval: number
}

// Constants for thumbnail preview
const THUMBNAIL_WIDTH = 160
const THUMBNAIL_HEIGHT = 90
const THUMBNAIL_MARGIN = 16

export function useVideoPlayer({
  src,
  chapter,
  nextChapterId,
  isCompleted,
  isPreview = false,
  onQualityChange
}: VideoPlayerHookProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null)

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

  // Thumbnail preview states
  const [isHovering, setIsHovering] = useState(false)
  const [hoverTime, setHoverTime] = useState(0)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)
  const [thumbnailPos, setThumbnailPos] = useState<ThumbnailPosition>({
    left: 0,
    right: 'auto',
    transform: 'none'
  })

  // Quality settings
  const [qualities, setQualities] = useState<Quality[]>([])
  const [currentQuality, setCurrentQuality] = useState<number | 'auto'>('auto')
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSpeedOptions, setShowSpeedOptions] = useState(false)
  const [actualPlayingQuality, setActualPlayingQuality] = useState<string>('Auto')

  // Sprite sheet config
  const [spriteConfig, setSpriteConfig] = useState<SpriteConfig>({
    url: chapter.media[0].metadata.sprite_sheet_path,
    width: 160,
    height: 90,
    cols: 10,
    rows: 10,
    count: 100,
    interval: 5
  })

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

        // Track the actual playing quality
        hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
          const levelIndex = data.level;
          if (hls && levelIndex >= 0 && levelIndex < hls.levels.length) {
            const level = hls.levels[levelIndex];
            const quality = level.height > 0 ? `${level.height}p` : `${Math.round(level.bitrate / 1000)}kbps`;
            setActualPlayingQuality(quality);
          } else {
            setActualPlayingQuality('Auto');
          }
        });

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

      // Skip completion tracking if in preview mode
      if (isPreview) return;

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
  }, [chapter.course.slug, chapter.progress, isCompleted, nextChapterId, playbackSpeed, isPreview])

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

  // Update sprite URL when thumbnailUrl or storageId changes
  useEffect(() => {
    if (chapter.media[0].metadata.sprite_sheet_path) {
      setSpriteConfig(prev => ({
        ...prev,
        url: chapter.media[0].metadata.sprite_sheet_path
      }))
    }
  }, [chapter.media[0].metadata.sprite_sheet_path])

  // Update sprite config when duration changes
  useEffect(() => {
    if (duration > 0) {
      setSpriteConfig(prev => ({
        ...prev,
        count: Math.ceil(duration / prev.interval)
      }))
    }
  }, [duration])

  // Update actual playing quality and notify parent component
  useEffect(() => {
    if (onQualityChange && actualPlayingQuality) {
      const displayQuality = currentQuality === 'auto'
        ? `Auto (${actualPlayingQuality})`
        : getQualityLabel();
      onQualityChange(displayQuality);
    }
  }, [actualPlayingQuality, currentQuality, onQualityChange]);

  // Track the actual playing quality
  useEffect(() => {
    if (hlsInstance) {
      const levelSwitchedHandler = (_: any, data: any) => {
        const levelIndex = data.level;
        if (levelIndex >= 0 && levelIndex < hlsInstance.levels.length) {
          const level = hlsInstance.levels[levelIndex];
          const quality = level.height > 0 ? `${level.height}p` : `${Math.round(level.bitrate / 1000)}kbps`;
          setActualPlayingQuality(quality);
        } else {
          setActualPlayingQuality('Auto');
        }
      };

      hlsInstance.on(Hls.Events.LEVEL_SWITCHED, levelSwitchedHandler);

      return () => {
        hlsInstance.off(Hls.Events.LEVEL_SWITCHED, levelSwitchedHandler);
      };
    }
  }, [hlsInstance]);

  // Format time to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Get sprite style for a specific time position
  const getSpriteStyle = (time: number): React.CSSProperties => {
    if (!spriteConfig.url || duration <= 0) return {}

    const thumbnailIndex = Math.min(
      Math.floor(time / spriteConfig.interval),
      spriteConfig.count - 1
    )

    const row = Math.floor(thumbnailIndex / spriteConfig.cols)
    const col = thumbnailIndex % spriteConfig.cols

    return {
      backgroundImage: `url(${spriteConfig.url})`,
      backgroundPosition: `${-col * spriteConfig.width}px ${-row * spriteConfig.height}px`,
      backgroundSize: `${spriteConfig.cols * spriteConfig.width}px ${spriteConfig.rows * spriteConfig.height}px`,
      backgroundRepeat: 'no-repeat',
      width: `${THUMBNAIL_WIDTH}px`,
      height: `${THUMBNAIL_HEIGHT}px`
    }
  }

  // Handle progress bar hover to show thumbnails
  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const time = percentage * duration

    setHoverTime(time)
    setHoverPosition(percentage * 100)

    // Calculate position for the thumbnail
    const halfWidth = THUMBNAIL_WIDTH / 2
    let position: ThumbnailPosition

    if (x <= halfWidth) {
      position = { left: 0, right: 'auto', transform: 'none' }
    } else if (x >= rect.width - halfWidth) {
      position = { left: 'auto', right: 0, transform: 'none' }
    } else {
      position = { left: `${x}px`, right: 'auto', transform: 'translateX(-50%)' }
    }

    setThumbnailPos(position)
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

  const navigateToPreviousChapter = (previousChapterId?: string) => {
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
    if (currentQuality === 'auto') return `Auto (${actualPlayingQuality})`;
    const quality = qualities.find(q => q.index === currentQuality);
    return quality ? quality.label : 'Auto';
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

  return {
    // Refs
    videoRef,
    containerRef,
    progressRef,
    thumbnailCanvasRef,

    // State
    isPlaying,
    currentTime,
    duration,
    isMuted,
    volume,
    isFullScreen,
    buffered,
    showControls,
    isMobileDevice,
    showMobileMenu,
    isHovering,
    hoverTime,
    hoverPosition,
    thumbnailPos,
    qualities,
    currentQuality,
    showQualityMenu,
    playbackSpeed,
    showSpeedOptions,
    actualPlayingQuality,
    spriteConfig,

    // Methods
    formatTime,
    getSpriteStyle,
    handleProgressHover,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    toggleFullScreen,
    handleProgressClick,
    navigateToPreviousChapter,
    navigateToNextChapter,
    toggleQualityMenu,
    toggleMobileMenu,
    changeQuality,
    getQualityLabel,
    changePlaybackSpeed,
    toggleSpeedOptions: (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowSpeedOptions(!showSpeedOptions);
    },
    setIsHovering
  }
}
