import React from 'react';
import { TrixEditor } from "react-trix";
// import "trix";
import "trix/dist/trix.css";
import "./textEditor.css";

export default function TextEditor({ trixEditorRef, setCurrentDoc }) {

  function handleChange(text) {
    let newObject = {codeMode: false};

    newObject["content"] = text;

    setCurrentDoc((old) => ({ ...old, ...newObject }));
  }

  return (
    <TrixEditor
      ref={trixEditorRef}
      className="trix-editor"
      onChange={handleChange}
    />
  )
}
