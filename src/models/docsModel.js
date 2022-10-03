/**
 * Model to get editor data from routes.
 */

const docs = {
    // baseUrl: 'http://localhost:1337',
    baseUrl: window.location.href.includes("localhost") ?
        'http://localhost:1337' :
        'https://jsramverk-editor-emab21.azurewebsites.net',
    getDoc: async function getDoc(name) {
        const response = await fetch(`${docs.baseUrl}/editor/doc/${name}`);
        const result = await response.json();

        return result.data;
    },
    getAllDocs: async function getAllDocs(token, user) {
        const response = await fetch(`${docs.baseUrl}/editor/${user.email}`, {
            headers: {
                'x-access-token': token,
            }
        });
        const allDocs = await response.json();

        return allDocs.data;
    },
    saveDoc: async function saveDoc(newDoc, user) {
        newDoc.allowed_users = [user.email];
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
