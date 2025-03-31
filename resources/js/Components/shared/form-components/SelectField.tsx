import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/Components/ui/select';
import FieldGroup from './FieldGroup';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  className?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  placeholder = 'Select an option',
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
      <Select
        onValueChange={onChange}
        defaultValue={value}
        value={value}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'transition-colors focus:border-emerald-500 focus:ring-emerald-500/20',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
          )}
        >
          {icon && (
            <span className="mr-2 text-slate-500">
              {icon}
            </span>
          )}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="flex items-center gap-2"
            >
              {option.icon && (
                <span className="text-slate-500">
                  {option.icon}
                </span>
              )}
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helpText && (
        <p className="text-xs text-slate-500 mt-1">
          {helpText}
        </p>
      )}
    </FieldGroup>
  );
};

export default SelectField;
