import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { SettingsIcon } from 'lucide-react'

interface VideoQualitySwitcherProps {
  qualities: { label: string; index: number; width: number; height: number }[];
  selectedQuality: number | 'auto';
  handleQualityChange: (quality: number | 'auto') => void;
  renderLabel: (label: string, width: number, height: number) => string;
}

const VideoQualitySwitcher = ({ qualities, selectedQuality, handleQualityChange, renderLabel }: VideoQualitySwitcherProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-red-600 rounded-full transition-all duration-200 hover:scale-110 relative z-[100000]"
          onClick={(e) => e.stopPropagation()}
        >
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="bg-black/95 border-none text-white rounded-lg shadow-xl"
          align="end"
          side="top"
          sideOffset={8}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
          style={{
            zIndex: 2147483647 // Maximum z-index value
          }}
        >
          <DropdownMenuItem
            className="flex items-center justify-between px-4 py-2 hover:bg-red-600/50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleQualityChange('auto')
            }}
          >
            <span>Auto</span>
            {selectedQuality === 'auto' && (
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse ml-4" />
            )}
          </DropdownMenuItem>

          {qualities.map((q) => (
            <DropdownMenuItem
              key={q.index}
              className="flex items-center justify-between px-4 py-2 hover:bg-red-600/50 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                handleQualityChange(q.index)
              }}
            >
              <span>{renderLabel(q.label, q.width, q.height)}</span>
              {selectedQuality === q.index && (
                <span className="ml-4 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export default VideoQualitySwitcher
