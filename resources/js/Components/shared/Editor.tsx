import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";

import hljs from "highlight.js";

hljs.configure({
  languages: ["javascript", "python", "php", "java", "csharp", "cpp", "typescript"],
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    syntax: true, // Enable syntax highlighting
    toolbar: [
      // font size
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  if (!mounted) return null;

  return (
    <ReactQuill
      value={value}
      className="rounded-md border border-gray-900 p-0.5 h-full"
      onChange={onChange}
      theme="snow"
      modules={modules}
    />
  );
};

export default Editor;
