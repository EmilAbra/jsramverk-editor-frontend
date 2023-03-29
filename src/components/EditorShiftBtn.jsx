import React from 'react';

export default function EditorShiftBtn({ codeMode, setCurrentDoc, handleCodeModeToggle }) {

  function handleEditorShift() {
    setCurrentDoc({});
    handleCodeModeToggle();
  }

  return (
    <button className="code-mode-btn" onClick={handleEditorShift}>
      {codeMode ? 'Text editor' : 'Code-mode'}
    </button>
  )
}
