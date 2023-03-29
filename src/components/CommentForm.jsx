import React, { useState } from 'react';
import OutsideAlerter from "../hooks/OutsideAlerter";
import { v4 as uuidv4 } from 'uuid';
import "./commentForm.css";

export default function CommentForm(props) {
  const [commentContent, setCommentContent] = useState("");
  const {
    user,
    trixSelectedRange,
    handleShowCommentFormToggle,
    currentDoc,
    setCurrentDoc,
    unsetTrixEditorTextBackground,
    setTrixEditorSelection,
    setTrixEditorSelectionToEnd
  } = props;

  function handleCancelComment() {
    setTrixEditorSelection(trixSelectedRange);
    unsetTrixEditorTextBackground();
    setTrixEditorSelectionToEnd();
    handleShowCommentFormToggle();
  }

  function handleChange(event) {
    setCommentContent(event.target.value);
  }

  function handleSubmitComment(event) {
    event.preventDefault();
    const today = new Date();
    const hours = String((today.getHours() < 10 ? '0' : '') + today.getHours());
    const minutes = String((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
    const time = hours + ":" + minutes;
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayDateTime = time + ' ' + mm + '/' + dd + '/' + yyyy;

    const comment = {
      id: uuidv4(),
      date: todayDateTime,
      user: user,
      content: commentContent,
      range: trixSelectedRange
    };

    if (currentDoc.comments) {
      setCurrentDoc((prev) => {
        return {...prev, comments: [...prev.comments, comment]};
      });
    } else {
      setCurrentDoc((prev) => {
        return {...prev, comments: [comment]};
      });
    }
    handleShowCommentFormToggle();
  }

  return (
    <OutsideAlerter
      handleShowDivToggle={handleShowCommentFormToggle}
      trixSelectedRange={trixSelectedRange}
      unsetTrixEditorTextBackground={unsetTrixEditorTextBackground}
      setTrixEditorSelection={setTrixEditorSelection}
      setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
    >
      <div className='comment-form-container'>
        <form onSubmit={handleSubmitComment}>
          <h4>{user}</h4>
          <input
            placeholder="Enter comment"
            type="text"
            name="comment"
            id="comment-input"
            value={commentContent}
            onChange={handleChange}
            required
            autoFocus
          />
          <div className="comment-form-button-container">
            <button className="comment-submit-button" type="submit">
              Add Comment
            </button>
            <button onClick={handleCancelComment}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </OutsideAlerter>
  );
}
