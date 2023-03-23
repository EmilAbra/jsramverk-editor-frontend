import React from "react";
import docsModel from "../models/docsModel";

export default function SelectAllDocs(props) {
  const {
    docs,
    codeMode,
    setEditorContent,
    setCurrentDoc,
    setIoSelectedDoc,
    token
  } = props;

  async function fetchDoc(event) {
    const docName = event.target.value;
    event.target.selectedIndex = "0";

    if (docName !== "-99") {
      const doc = await docsModel.getDoc(docName, token);

      setCurrentDoc(doc);
      setIoSelectedDoc(doc);
      setEditorContent(doc.content, true);
    }
  }

  let docsToSelect;

  if (codeMode) {
    docsToSelect = docs.filter(doc => doc.codeMode === true)
      .map((doc, index) => {
        return <option value={doc.name} key={index}>
          {doc.name}
        </option>;
      });
  } else if (!codeMode) {
    docsToSelect = docs.filter(doc => doc.codeMode === false)
      .map((doc, index) => {
        return <option value={doc.name} key={index}>
          {doc.name}
        </option>;
      });
  }

  return (
    <div className="select-doc">
      <label htmlFor="selectOne">Select: </label>
      <select onChange={fetchDoc} id="selectOne">
        <option value="-99" key="0" defaultValue>
          Choose a document
        </option>
        {docsToSelect}
      </select>
    </div>
  );
}
