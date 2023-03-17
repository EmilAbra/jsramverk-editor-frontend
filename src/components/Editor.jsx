import React from 'react';
import { useState, useEffect, useRef } from "react";
import "trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";
import "./editor.css";
import "../index.css";
import SelectAllDocs from "./DocsAll";
import SaveDoc from "./DocSave";
import NewDoc from "./DocNew";
import DocPermission from "./DocPermissions";
import DocSendPermission from "./DocSendPermission";
import CodeEditor from "./CodeEditor";
import Trix from 'trix';
import html2pdf from "html2pdf.js";



export default function Editor(props) {
  const [newDoc, setNewDoc] = useState({});
  const [codeMode, setCodeMode] = useState(false);
  const refs = useRef({});

  useEffect(() => {
    if (refs.current?.view) {console.log('EditorView:', refs.current?.view);}
    if (refs.current?.state) {console.log('EditorState:', refs.current?.state);}
    if (refs.current?.editor) {console.log('HTMLDivElement:', refs.current?.editor);}
  }, [refs.current]);

  function handleNameChange(event) {
    let newObject = {};

    newObject["name"] = event.target.value;

    props.setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  function handleTrixEditorChange(text) {
    let newObject = {codeMode: false};

    newObject["content"] = text;

    props.setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  function handleCodeMirrorChange(value) {
    let newObject = {codeMode: true};

    newObject["content"] = value;

    props.setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  function handleDocToPdf() {
    const margin = codeMode ? 0 : [72, 72, 72, 72];
    const element = codeMode ? refs.current.editor
      : document.querySelector("trix-editor").innerHTML;
    var opt = {
      margin: margin,
      filename: 'my_doc.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }

  function handleAddComment() {
    const element = document.querySelector("trix-editor");

    console.log(element.editor);
    // const selectedRange = element.editor.getSelectedRange();
    // element.editor.selectedRange.style.backgroundColor = "red";

    console.log(Trix.config);
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
        <button onClick={handleDocToPdf}>
          Export as PDF
        </button>
        <button className="code-mode-btn" onClick={() => setCodeMode(!codeMode)}>
          {codeMode ? 'Text editor' : 'Code-mode'}
        </button>
        <button onClick={handleAddComment}>
          Comment
        </button>
        <DocPermission
          currentDoc={props.currentDoc}
        />
        <DocSendPermission 
          currentDoc={props.currentDoc}
          user={props.user}
        />
        <SelectAllDocs
          docs={props.docs}
          codeMode={codeMode}
          setContent={props.setContent}
          setCurrentDoc={props.setCurrentDoc}
          currentDoc={props.currentDoc}
          setSelectedDoc={props.setSelectedDoc}
        />
      </div>
      <div className={codeMode ? "code-editor-container" : "editor-container"}>
        {codeMode ?
          <CodeEditor
            className="code-mirror"
            onChange={handleCodeMirrorChange}
            codeMirrorValue={newDoc.content}
            refs={refs}
          />
          :
          <TrixEditor
            className="trix-editor"
            onChange={handleTrixEditorChange}
          />
        }
      </div>
    </div>
  );
}
