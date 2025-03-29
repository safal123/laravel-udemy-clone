import React from 'react';
import { Checkbox } from '@/Components/ui/checkbox';
import { Label } from '@/Components/ui/label';

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  checked,
  className,
  onChange
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checked) => onChange(!!checked)}
      />
      <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
        {label}
      </Label>
    </div>
  );
};

export default CheckboxField;
