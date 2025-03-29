import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/Components/ui/select';
import FieldGroup from '@/Components/shared/form/FieldGroup';

interface SelectOption {
  value: string;
  label: string;
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
  onChange
}) => {
  return (
    <FieldGroup label={label} name={name} error={error} className={className}>
      <Select
        onValueChange={onChange}
        defaultValue={value}
        value={value}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </FieldGroup>
  );
};

export default SelectField;
