import React, { useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { EditorView } from '@codemirror/view';
import codeModel from '../models/codeModel';
import './codeEditor.css';

export default function CodeEditor(props) {
  const {
    codeMirrorContent,
    setCodeMirrorContent,
    setCurrentDoc,
    codeMirrorRef
  } = props;
  const textareaRef = useRef();

  async function executeCode() {
    const result = await codeModel.getCodeResult(codeMirrorContent);

    textareaRef.current.value = result;
  }

  function handleChange(value) {
    setCodeMirrorContent(value);
    let newObject = {
      content: value,
      codeMode: true,
    };

    setCurrentDoc((old) => ({ ...old, ...newObject }));
  }

  return (
    <>
      <div className="editor-title">JS</div>
      <div>
        <CodeMirror
          placeholder={"Happy coding!"}
          ref={codeMirrorRef}
          onChange={handleChange}
          extensions={[javascript(), EditorView.lineWrapping]}
          className="code-mirror"
          height="500px"
          value={codeMirrorContent}
          theme={okaidia}
        />
      </div>
      <button className="exe-code-btn" onClick={executeCode}>
        Run code
      </button>
      <textarea data-testid="result" ref={textareaRef} className="code-result-container"></textarea>
    </>
  );
}
