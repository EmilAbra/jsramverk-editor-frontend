/**
 * Model to get editor data from routes.
 */

const docs = {
    baseUrl: window.location.href.includes("localhost") ?
        'http://localhost:1337' :
        'https://jsramverk-editor-emab21.azurewebsites.net',
    // baseUrl: 'https://jsramverk-editor-emab21.azurewebsites.net',
    getDoc: async function getDoc(name) {
        const response = await fetch(`${docs.baseUrl}/editor/${name}`);
        const result = await response.json();

        return result.data;
    },
    getAllDocs: async function getAllDocs() {
        const response = await fetch(`${docs.baseUrl}/editor`);
        const allDocs = await response.json();

        return allDocs.data;
    },
    saveDoc: async function saveDoc(newDoc) {
        let response = await fetch(`${docs.baseUrl}/editor`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
        return response;
    },
    updateDoc: async function updateDoc(doc) {
        let response = await fetch(`${docs.baseUrl}/editor`, {
            body: JSON.stringify(doc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
        return response;
    },
};

export default docs;
