import React from "react";
import docsModel from "../models/docsModel";

export default function SelectAllDocs(props) {
  async function fetchDoc(event) {
    const docName = event.target.value;

    if (docName !== "-99") {
      const doc = await docsModel.getDoc(docName);

      props.setCurrentDoc(doc);
      props.setSelectedDoc(doc);
      props.setContent(doc.content, true);
    }
  }
  
  let docsToSelect;
  if (props.codeMode) {
    docsToSelect = props.docs.filter(doc => doc.codeMode === true)
      .map((doc, index) => {
        <option value={doc.name} key={index}>
          {doc.name}
        </option>
      })
  } else {
    docsToSelect = props.docs.filter(doc => doc.codeMode === false)
      .map((doc, index) => {
        <option value={doc.name} key={index}>
          {doc.name}
        </option>
      })
  }

  return (
    <div className="select-doc">
      <label htmlFor="selectOne">Select: </label>
      <select onChange={fetchDoc} id="selectOne">
        <option value="-99" key="0">
          Choose a document
        </option>
        {docsToSelect}
        {/* {props.docs
          ? props.docs.map((doc, index) => (
              <option value={doc.name} key={index}>
                {doc.name}
              </option>
            ))
          : ""} */}
      </select>
    </div>
  );
}
