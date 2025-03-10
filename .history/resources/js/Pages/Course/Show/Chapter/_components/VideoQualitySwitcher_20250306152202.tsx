import { Button } from '@/Components/ui/button'
import { SettingsIcon } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface VideoQualitySwitcherProps {
  qualities: { label: string; index: number; width: number; height: number }[]
  selectedQuality: number | 'auto'
  handleQualityChange: (quality: number | 'auto') => void
  renderLabel: (label: string, width: number, height: number) => string
}

const VideoQualitySwitcher = ({ qualities, selectedQuality, handleQualityChange, renderLabel }: VideoQualitySwitcherProps) => {
  const [showQualities, setShowQualities] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowQualities(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative group" ref={containerRef}>
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
        onClick={() => setShowQualities(!showQualities)}
      >
        <SettingsIcon className="h-5 w-5" />
      </Button>

      {/* Quality options panel */}
      {showQualities && (
        <div
          className={cn(
            "absolute bg-black/95 rounded-lg shadow-xl border border-white/10 min-w-[120px] py-1 z-50",
            isMobile ?
              "top-full left-0 mt-2" :
              "bottom-full right-0 mb-2"
          )}
          onMouseLeave={() => !isMobile && setShowQualities(false)}
        >
          {/* Current quality indicator - Mobile only */}
          {isMobile && (
            <div className="px-3 py-2 border-b border-white/10">
              <span className="text-white/60 text-xs">Current Quality:</span>
              <span className="text-white text-sm ml-2">
                {selectedQuality === 'auto' ? 'Auto' :
                  qualities.find(q => q.index === selectedQuality)?.label || 'Unknown'}
              </span>
            </div>
          )}

          <div
            className="flex items-center justify-between px-3 py-2 hover:bg-red-600/50 cursor-pointer"
            onClick={() => {
              handleQualityChange('auto')
              setShowQualities(false)
            }}
          >
            <span className="text-white text-sm">Auto</span>
            {selectedQuality === 'auto' && (
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>

          {qualities.map((q) => (
            <div
              key={q.index}
              className="flex items-center justify-between px-3 py-2 hover:bg-red-600/50 cursor-pointer"
              onClick={() => {
                handleQualityChange(q.index)
                setShowQualities(false)
              }}
            >
              <span className="text-white text-sm">
                {renderLabel(q.label, q.width, q.height)}
              </span>
              {selectedQuality === q.index && (
                <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VideoQualitySwitcher
