import React from 'react';
import { useEffect, useRef, useState } from "react";
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
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import html2pdf from "html2pdf.js";

export default function Editor(props) {
  const [trixSelectedRange, setTrixSelectedRange] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const trixEditorRef = useRef();
  const codeMirrorRef = useRef({});
  const {
    codeMode,
    handleCodeModeToggle,
    currentDoc,
    setCurrentDoc,
    setIoSelectedDoc,
    setAlldocs,
    setEditorContent,
    user,
    docs,
    token,
  } = props;

  const handleShowCommentFormToggle = () => {
    setShowCommentForm((current) => !current);
  };

  useEffect(() => {
    if (codeMirrorRef.current?.view) {
      console.log('EditorView:', codeMirrorRef.current?.view);
    }
    if (codeMirrorRef.current?.state) {
      console.log('EditorState:', codeMirrorRef.current?.state);
    }
    if (codeMirrorRef.current?.editor) {
      console.log('HTMLDivElement:', codeMirrorRef.current?.editor);
    }
  }, [codeMirrorRef.current]);

  function handleNameChange(event) {
    let newObject = {};

    newObject["name"] = event.target.value;

    setCurrentDoc((old) => ({ ...old, ...newObject }));
  }

  function handleTrixEditorChange(text) {
    let newObject = {codeMode: false};

    newObject["content"] = text;

    setCurrentDoc((old) => ({ ...old, ...newObject }));
  }

  function handleCodeMirrorChange(value) {
    let newObject = {codeMode: true};

    newObject["content"] = value;

    setCurrentDoc((old) => ({ ...old, ...newObject }));
  }

  function handleEditorShift() {
    setCurrentDoc({});
    handleCodeModeToggle();
  }

  function handleDocToPdf() {
    const margin = codeMode ? 0 : [72, 72, 72, 72];
    const element = codeMode ? codeMirrorRef.current.editor
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
    const trixEditor = trixEditorRef.current.editor;
    console.log(trixEditor);
    const range = trixEditor.getSelectedRange();
    if (range[0] === range[1]) {
      alert("You must select a line of text to comment on");
      return;
    }

    setTrixSelectedRange(range);
    trixEditor.activateAttribute("backgroundColor", "#FBCEB1");

    const docLength = trixEditor.getDocument().toString().length;

    trixEditor.setSelectedRange(docLength - 1);
    trixEditor.deactivateAttribute("backgroundColor");
    handleShowCommentFormToggle();
  }

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <SaveDoc
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
        {!codeMode &&
          <button onClick={handleAddComment}>
          Comment
          </button>
        }
        <SelectAllDocs
          docs={docs}
          codeMode={codeMode}
          setEditorContent={setEditorContent}
          setCurrentDoc={setCurrentDoc}
          setIoSelectedDoc={setIoSelectedDoc}
          token={token}
        />
      </div>
      <div className="editor-container">
        <div className={codeMode ? "code-editor-container" : "trix-editor-container"}>
          {codeMode ?
            <CodeEditor
              className="code-mirror"
              onChange={handleCodeMirrorChange}
              codeMirrorValue={currentDoc.content}
              codeMirrorRef={codeMirrorRef}
            />
            :
            <TrixEditor
              ref={trixEditorRef}
              className="trix-editor"
              onChange={handleTrixEditorChange}
            />
          }
        </div>
        <div className='comments-container'>
          {currentDoc.comments &&
            currentDoc.comments.map((comment, index) => {
              return (<Comment
                key={index}
                id={comment.id}
                date = {comment.date}
                content={comment.content}
                user={user}
                range={comment.range}
                trixEditor={trixEditorRef.current.editor}
                setCurrentDoc={setCurrentDoc}
              />);
            })
          }

          {showCommentForm &&
            <CommentForm
              trixSelectedRange={trixSelectedRange}
              handleShowCommentFormToggle={handleShowCommentFormToggle}
              user={user}
              trixEditor={trixEditorRef.current.editor}
              setCurrentDoc={setCurrentDoc}
              currentDoc={currentDoc}
            />
          }
        </div>
      </div>
    </div>
  );
}
