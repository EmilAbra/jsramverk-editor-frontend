import * as React from "react";
import 'trix';
import 'trix/dist/trix.css';
import './editor.css';
import "../index.css";
import { TrixEditor } from "react-trix";
import SelectAllDocs from "./DocsAll";
import SaveDoc from "./DocSave";
import NewDoc from "./DocNew";
import {useState} from 'react';

export default function Editor(props) {
    const [newDoc, setNewDoc] = useState({});

    function handleNameChange(event) {
        let newObject = {};
        newObject['name'] = event.target.value;

        props.setCurrentDoc((old) => ({...old, ...newObject}));
        setNewDoc({...newDoc, ...newObject});
    }

    function handleContentChange(html, text) {
        let newObject = {};
        newObject['content'] = text;

        props.setCurrentDoc((old) => ({...old, ...newObject}));
        setNewDoc({...newDoc, ...newObject});
    }

    function setEditorContent(content) {
      let element = document.querySelector("trix-editor");

      element.value = "";
      element.editor.setSelectedRange([0, 0]);
      element.editor.insertHTML(content);
    }

    return (
        <main>
            <div className="toolbar">
                <NewDoc
                    setCurrentDoc={props.setCurrentDoc}
                    setContent={setEditorContent}
                />
                <SaveDoc
                    newDoc={newDoc}
                    currentDoc={props.currentDoc}
                    setAlldocs={props.setAlldocs}
                    handleNameChange={handleNameChange}
                />
                <SelectAllDocs
                    docs={props.docs}
                    setContent={setEditorContent}
                    setCurrentDoc={props.setCurrentDoc}
                    currentDoc={props.currentDoc}
                />
            </div>
            <div className="editor-container">
                <TrixEditor onChange={handleContentChange}/>
            </div>
        </main>
    )
}
