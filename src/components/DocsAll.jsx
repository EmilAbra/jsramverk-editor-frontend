import React from 'react'
import docsModel from '../models/docs';

export default function SelectAllDocs(props) {
    async function fetchDoc(event) {
        const docName = event.target.value;
        if (docName !== '-99') {
            const doc = await docsModel.getDoc(docName);
            props.setCurrentDoc(doc);
            props.setContent(doc.content);
        }
    };

    return (
        <div className="select-doc">
            <label htmlFor="selectOne">Select: </label>
            <select
                onChange={fetchDoc}
                id="selectOne"
            >
                <option value="-99" key="0">Choose a document</option>
                {props.docs.map((doc, index) => <option value={doc.name} key={index}>{doc.name}</option>)}
            </select>
        </div>
    )
}
