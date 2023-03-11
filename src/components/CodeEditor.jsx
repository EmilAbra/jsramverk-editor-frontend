import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { useState, useRef } from "react";
import './codeEditor.css';

import codeModel from '../models/codeModel';

export default function CodeEditor({ onChange }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef();

  const handleOnChange = React.useCallback((value, viewUpdate) => {
    setValue(value);
    onChange();
  }, []);

  async function executeCode() {
    const result = await codeModel.getCodeResult(value);
    textareaRef.current.value = result;
  }

  return (
    <>
      <div className="editor-title">JS</div>
      <div>
        <CodeMirror
          onChange={handleOnChange}
          className="code-mirror-wrapper"
          extensions={[javascript({ jsx: true })]}
          height="200px"
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
