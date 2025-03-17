import { useEffect, useRef } from "react";
import "react-quill/dist/quill.bubble.css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

interface PreviewProps {
  value: string;
  className?: string;
}

const EditorPreview = ({ value, className = "" }: PreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply custom styles for the professional preview
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .editor-preview {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border-radius: 0.375rem;
        background-color: white;
      }
      .editor-preview .ql-editor {
        padding: 0;
        line-height: 1.2;
        font-size: 14.5px;
        color: #374151;
      }
      .editor-preview .ql-editor p {
        margin-bottom: 0.5rem;
        line-height: 1.2;
      }
      .editor-preview .ql-editor strong {
        font-weight: 600;
        color: #111827;
      }
      .editor-preview .ql-editor em {
        font-style: italic;
      }
      .editor-preview .ql-editor ul,
      .editor-preview .ql-editor ol {
        padding-left: 1.25rem;
        margin-bottom: 0.75rem;
      }
      .editor-preview .ql-editor li {
        margin-bottom: 0.25rem;
        position: relative;
      }
      .editor-preview .ql-editor ul > li::before {
        content: '';
        position: absolute;
        left: -0.75rem;
        top: 0.6em;
        height: 4px;
        width: 4px;
        border-radius: 50%;
        background-color: #6b7280;
      }
      .editor-preview .ql-editor pre {
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 0.75rem;
        margin-bottom: 0.75rem;
        overflow-x: auto;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.825rem;
      }
      .editor-preview .ql-editor h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        color: #111827;
      }
      .editor-preview .ql-editor h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-top: 0.75rem;
        margin-bottom: 0.5rem;
        color: #111827;
      }
      .editor-preview .ql-editor a {
        color: #2563eb;
        text-decoration: underline;
        text-underline-offset: 2px;
        transition: color 0.15s ease;
      }
      .editor-preview .ql-editor a:hover {
        color: #1d4ed8;
      }
      .editor-preview .ql-editor blockquote {
        border-left: 4px solid #e5e7eb;
        padding-left: 0.75rem;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0.75rem;
        color: #4b5563;
        font-style: italic;
      }

      /* Course-specific styles */
      .course-description-content .ql-editor p:last-child {
        margin-bottom: 0;
      }
    `;
    document.head.appendChild(styleElement);

    // Apply code highlighting
    if (previewRef.current) {
      previewRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }

    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [value]);

  if (!value) return null;

  return (
    <div ref={previewRef} className={`editor-preview ql-container ${className}`}>
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

export default EditorPreview;
