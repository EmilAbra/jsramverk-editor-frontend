import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { EditorView } from '@codemirror/view';
import { useRef } from "react";
import codeModel from '../models/codeModel';
import './codeEditor.css';

export default function CodeEditor({ onChange, codeMirrorValue, refs }) {
  const textareaRef = useRef();

  async function executeCode() {
    const result = await codeModel.getCodeResult(codeMirrorValue);

    textareaRef.current.value = result;
  }

  return (
    <>
      <div className="editor-title">JS</div>
      <div>
        <CodeMirror
          ref={refs}
          onChange={onChange}
          extensions={[javascript(), EditorView.lineWrapping]}
          className="code-mirror-wrapper"
          height="500px"
          theme={okaidia}
          value={codeMirrorValue}
        />
      </div>
      <button className="exe-code-btn" onClick={executeCode}>
        Run code
      </button>
      <textarea ref={textareaRef} className="code-result-container"></textarea>
    </>
  );
}
