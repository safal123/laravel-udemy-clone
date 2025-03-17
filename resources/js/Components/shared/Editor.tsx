import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";

import hljs from "highlight.js";

// Configure highlight.js with supported languages
hljs.configure({
  languages: ["javascript", "python", "php", "java", "csharp", "cpp", "typescript"],
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder = "Write something professional...",
  className = ""
}) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);

    // Apply styles via stylesheet
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .editor-wrapper {
        display: block;
      }
      .editor-wrapper .ql-toolbar {
        display: block !important;
        visibility: visible !important;
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-bottom: none;
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
        padding: 8px;
        z-index: 10;
      }
      .editor-wrapper .ql-container {
        display: block !important;
        height: 260px !important;
        border: 1px solid #e5e7eb;
        border-bottom-left-radius: 0.375rem;
        border-bottom-right-radius: 0.375rem;
        font-family: system-ui, sans-serif;
      }
      .editor-wrapper .ql-editor {
        height: 100%;
        padding: 1rem;
        line-height: 1.5;
        font-size: 16px;
        color: #333;
      }
      .editor-wrapper .ql-editor p {
        margin-bottom: 0.5rem;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  // Simplified toolbar with only essential options
  const modules = {
    toolbar: [
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  };

  // Custom CSS class
  const editorClass = `editor-wrapper ${className}`;

  if (!mounted) {
    return <div style={{ height: "300px", border: '1px solid #e5e7eb', borderRadius: '0.375rem' }} />;
  }

  return (
    <div className={editorClass} style={{ marginBottom: '1rem' }}>
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Editor;
