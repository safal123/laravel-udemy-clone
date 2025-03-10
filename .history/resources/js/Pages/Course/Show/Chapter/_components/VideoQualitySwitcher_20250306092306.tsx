import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { SettingsIcon } from 'lucide-react'

interface VideoQualitySwitcherProps {
  qualities: { label: string; index: number; width: number; height: number }[];
  selectedQuality: number | 'auto';
  handleQualityChange: (quality: number | 'auto') => void;
  renderLabel: (label: string, width: number, height: number) => string;
}

const VideoQualitySwitcher = ({ qualities, selectedQuality, handleQualityChange, renderLabel }: VideoQualitySwitcherProps) => {
  return (
    <div className="relative">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 transition-opacity"
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="fixed bg-black bg-opacity-90 border-none text-white min-w-[160px]"
          align="end"
          side="top"
          sideOffset={8}
          avoidCollisions={false}
          style={{
            zIndex: 9999999,
            position: 'fixed'
          }}
        >
          <DropdownMenuItem
            className="flex items-center justify-between hover:bg-white/10"
            onClick={() => handleQualityChange('auto')}
          >
            <span>Auto</span>
            {selectedQuality === 'auto' && (
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </DropdownMenuItem>

          {qualities.map((q) => (
            <DropdownMenuItem
              key={q.index}
              className="flex items-center justify-between px-4 hover:bg-white/10"
              onClick={() => handleQualityChange(q.index)}
            >
              <span>{renderLabel(q.label, q.width, q.height)}</span>
              {selectedQuality === q.index && (
                <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default VideoQualitySwitcher
