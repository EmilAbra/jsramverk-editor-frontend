import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes}
  from "react-router-dom";
import { io } from "socket.io-client";

import Home from "./components/Welcome";
import Editor from "./components/Editor";
import Auth from "./components/LoginAuth";
import Page4 from "./components/page4";

import docsModel from './models/docsModel';
import { useState, useEffect } from 'react';
import "./App.css";


// const SERVER_URL = 'https://jsramverk-editor-emab21.azurewebsites.net';

let sendToSocket = false;

function changeSendToSocket(value) {
  sendToSocket = value;
}

function App() {
  const [docs, setDocs] = useState([]);
  const [currentDoc, setCurrentDoc] = useState({});
  const [socket, setSocket] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  async function fetchDocs() {
    const allDocs = await docsModel.getAllDocs(token, user);

    setDocs(allDocs);
  }
  console.log(docs);

  function setEditorContent(content, triggerChange) {
    let element = document.querySelector("trix-editor");

    changeSendToSocket(triggerChange);
    element.value = "";
    element.editor.setSelectedRange([0, 0]);
    changeSendToSocket(triggerChange);
    element.editor.insertHTML(content);
  }

  // useEffect(() => {
  //   if (token) {
  //     (async () => {
  //       await fetchDocs();
  //     })();
  //   }
  // }, [token]);

  useEffect(() => {
      (async () => {
        await fetchDocs();
      })();
  }, []);

  useEffect(() => {
    if (socket && sendToSocket) {
      socket.emit("docsData", currentDoc);
    }
    changeSendToSocket(true);
  }, [currentDoc]);

  useEffect(() => {
    if (socket) {
      socket.emit("create", selectedDoc._id);
    }
  }, [selectedDoc]);

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
        <header className="header">
            <div className="list">
              <ul className="ul-nav">
                <li><Link to="/">Home</Link></li>
                {token
                  ? <li><Link to="editor">Editor</Link></li>
                  : <li><Link to="login">Login</Link></li>
                }
                <li><Link to="page3">To be...</Link></li>
                <li><Link to="page4">To be...</Link></li>
              </ul>
            </div>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            
              <Route
                exact path="editor"
                element={<Editor
                  setSelectedDoc={setSelectedDoc}
                  docs={docs}
                  setAlldocs={fetchDocs}
                  setCurrentDoc={setCurrentDoc}
                  setContent={setEditorContent}
                  currentDoc={currentDoc}
                  user={user}
                />}
              />

              <Route exact path="login"
                element={<Auth
                  setToken={setToken}
                  user={user}
                  setUser={setUser}
                />}
              />
            <Route exact path="page4" element={<Page4 />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
