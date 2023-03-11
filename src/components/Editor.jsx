import * as React from "react";
import "trix";
import "trix/dist/trix.css";
import "./editor.css";
import "../index.css";
import { TrixEditor } from "react-trix";
import SelectAllDocs from "./DocsAll";
import SaveDoc from "./DocSave";
import NewDoc from "./DocNew";
import DocPermission from "./DocPermissions";
import CodeEditor from "./CodeEditor";
import { useState } from "react";



export default function Editor(props) {
  const [newDoc, setNewDoc] = useState({});
  const [codeMode, setCodeMode] = useState(false);

  function handleNameChange(event) {
    let newObject = {};

    newObject["name"] = event.target.value;

    props.setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  function handleTrixEditorChange(html, text) {
    let newObject = {codeMode: false};

    newObject["content"] = text;

    props.setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  function handleCodeMirrorChange(value, viewUpdate) {
    let newObject = {codeMode: true};

    newObject["content"] = value;

    props.setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <NewDoc
          setCurrentDoc={props.setCurrentDoc}
          setContent={props.setContent}
        />
        <SaveDoc
          newDoc={newDoc}
          currentDoc={props.currentDoc}
          setAlldocs={props.setAlldocs}
          handleNameChange={handleNameChange}
          user={props.user}
        />
        <button className="code-mode-btn" onClick={() => setCodeMode(!codeMode)}>
          {codeMode ? 'text editor' : 'code-mode'}
        </button>
        <DocPermission currentDoc={props.currentDoc} />
        <SelectAllDocs
          docs={props.docs}
          codeMode={codeMode}
          setContent={props.setContent}
          setCurrentDoc={props.setCurrentDoc}
          currentDoc={props.currentDoc}
          setSelectedDoc={props.setSelectedDoc}
        />
      </div>
      <div className="editor-container">
        {codeMode ?
          <CodeEditor onChange={handleCodeMirrorChange} />
          :
          <TrixEditor className="trix-editor" onChange={handleTrixEditorChange} />
        }
      </div>
    </div>
  );
}
