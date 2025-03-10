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
      setIsMobile(window.innerWidth < 640)
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

  const getCurrentQualityLabel = () => {
    if (selectedQuality === 'auto') return 'Auto'
    const quality = qualities.find(q => q.index === selectedQuality)
    return quality ? renderLabel(quality.label, quality.width, quality.height) : 'Unknown'
  }

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

      {showQualities && (
        <div
          className={cn(
            "absolute bg-black/95 rounded-lg shadow-xl border border-white/10 w-[200px] py-2 z-50",
            isMobile ?
              "top-full right-0 mt-2 translate-x-1/4" :
              "bottom-full right-0 mb-2"
          )}
          onMouseLeave={() => !isMobile && setShowQualities(false)}
        >
          {/* Header */}
          <div className="px-4 pb-2 mb-2 border-b border-white/10">
            <h3 className="text-white/60 text-xs font-medium mb-1">Quality</h3>
            <p className="text-white text-sm font-semibold">
              {getCurrentQualityLabel()}
            </p>
          </div>

          {/* Quality Options */}
          <div className="max-h-[300px] overflow-y-auto">
            <div
              className={cn(
                "flex items-center justify-between px-4 py-2 hover:bg-red-600/50 cursor-pointer transition-colors",
                selectedQuality === 'auto' && "bg-red-600/30"
              )}
              onClick={() => {
                handleQualityChange('auto')
                setShowQualities(false)
              }}
            >
              <div>
                <span className="text-white text-sm font-medium">Auto</span>
                <p className="text-white/60 text-xs">Recommended</p>
              </div>
              {selectedQuality === 'auto' && (
                <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>

            {qualities.map((q) => (
              <div
                key={q.index}
                className={cn(
                  "flex items-center justify-between px-4 py-2 hover:bg-red-600/50 cursor-pointer transition-colors",
                  selectedQuality === q.index && "bg-red-600/30"
                )}
                onClick={() => {
                  handleQualityChange(q.index)
                  setShowQualities(false)
                }}
              >
                <div>
                  <span className="text-white text-sm font-medium">
                    {renderLabel(q.label, q.width, q.height)}
                  </span>
                  <p className="text-white/60 text-xs">
                    {q.width}x{q.height}
                  </p>
                </div>
                {selectedQuality === q.index && (
                  <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoQualitySwitcher
