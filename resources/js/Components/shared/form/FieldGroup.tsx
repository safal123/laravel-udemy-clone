import { cn } from '@/lib/utils'

interface FieldGroupProps {
  name?: string;
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FieldGroup
({
  label,
  name,
  error,
  children,
  className,
}: FieldGroupProps) {
  return (
    <div className={cn('space-y-1 ', className)}>
      {label && (
        <label className="block font-semibold text-gray-600 select-none" htmlFor={name}>
          {label}:
        </label>
      )}
      {children}
      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
    </div>
  );
}
