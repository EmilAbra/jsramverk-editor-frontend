import React from "react";

const initialState = {};

export default function NewDoc(props) {
  function resetState() {
    props.setCurrentDoc(initialState);
    props.setEditorContent("", true);
  }

  return (
    <div>
      <button onClick={resetState}>New document</button>
    </div>
  );
}
