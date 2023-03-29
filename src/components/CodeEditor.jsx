import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { EditorView } from '@codemirror/view';
import codeModel from '../models/codeModel';
import './codeEditor.css';

export default function CodeEditor({ setCurrentDoc, codeMirrorRef }) {
  const [content, setContent] = useState("");
  const textareaRef = useRef();

  async function executeCode() {
    const result = await codeModel.getCodeResult(content);

    textareaRef.current.value = result;
  }

  function handleChange(value) {
    setContent(value);
    let newObject = {codeMode: true};

    newObject["content"] = value;

    setCurrentDoc((old) => ({ ...old, ...newObject }));
  }

  return (
    <>
      <div className="editor-title">JS</div>
      <div>
        <CodeMirror
          ref={codeMirrorRef}
          onChange={handleChange}
          extensions={[javascript(), EditorView.lineWrapping]}
          className="code-mirror"
          height="500px"
          value={content}
          theme={okaidia}
        />
      </div>
      <button className="exe-code-btn" onClick={executeCode}>
        Run code
      </button>
      <textarea ref={textareaRef} className="code-result-container"></textarea>
    </>
  );
}
