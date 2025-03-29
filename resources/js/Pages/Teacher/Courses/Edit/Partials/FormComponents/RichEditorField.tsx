import React from 'react';
import Editor from '@/Components/shared/Editor';
import FieldGroup from '@/Components/shared/form/FieldGroup';

interface RichEditorFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  className?: string;
  helpText?: string;
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
  onChange
}) => {
  return (
    <FieldGroup label={label} name={name} error={error} className={className}>
      <div className="w-full">
        <Editor
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </FieldGroup>
  );
};

export default RichEditorField;
