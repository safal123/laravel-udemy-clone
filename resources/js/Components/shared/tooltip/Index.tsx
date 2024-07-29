import { Button } from "@/Components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip"

type Props = {
  children: React.ReactNode,
  trigger: React.ReactNode,
}

export function CustomTooltip({children, trigger}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {trigger}
        </TooltipTrigger>
        <TooltipContent className={'text-red-500'}>
          Upload
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
