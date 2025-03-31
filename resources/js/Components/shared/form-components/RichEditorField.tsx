import React from 'react';
import Editor from '@/Components/shared/Editor';
import FieldGroup from './FieldGroup';
import { cn } from '@/lib/utils';

interface RichEditorFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  className?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
}

const RichEditorField: React.FC<RichEditorFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  error,
  className,
  helpText,
  required,
  disabled,
  maxLength,
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
      <div className={cn(
        'w-full rounded-md border border-input bg-background ring-offset-background',
        error && 'border-rose-500',
        disabled && 'opacity-50 cursor-not-allowed'
      )}>
        <Editor
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
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

export default RichEditorField;
