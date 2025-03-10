import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { SettingsIcon } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useState } from 'react'

interface VideoQualitySwitcherProps {
  qualities: { label: string; index: number; width: number; height: number }[];
  selectedQuality: number | 'auto';
  handleQualityChange: (quality: number | 'auto') => void;
  renderLabel: (label: string, width: number, height: number) => string;
}

const VideoQualitySwitcher = ({ qualities, selectedQuality, handleQualityChange, renderLabel }: VideoQualitySwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null)

  const handleTriggerClick = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement
    setButtonRect(button.getBoundingClientRect())
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-white bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 transition-opacity"
        onClick={handleTriggerClick}
      >
        <SettingsIcon className="h-5 w-5" />
      </Button>

      {isOpen && buttonRect && createPortal(
        <div
          className="fixed bg-black bg-opacity-90 rounded-md p-2 min-w-[160px]"
          style={{
            top: `${buttonRect.top - 180}px`,
            left: `${buttonRect.left - 120}px`,
            zIndex: 999999999
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-2 hover:bg-white/10 cursor-pointer"
            onClick={() => {
              handleQualityChange('auto')
              setIsOpen(false)
            }}
          >
            <span className="text-white">Auto</span>
            {selectedQuality === 'auto' && (
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>

          {qualities.map((q) => (
            <div
              key={q.index}
              className="flex items-center justify-between px-4 py-2 hover:bg-white/10 cursor-pointer"
              onClick={() => {
                handleQualityChange(q.index)
                setIsOpen(false)
              }}
            >
              <span className="text-white">{renderLabel(q.label, q.width, q.height)}</span>
              {selectedQuality === q.index && (
                <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

export default VideoQualitySwitcher
