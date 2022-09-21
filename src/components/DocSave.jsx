import React from 'react'
import docsModel from '../models/docs';

export default function SaveDoc(props) {
    async function saveDoc() {
        const doc = await docsModel.getDoc(props.newDoc.name);
        if (doc) {
            await docsModel.updateDoc(props.currentDoc);
        } else {
            await docsModel.saveDoc(props.newDoc);
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
