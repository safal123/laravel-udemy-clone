import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // Bubble theme for preview
import "highlight.js/styles/github.css"; // Syntax highlighting theme
import hljs from "highlight.js";

interface PreviewProps {
  value: string;
}

const EditorPreview = ({ value }: PreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [value]); // Re-run when value changes

  return (
    <div ref={previewRef} className="ql-container ql-bubble bg-none">
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

export default EditorPreview;
