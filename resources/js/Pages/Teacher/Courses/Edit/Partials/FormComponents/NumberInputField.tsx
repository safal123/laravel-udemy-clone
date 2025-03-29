import React from 'react';
import { Input } from '@/Components/ui/input';
import FieldGroup from '@/Components/shared/form/FieldGroup';

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
  onChange
}) => {
  return (
    <FieldGroup label={label} name={name} error={error} className={className}>
      <Input
        name={name}
        type="number"
        step={step}
        min={min}
        max={max}
        value={value || ''}
        placeholder={placeholder}
        onChange={onChange}
      />
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </FieldGroup>
  );
};

export default NumberInputField;
