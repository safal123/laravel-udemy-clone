import { Button } from '@/Components/ui/button'
import cx from 'classnames'
import { Loader2 } from 'lucide-react'

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  className,
  children,
  ...props
}: LoadingButtonProps) {
  const classNames = cx(
    'flex items-center',
    'focus:outline-none',
    {
      'pointer-events-none bg-opacity-75 select-none': loading
    },
    className
  );
  return (
    <Button disabled={loading} className={classNames} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
      {children}
    </Button>
  );
}
