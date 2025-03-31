import React from 'react';
import { Checkbox } from '@/Components/ui/checkbox';
import { Label } from '@/Components/ui/label';
import { cn } from '@/lib/utils';

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  className?: string;
  helpText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  checked,
  className,
  helpText,
  error,
  disabled,
  required,
  onChange
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-3">
        <Checkbox
          id={id}
          checked={checked}
          disabled={disabled}
          className={cn(
            'transition-colors data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500',
            error && 'border-rose-500'
          )}
          onCheckedChange={(checked) => onChange(!!checked)}
        />
        <div className="space-y-1 leading-none">
          <Label
            htmlFor={id}
            className={cn(
              'text-sm font-medium cursor-pointer flex items-center gap-1',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label}
            {required && (
              <span className="text-rose-500">*</span>
            )}
          </Label>
          {helpText && (
            <p className="text-xs text-slate-500">
              {helpText}
            </p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default CheckboxField;
