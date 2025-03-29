import React from 'react';
import { Input } from '@/Components/ui/input';
import FieldGroup from '@/Components/shared/form/FieldGroup';

export interface TextInputFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  className?: string;
  helpText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputField = ({
  label,
  name,
  value,
  placeholder,
  error,
  className,
  helpText,
  onChange
}: TextInputFieldProps) => {
  return (
    <FieldGroup label={label} name={name} error={error} className={className}>
      <Input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {helpText && (
        <p className="text-xs text-gray-500 mt-1">
          {helpText}
        </p>
      )}
    </FieldGroup>
  );
};

export default TextInputField;
