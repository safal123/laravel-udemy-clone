import React, { useState, useEffect, KeyboardEvent } from 'react';
import { Input } from '@/Components/ui/input';
import FieldGroup from '@/Components/shared/form/FieldGroup';
import { Badge } from '@/Components/ui/badge';
import { TagIcon, XIcon, PlusIcon } from 'lucide-react';

interface TagInputFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  className?: string;
  helpText?: string;
  onChange: (value: string) => void;
}

const TagInputField: React.FC<TagInputFieldProps> = ({
  label,
  name,
  value,
  error,
  className,
  helpText = 'Enter tags to help students find your course. Press Enter or click Add after each tag.',
  onChange
}) => {
  const [tagInput, setTagInput] = useState('');
  const [tagArray, setTagArray] = useState<string[]>([]);

  // Parse tags string into array when component mounts or value changes
  useEffect(() => {
    if (value) {
      setTagArray(value.split(',').map(tag => tag.trim()).filter(tag => tag !== ''));
    } else {
      setTagArray([]);
    }
  }, [value]);

  // Function to add a new tag
  const addTag = (tag: string) => {
    if (tag.trim() !== '' && !tagArray.includes(tag.trim())) {
      const newTags = [...tagArray, tag.trim()];
      setTagArray(newTags);
      onChange(newTags.join(','));
      setTagInput('');
    }
  };

  // Function to remove a tag
  const removeTag = (tagToRemove: string) => {
    const newTags = tagArray.filter(tag => tag !== tagToRemove);
    setTagArray(newTags);
    onChange(newTags.join(','));
  };

  // Handle key press events in the tag input
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter or comma
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  return (
    <FieldGroup label={label} name={name} error={error} className={className}>
      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TagIcon className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              name="tagInput"
              value={tagInput}
              placeholder="Add a tag and press Enter"
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="pl-10"
            />
          </div>
          <button
            type="button"
            onClick={() => addTag(tagInput)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!tagInput.trim()}
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>

        {tagArray.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tagArray.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 hover:from-blue-100 hover:to-indigo-100"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none rounded-full hover:bg-blue-200 p-1"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500">{helpText}</p>
      </div>

      {/* Hidden input to store comma-separated tags */}
      <input
        type="hidden"
        name={name}
        value={value}
      />
    </FieldGroup>
  );
};

export default TagInputField;
