import React from 'react';
import { Textarea } from '@/Components/ui/textarea';
import FieldGroup from '@/Components/shared/form/FieldGroup';

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  className?: string;
  helpText?: string;
  rows?: number;
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
  rows,
  onChange
}) => {
  return (
    <FieldGroup label={label} name={name} error={error} className={className}>
      <Textarea
        name={name}
        value={value}
        placeholder={placeholder}
        className={`min-h-[150px] ${rows ? `h-[${rows * 24}px]` : ''}`}
        onChange={onChange}
      />
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </FieldGroup>
  );
};

export default TextareaField;
