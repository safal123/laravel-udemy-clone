import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { SettingsIcon } from 'lucide-react'
import * as Portal from '@radix-ui/react-portal'

interface VideoQualitySwitcherProps {
  qualities: { label: string; index: number; width: number; height: number }[];
  selectedQuality: number | 'auto';
  handleQualityChange: (quality: number | 'auto') => void;
  renderLabel: (label: string, width: number, height: number) => string;
}

const VideoQualitySwitcher = ({ qualities, selectedQuality, handleQualityChange, renderLabel }: VideoQualitySwitcherProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-black/20 hover:bg-white/10 rounded-full transition-all"
        >
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <Portal.Root>
        <DropdownMenuContent
          className="bg-black/95 border-none text-white rounded-lg shadow-xl"
          align="end"
          side="top"
          sideOffset={8}
          style={{
            zIndex: 2147483647 // Maximum z-index value
          }}
          forceMount
        >
          <DropdownMenuItem
            className="flex items-center justify-between px-4 py-2 hover:bg-white/10 cursor-pointer"
            onClick={() => handleQualityChange('auto')}
          >
            <span>Auto</span>
            {selectedQuality === 'auto' && (
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse ml-4" />
            )}
          </DropdownMenuItem>

          {qualities.map((q) => (
            <DropdownMenuItem
              key={q.index}
              className="flex items-center justify-between px-4 py-2 hover:bg-white/10 cursor-pointer"
              onClick={() => handleQualityChange(q.index)}
            >
              <span>{renderLabel(q.label, q.width, q.height)}</span>
              {selectedQuality === q.index && (
                <span className="ml-4 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </Portal.Root>
    </DropdownMenu>
  )
}

export default VideoQualitySwitcher
