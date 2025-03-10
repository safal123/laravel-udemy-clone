import { Button } from '@/Components/ui/button'
import { SettingsIcon } from 'lucide-react'
import { useState } from 'react'

interface VideoQualitySwitcherProps {
  qualities: { label: string; index: number; width: number; height: number }[]
  selectedQuality: number | 'auto'
  handleQualityChange: (quality: number | 'auto') => void
  renderLabel: (label: string, width: number, height: number) => string
}

const VideoQualitySwitcher = ({ qualities, selectedQuality, handleQualityChange, renderLabel }: VideoQualitySwitcherProps) => {
  const [showQualities, setShowQualities] = useState(false)

  return (
    <div className="relative group">
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
          className="absolute bottom-full right-0 mb-2 bg-black/95 rounded-lg shadow-xl border border-white/10 min-w-[120px] py-1"
          onMouseLeave={() => setShowQualities(false)}
        >
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
