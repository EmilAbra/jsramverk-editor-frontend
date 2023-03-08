import React from "react";

const initialState = {
  name: "",
  content: "",
};

export default function NewDoc(props) {
  function resetState() {
    props.setCurrentDoc(initialState);
    props.setContent("");
  }

  return (
    <div className="new-doc">
      <button onClick={resetState}>New document</button>
    </div>
  );
}
