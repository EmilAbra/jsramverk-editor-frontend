import * as React from "react";
import ReactDOM from 'react-dom/client';
import 'trix';
import 'trix/dist/trix.css';
import './index.css';
import { TrixEditor } from "react-trix";
 
export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(html, text) {
    this.setState({value: text});
  }
  
  handleSubmit() {
    console.log(this.state.value);
  }
  
  render() {
    return (
      <div className="editor-container">
        <div className="toolbar">
          <button onClick={this.handleSubmit}>Save</button>
        </div>
        <div className="editor">
          <TrixEditor onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Editor />);

