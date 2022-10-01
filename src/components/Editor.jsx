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

    return (
        <main>
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
                />
                <SelectAllDocs
                    docs={props.docs}
                    setContent={props.setContent}
                    setCurrentDoc={props.setCurrentDoc}
                    currentDoc={props.currentDoc}
                    setSelectedDoc={props.setSelectedDoc}
                />
            </div>
            <div className="editor-container">
                <TrixEditor onChange={handleContentChange}/>
            </div>
        </main>
    );
}
