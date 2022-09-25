
import { BrowserRouter as Router, Route, Link, Routes}
    from "react-router-dom";

import Home from "./components/Welcome";
import Editor from "./components/Editor";
import Page2 from "./components/page2";
import Page3 from "./components/page3";

import docsModel from './models/docs';
import {useState, useEffect} from 'react';
import "./App.css";

function App() {
    const [docs, setDocs] = useState([]);
    const [currentDoc, setCurrentDoc] = useState({});

    async function fetchDocs() {
        const allDocs = await docsModel.getAllDocs();

        setDocs(allDocs);
    }

    useEffect(() => {
        (async () => {
            await fetchDocs();
            // console.log(currentDoc);
        })();
    }, [currentDoc]);

    return (
        <div className="App">
            <header className="header">
                <Router>
                    <div className="list">
                        <ul className="ul-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="editor">Editor</Link></li>
                            <li><Link to="page2">To be...</Link></li>
                            <li><Link to="page3">To be...</Link></li>
                        </ul>
                    </div>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="editor" element={<Editor docs={docs} setAlldocs={fetchDocs} setCurrentDoc={setCurrentDoc} currentDoc={currentDoc} />} />
                        <Route exact path="page2" element={<Page2 />} />
                        <Route exact path="page3" element={<Page3 />} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default App;
