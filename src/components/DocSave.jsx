import React from "react";
import docsModel from "../models/docsModel";

export default function SaveDoc(props) {
  const {
    currentDoc,
    setAlldocs,
    handleNameChange,
    user,
    token
  } = props;

  async function saveDoc() {
    const doc = await docsModel.getDoc(currentDoc.name, token);

    if (doc) {
      const result = await docsModel.updateDoc(currentDoc);

      if (result.status === 204) {
        alert(`Document ${doc.name} was saved.`);
      }
    } else {
      const result = await docsModel.saveDoc(currentDoc, user);

      if (result.status === 201) {
        alert(`Document was saved as ${currentDoc.name}.`);
      }
    }
    setAlldocs();
  }

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        type="text"
        required={true}
        minLength={3}
        maxLength={20}
        name="name"
        value={currentDoc.name || ""}
        onChange={handleNameChange}
      />
      <button onClick={saveDoc}>Save</button>
    </div>
  );
}
