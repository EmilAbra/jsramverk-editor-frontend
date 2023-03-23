import React from 'react';
import { BrowserRouter as Router, Route, Routes}
  from "react-router-dom";
import { io } from "socket.io-client";

import Editor from "./components/Editor";
import LoginAuth from "./components/LoginAuth";

import docsModel from './models/docsModel';
import { useState, useEffect } from 'react';
import "./App.css";


// const SERVER_URL = 'https://jsramverk-editor-emab21.azurewebsites.net';

let sendToSocket = false;

function changeSendToSocket(value) {
  sendToSocket = value;
}

function App() {
  const [newDoc, setNewDoc] = useState({});
  const [docs, setDocs] = useState([]);
  const [currentDoc, setCurrentDoc] = useState({});
  const [socket, setSocket] = useState(null);
  const [ioSelectedDoc, setIoSelectedDoc] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [codeMode, setCodeMode] = useState(false);

  async function fetchDocs() {
    const allDocs = await docsModel.getAllDocs(token, user);

    setDocs(allDocs);
  }

  function setEditorContent(content, triggerChange) {
    if (codeMode) {
      let newObject = {codeMode: true};

      newObject["content"] = content;
      changeSendToSocket(triggerChange);
      setCurrentDoc((old) => ({ ...old, ...newObject }));
      setNewDoc({ ...newDoc, ...newObject });
      changeSendToSocket(triggerChange);
    } else {
      let element = document.querySelector("trix-editor");

      changeSendToSocket(triggerChange);
      element.value = "";
      element.editor.setSelectedRange([0, 0]);
      changeSendToSocket(triggerChange);
      element.editor.insertHTML(content);
    }   
  }

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchDocs();
      })();
    }
  }, [token]);

  // useEffect(() => {
  //     (async () => {
  //       await fetchDocs();
  //     })();
  // }, []);

  useEffect(() => {
    if (socket && sendToSocket) {
      socket.emit("docsData", currentDoc);
    }
    changeSendToSocket(true);
  }, [currentDoc]);

  useEffect(() => {
    if (socket) {
      socket.emit("create", ioSelectedDoc._id);
    }
  }, [ioSelectedDoc]);

  // useEffect(() => {
  //   setSocket(io(SERVER_URL));
  //   return () => {
  //     if (socket) {
  //         socket.disconnect();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (socket) {
      socket.on("docsData", function (data) {
          setEditorContent(data.content, false);
      });
    }
  }, [socket]);

  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            {token ?
              <Route
                exact path="/editor"
                element={<Editor
                  newDoc={newDoc}
                  setNewDoc={setNewDoc}
                  codeMode={codeMode}
                  setCodeMode={setCodeMode}
                  setIoSelectedDoc={setIoSelectedDoc}
                  docs={docs}
                  setAlldocs={fetchDocs}
                  setCurrentDoc={setCurrentDoc}
                  setEditorContent={setEditorContent}
                  currentDoc={currentDoc}
                  user={user}
                  token={token}
                />}
              />
            :
              <Route exact path="/login"
                element={<LoginAuth
                  token={token}
                  setToken={setToken}
                  user={user}
                  setUser={setUser}
                />}
              />
            }
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
