import React from 'react';
import { TrixEditor } from "react-trix";
import "trix/dist/trix.css";
import "./textEditor.css";

export default function TextEditor({ trixEditorRef, setCurrentDoc }) {
  function handleChange(text) {
    let newObject = {
      content: text,
      codeMode: false,
    };

    setCurrentDoc((old) => ({ ...old, ...newObject }));
  }

  return (
    <TrixEditor
      data-testid="trix-editor"
      ref={trixEditorRef}
      className="trix-editor"
      onChange={handleChange}
      autoFocus
      aria-label="text-editor"
    />
  );
}
