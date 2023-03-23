import React from 'react';
import { useEffect, useRef } from "react";
import "trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";
import "./editor.css";
import "../index.css";
import SelectAllDocs from "./DocSelect";
import SaveDoc from "./DocSave";
import NewDoc from "./DocNew";
import DocAddPermission from "./DocAddPermission";
import DocSendPermission from "./DocSendPermission";
import CodeEditor from "./CodeEditor";
import Trix from 'trix';
import html2pdf from "html2pdf.js";

// import { useNavigate } from "react-router-dom";

export default function Editor(props) {
                    
  const refs = useRef({});
  const {
    newDoc,
    setNewDoc,
    codeMode,
    setCodeMode,
    currentDoc,
    setCurrentDoc,
    setIoSelectedDoc,
    setAlldocs,
    setEditorContent,
    user,
    docs,
    token,
  } = props;
  // const navigate = useNavigate();

  // if (!token) {
  //   navigate("/login");
  // }

  useEffect(() => {
    if (refs.current?.view) {console.log('EditorView:', refs.current?.view);}
    if (refs.current?.state) {console.log('EditorState:', refs.current?.state);}
    if (refs.current?.editor) {console.log('HTMLDivElement:', refs.current?.editor);}
  }, [refs.current]);

  function handleNameChange(event) {
    let newObject = {};

    newObject["name"] = event.target.value;

    setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  function handleTrixEditorChange(text) {
    let newObject = {codeMode: false};

    newObject["content"] = text;

    setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  function handleCodeMirrorChange(value) {
    let newObject = {codeMode: true};

    newObject["content"] = value;

    setCurrentDoc((old) => ({ ...old, ...newObject }));
    setNewDoc({ ...newDoc, ...newObject });
  }

  function handleEditorShift() {
    setCodeMode(!codeMode);
    setNewDoc({});
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
        <SaveDoc
          newDoc={newDoc}
          currentDoc={currentDoc}
          setAlldocs={setAlldocs}
          handleNameChange={handleNameChange}
          user={user}
          token={token}
        />
        <DocAddPermission
          currentDoc={currentDoc}
          setCurrentDoc={setCurrentDoc}
        />
        <DocSendPermission
          currentDoc={currentDoc}
          setCurrentDoc={setCurrentDoc}
        />
      </div>
      <div className="toolbar">
        <NewDoc
          setCurrentDoc={setCurrentDoc}
          setEditorContent={setEditorContent}
        />
        <button onClick={handleDocToPdf}>
          Export as PDF
        </button>
        <button className="code-mode-btn" onClick={handleEditorShift}>
          {codeMode ? 'Text editor' : 'Code-mode'}
        </button>
        <button onClick={handleAddComment}>
          Comment
        </button>
        <SelectAllDocs
          docs={docs}
          codeMode={codeMode}
          setEditorContent={setEditorContent}
          setCurrentDoc={setCurrentDoc}
          setIoSelectedDoc={setIoSelectedDoc}
          token={token}
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
