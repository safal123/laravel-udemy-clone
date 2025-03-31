import React from 'react';
import { Label } from '@/Components/ui/label';
import { cn } from '@/lib/utils';

interface FieldGroupProps {
  label: string;
  name: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
  required?: boolean;
}

const FieldGroup: React.FC<FieldGroupProps> = ({
  label,
  name,
  error,
  className,
  children,
  required
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label
        htmlFor={name}
        className="text-sm font-medium text-slate-900 flex items-center gap-1"
      >
        {label}
        {required && (
          <span className="text-rose-500">*</span>
        )}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-rose-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FieldGroup;
