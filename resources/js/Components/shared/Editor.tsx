import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: number;
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder = "Write something...",
  className,
  height = 260
}) => {
  const modules = {
    toolbar: [
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  };

  return (
    <div
      className={cn("w-full border rounded-md", className)}
      style={{ '--editor-height': `${height}px` } as React.CSSProperties}
    >
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        modules={modules}
        placeholder={placeholder}
        style={{ height }}
        className={cn(
          "rounded-md",
          "[&>.ql-toolbar]:border-0 [&>.ql-toolbar]:border-b",
          "[&>.ql-toolbar]:bg-gray-50 [&>.ql-toolbar]:px-3",
          "[&>.ql-container]:border-0",
          "[&>.ql-container]:h-[calc(var(--editor-height)-42px)]",
          "[&_.ql-editor]:h-[calc(var(--editor-height)-42px)]",
          "[&_.ql-editor]:overflow-y-auto",
          "[&_.ql-editor]:px-3 [&_.ql-editor]:py-2",
          "[&_.ql-editor.ql-blank::before]:text-gray-400",
          "[&_.ql-editor.ql-blank::before]:not-italic"
        )}
      />
    </div>
  );
};

export default Editor;
