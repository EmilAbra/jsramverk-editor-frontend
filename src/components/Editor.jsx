import React, { useRef, useState } from 'react';
import "../index.css";
import "./editor.css";

import SelectAllDocs from "./DocSelect";
import SaveDoc from "./DocSave";
import NewDoc from "./DocNew";
import DocAddPermission from "./DocAddPermission";
import DocSendPermission from "./DocSendPermission";
import EditorShiftBtn from './EditorShiftBtn';
import DocToPdfBtn from "./DocToPdfBtn";
import CommentAddBtn from "./CommentAddBtn";
import CodeEditor from "./CodeEditor";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import TextEditor from './TextEditor';


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

  let trixEditor;

  if (trixEditorRef.current) {
    trixEditor = trixEditorRef.current.editor;
  }

  const handleShowCommentFormToggle = () => {
    setShowCommentForm((current) => !current);
  };

  // useEffect(() => {
  //   if (codeMirrorRef.current?.view) {
  //     console.log('EditorView:', codeMirrorRef.current?.view);
  //   }
  //   if (codeMirrorRef.current?.state) {
  //     console.log('EditorState:', codeMirrorRef.current?.state);
  //   }
  //   if (codeMirrorRef.current?.editor) {
  //     console.log('HTMLDivElement:', codeMirrorRef.current?.editor);
  //   }
  // }, [codeMirrorRef.current]);

  function setTrixEditorSelection(currentRange) {
    trixEditor.setSelectedRange(currentRange);
  }

  function setTrixEditorSelectionToEnd() {
    const docLength = trixEditor.getDocument().toString().length;

    setTrixEditorSelection(docLength - 1);
  }

  function setTrixEditorTextBackground(color) {
    trixEditor.activateAttribute("backgroundColor", color);
  }

  function unsetTrixEditorTextBackground() {
    trixEditor.deactivateAttribute("backgroundColor");
  }

  function trixEditorSelectedRange() {
    return trixEditor.getSelectedRange();
  }

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <SaveDoc
          setCurrentDoc={setCurrentDoc}
          currentDoc={currentDoc}
          setAlldocs={setAlldocs}
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
        <DocToPdfBtn
          codeMode={codeMode}
          codeMirrorRef={codeMirrorRef}
        />
        <EditorShiftBtn
          codeMode={codeMode}
          setCurrentDoc={setCurrentDoc}
          handleCodeModeToggle={handleCodeModeToggle}
        />
        {!codeMode &&
          <CommentAddBtn
            trixEditorSelectedRange={trixEditorSelectedRange}
            setTrixSelectedRange={setTrixSelectedRange}
            setTrixEditorTextBackground={setTrixEditorTextBackground}
            setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
            unsetTrixEditorTextBackground={unsetTrixEditorTextBackground}
            handleShowCommentFormToggle={handleShowCommentFormToggle}
          />
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
              setCurrentDoc={setCurrentDoc}
              codeMirrorRef={codeMirrorRef}
            />
            :
            <TextEditor
              trixEditorRef={trixEditorRef}
              setCurrentDoc={setCurrentDoc}
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
                setCurrentDoc={setCurrentDoc}
                setTrixEditorSelection={setTrixEditorSelection}
                setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
                setTrixEditorTextBackground={setTrixEditorTextBackground}
                unsetTrixEditorTextBackground={unsetTrixEditorTextBackground}
              />);
            })
          }

          {showCommentForm &&
            <CommentForm
              trixSelectedRange={trixSelectedRange}
              handleShowCommentFormToggle={handleShowCommentFormToggle}
              user={user}
              setCurrentDoc={setCurrentDoc}
              currentDoc={currentDoc}
              unsetTrixEditorTextBackground={unsetTrixEditorTextBackground}
              setTrixEditorSelection={setTrixEditorSelection}
              setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
            />
          }
        </div>
      </div>
    </div>
  );
}
