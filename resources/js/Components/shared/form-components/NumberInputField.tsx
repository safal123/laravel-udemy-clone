import React from 'react';
import { Input } from '@/Components/ui/input';
import FieldGroup from './FieldGroup';
import { cn } from '@/lib/utils';

interface NumberInputFieldProps {
  label: string;
  name: string;
  value: number | string | null;
  placeholder?: string;
  step?: string;
  min?: number;
  max?: number;
  error?: string;
  className?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  step = '1',
  min,
  max,
  error,
  className,
  helpText,
  required,
  disabled,
  icon,
  onChange
}) => {
  return (
    <FieldGroup
      label={label}
      name={name}
      error={error}
      className={className}
      required={required}
    >
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            {icon}
          </div>
        )}
        <Input
          id={name}
          name={name}
          type="number"
          step={step}
          min={min}
          max={max}
          value={value || ''}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          className={cn(
            'transition-colors focus:border-emerald-500 focus:ring-emerald-500/20',
            icon && 'pl-10',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
          )}
        />
      </div>
      {helpText && (
        <p className="text-xs text-slate-500 mt-1">
          {helpText}
        </p>
      )}
    </FieldGroup>
  );
};

export default NumberInputField;
