/**
 * Model to get editor data from routes. getDoc and getAllDocs
 * includes fetch query for graphql API.
 */

const docs = {
  baseUrl: window.location.href.includes("localhost")
    ? "http://localhost:1337"
    : "https://jsramverk-editor-emab21.azurewebsites.net",
  getDoc: async function getDoc(name, token) {
    var query = `
      query getOneDoc($name: String!){
        doc (name: $name){
          _id
          name
          content
          allowed_users
          codeMode
          comments {
            id
            date
            user
            content
            range
          }
        } 
      }
    `;

    const response = await fetch(`${docs.baseUrl}/graphql`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        query,
        variables: {
          name: name
        }
      })
    });
    const oneDoc = await response.json();
    console.log(oneDoc);
    return oneDoc.data.doc;
  },
  getAllDocs: async function getAllDocs(token, user) {
    const email = user.email;
    var query = `
      query getAllDocs($allowed_user: String!){
        docs (allowed_user: $allowed_user){
          _id
          name
          content
          allowed_users
          codeMode
          comments {
            id
            date
            user
            content
            range
          }
        } 
      }
    `;

    const response = await fetch(`${docs.baseUrl}/graphql`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        query,
        variables: {
          allowed_user: email
        }
      })
    });
    const allDocs = await response.json();

    return allDocs.data.docs;
  },
  saveDoc: async function saveDoc(newDoc, user) {
    console.log("saves...");
    newDoc.allowed_users = [user];
    let response = await fetch(`${docs.baseUrl}/editor`, {
      body: JSON.stringify(newDoc),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    return response;
  },
  updateDoc: async function updateDoc(doc) {
    let response = await fetch(`${docs.baseUrl}/editor`, {
      body: JSON.stringify(doc),
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
    });

    return response;
  },
};

export default docs;
