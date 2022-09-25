import React from 'react'
import docsModel from '../models/docs';

export default function SaveDoc(props) {
    async function saveDoc() {
        const doc = await docsModel.getDoc(props.currentDoc.name);
        if (doc) {
            const result = await docsModel.updateDoc(props.currentDoc);
            if (result.status === 204) {
                alert(`Document ${doc.name} was saved.`)
            }
        } else {
            const result = await docsModel.saveDoc(props.newDoc);
            if (result.status === 201) {
                alert(`Document was saved as ${props.newDoc.name}.`)
            }
        }
        props.setAlldocs();
    }

    return (
        <div className='save-doc'>
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" required={true} minLength={3} maxLength={20} name="name" onChange={props.handleNameChange} value={props.currentDoc.name || ''}/>
            <button onClick={saveDoc}>Save</button>
        </div>
    )
}
