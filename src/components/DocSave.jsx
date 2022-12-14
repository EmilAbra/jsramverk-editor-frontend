import React from 'react';
import docsModel from '../models/docsModel';

export default function SaveDoc(props) {
    async function saveDoc() {
        const doc = await docsModel.getDoc(props.currentDoc.name);

        if (doc) {
            const result = await docsModel.updateDoc(props.currentDoc);

            if (result.status === 204) {
                alert(`Document ${doc.name} was saved.`);
            }
        } else {
            const result = await docsModel.saveDoc(props.newDoc, props.user);

            if (result.status === 201) {
                alert(`Document was saved as ${props.newDoc.name}.`);
            }
        }
        props.setAlldocs();
    }

    return (
        <div className='save-doc'>
            <label htmlFor="name">Name: </label>
            <input
                id="name"
                type="text"
                required={true}
                minLength={3}
                maxLength={20}
                name="name"
                value={props.currentDoc.name || ''}
                onChange=
                    {props.handleNameChange}
            />
            <button onClick={saveDoc}>Save</button>
        </div>
    );
}
