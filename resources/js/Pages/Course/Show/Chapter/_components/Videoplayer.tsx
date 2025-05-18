import { Button } from '@/Components/ui/button'
import { Chapter } from '@/types'
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
import { useVideoPlayer } from '@/hooks/useVideoPlayer'

// Constants for thumbnail preview
const THUMBNAIL_WIDTH = 160
const THUMBNAIL_HEIGHT = 90
const THUMBNAIL_MARGIN = 16

interface VideoPlayerProps {
  src: string
  chapter: Chapter & {
    course: { slug: string }
    media: Media[]
  }
  nextChapterId?: string
  previousChapterId?: string
  isCompleted: boolean
  thumbnailUrl?: string
  storageId?: string
  onQualityChange?: (quality: string) => void
  isPreview?: boolean
}

interface Media {
  id: string;
  storage_id: string;
  metadata: {
    sprite_sheet_path: string;
  };
}

const VideoPlayer = ({
  src,
  chapter,
  nextChapterId,
  previousChapterId,
  isCompleted,
  thumbnailUrl,
  storageId,
  onQualityChange,
  isPreview = false
}: VideoPlayerProps) => {
  const {
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
    toggleSpeedOptions,
    setIsHovering
  } = useVideoPlayer({
    src,
    chapter,
    nextChapterId,
    isCompleted,
    isPreview,
    onQualityChange
  })

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
        poster={chapter.media[0].metadata.thumbnail_path}
        preload="auto"
      />

      {/* Video overlay - enables clicking anywhere to play/pause */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Play/Pause icon overlay - always show in preview mode when paused */}
      {(!showControls && !isPlaying) && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
            <PlayIcon className="h-12 w-12 text-white" />
          </div>
        </div>
      )}

      {/* Mobile Settings Menu (Vimeo style) - hide in preview mode */}
      {!isPreview && showMobileMenu && (
        <div className="absolute inset-0 bg-gray-900/95 z-50 flex flex-col"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between py-3 px-5 border-b border-gray-800">
            <h3 className="text-white text-base font-medium">Settings</h3>
            <button
              className="text-white p-1.5 rounded-full hover:bg-gray-800"
              onClick={() => toggleMobileMenu}>
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Quality Options */}
            <div className="border-b border-gray-900">
              <div className="py-3 px-5 flex items-center justify-between">
                <span className="text-white text-base">Quality</span>
                <span className="text-white font-medium">
                  {currentQuality === 'auto'
                    ? `Auto (${actualPlayingQuality})`
                    : getQualityLabel()}
                </span>
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
                onClick={toggleSpeedOptions}
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
          </div>
        </div>
      )}

      {/* Controls overlay - simplified in preview mode */}
      <div
        className={`absolute bottom-0 left-0 right-0 ${isPreview ? 'bg-transparent' : 'bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-10'}
          transition-opacity duration-300 select-none ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar - always shown (even in preview) */}
        <div
          ref={progressRef}
          className={`relative ${isPreview ? 'h-1 mb-0' : 'h-1.5 mb-3'} w-full bg-white/20 rounded-full cursor-pointer group/progress`}
          onClick={isPreview ? undefined : handleProgressClick}
          onMouseMove={isPreview ? undefined : handleProgressHover}
          onMouseEnter={isPreview ? undefined : () => setIsHovering(true)}
          onMouseLeave={isPreview ? undefined : () => setIsHovering(false)}
        >
          {/* Thumbnail preview - hide in preview mode */}
          {isHovering && !isMobileDevice && !isPreview && (
            <div
              className="absolute bottom-full mb-3 bg-black/90 rounded-md overflow-hidden shadow-xl border border-white/10"
              style={{
                ...thumbnailPos,
                width: THUMBNAIL_WIDTH,
                height: THUMBNAIL_HEIGHT + 24,
                marginBottom: THUMBNAIL_MARGIN
              }}
            >
              <div style={getSpriteStyle(hoverTime)} className="w-full h-[90px]" />
              <div className="py-1.5 px-2 text-xs text-white text-center bg-black/90 font-medium">
                {formatTime(hoverTime)}
              </div>
            </div>
          )}

          {/* Buffered progress */}
          <div
            className="absolute h-full bg-white/30 rounded-full"
            style={{ width: `${(buffered / duration) * 100}%` }}
          />

          {/* Playback progress */}
          <div
            className={`absolute h-full ${isPreview ? 'bg-red-600/70' : 'bg-red-600'} rounded-full`}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            {/* Seek handle - hide in preview mode */}
            {!isPreview && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 h-3 w-3 rounded-full
                scale-0 group-hover/progress:scale-100 transition-transform" />
            )}
          </div>

          {/* Hover indicator - hide in preview mode */}
          {hoverPosition !== null && isHovering && !isPreview && (
            <div
              className="absolute h-full bg-white/50"
              style={{
                width: `${hoverPosition}%`,
                background: 'linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 100%)'
              }}
            />
          )}
        </div>

        {/* Control buttons - hide in preview mode */}
        {!isPreview && (
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
                  onClick={() => navigateToPreviousChapter(previousChapterId)}
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
                  className="text-white hover:text-white hover:bg-red-600 transition-colors rounded-full p-2 w-9 h-9 flex items-center justify-center"
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
        )}
      </div>
    </div>
  )
}

export default VideoPlayer