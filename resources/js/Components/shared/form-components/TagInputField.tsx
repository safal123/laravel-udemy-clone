import React, { useState, useEffect, KeyboardEvent } from 'react';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { TagIcon, XIcon, PlusIcon } from 'lucide-react';
import FieldGroup from './FieldGroup';
import { cn } from '@/lib/utils';

interface TagInputFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  className?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  maxTags?: number;
  onChange: (value: string) => void;
}

const TagInputField: React.FC<TagInputFieldProps> = ({
  label,
  name,
  value,
  error,
  className,
  helpText = 'Enter tags to help students find your course. Press Enter or click Add after each tag.',
  required,
  disabled,
  maxTags = 10,
  onChange
}) => {
  const [tagInput, setTagInput] = useState('');
  const [tagArray, setTagArray] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      setTagArray(value.split(',').map(tag => tag.trim()).filter(tag => tag !== ''));
    } else {
      setTagArray([]);
    }
  }, [value]);

  const addTag = (tag: string) => {
    if (tag.trim() !== '' && !tagArray.includes(tag.trim()) && tagArray.length < maxTags) {
      const newTags = [...tagArray, tag.trim()];
      setTagArray(newTags);
      onChange(newTags.join(','));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tagArray.filter(tag => tag !== tagToRemove);
    setTagArray(newTags);
    onChange(newTags.join(','));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && !disabled) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  return (
    <FieldGroup
      label={label}
      name={name}
      error={error}
      className={className}
      required={required}
    >
      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TagIcon className="h-4 w-4 text-slate-500" />
            </div>
            <Input
              name="tagInput"
              value={tagInput}
              disabled={disabled || tagArray.length >= maxTags}
              placeholder={tagArray.length >= maxTags ? `Maximum ${maxTags} tags reached` : "Add a tag and press Enter"}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className={cn(
                'pl-10 transition-colors focus:border-emerald-500 focus:ring-emerald-500/20',
                error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              )}
            />
          </div>
          <button
            type="button"
            onClick={() => addTag(tagInput)}
            disabled={!tagInput.trim() || disabled || tagArray.length >= maxTags}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>

        {tagArray.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tagArray.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="group flex items-center gap-1 px-3 py-1.5 text-sm bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-100 hover:from-emerald-100 hover:to-teal-100"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => !disabled && removeTag(tag)}
                  disabled={disabled}
                  className="ml-1 text-emerald-600 hover:text-emerald-800 focus:outline-none rounded-full hover:bg-emerald-200/50 p-1 transition-colors"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <p className="text-xs text-slate-500">{helpText}</p>
      </div>

      <input
        type="hidden"
        name={name}
        value={value}
      />
    </FieldGroup>
  );
};

export default TagInputField;
