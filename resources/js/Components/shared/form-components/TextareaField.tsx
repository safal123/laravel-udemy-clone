import React from 'react';
import { Textarea } from '@/Components/ui/textarea';
import FieldGroup from './FieldGroup';
import { cn } from '@/lib/utils';

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  className?: string;
  helpText?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  error,
  className,
  helpText,
  rows = 6,
  required,
  disabled,
  maxLength,
  onChange
}) => {
  const charCount = value?.length || 0;

  return (
    <FieldGroup
      label={label}
      name={name}
      error={error}
      className={className}
      required={required}
    >
      <div className="relative">
        <Textarea
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          className={cn(
            'min-h-[150px] resize-y transition-colors focus:border-emerald-500 focus:ring-emerald-500/20',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
          )}
          style={{ height: `${rows * 24}px` }}
          onChange={onChange}
        />
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-slate-500">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
      {helpText && (
        <p className="text-xs text-slate-500 mt-1">
          {helpText}
        </p>
      )}
    </FieldGroup>
  );
};

export default TextareaField;
