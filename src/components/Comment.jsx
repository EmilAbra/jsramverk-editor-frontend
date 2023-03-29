import React, { useState } from 'react';
import "./comment.css";
import { GrClose } from "react-icons/gr";

export default function Comment(props) {
  const [canClickOnComment, setCanClickOnComment] = useState(true);
  const [showEditComment, setShowEditComment] = useState(false);
  const [newContent, setNewContent] = useState("");
  const {
    id,
    date,
    content,
    user,
    range,
    trixEditor,
    setCurrentDoc
  } = props;

  const handleCanClickOnCommentToggle = () => {
    setCanClickOnComment((current) => !current);
  };

  const handleShowEditCommentToggle = () => {
    setShowEditComment((current) => !current);
  };

  function setTrixEditorRange(currentRange) {
    trixEditor.setSelectedRange(currentRange);
  }

  function handleCommentClick() {
    handleCanClickOnCommentToggle();
    handleShowEditCommentToggle();

    setTrixEditorRange(range);
    trixEditor.activateAttribute("backgroundColor", "#FF7F50");
    setTrixEditorRange(range[0]);
  }

  function handleDeleteComment() {
    setTrixEditorRange(range);
    trixEditor.deactivateAttribute("backgroundColor");

    const docLength = trixEditor.getDocument().toString().length;

    setTrixEditorRange(docLength - 1);

    setCurrentDoc(prevState => ({
      comments: prevState.comments.filter(
        comment => comment.id !== id
        )
      })
    );
  }

  function handleContentChange(event) {
    setNewContent(event.target.value);
  }

  function handleEditComment() {
    setCurrentDoc(prevState => ({
      comments: prevState.comments.map(
        comment => comment.id === id ?
        {...comment, content: newContent}
        : comment
        )
      })
    );

    handleEditCommentExit();
  }

  function handleEditCommentExit() {
    setTrixEditorRange(range);
    trixEditor.activateAttribute("backgroundColor", "#FBCEB1");

    const docLength = trixEditor.getDocument().toString().length;

    setTrixEditorRange(docLength - 1);

    handleShowEditCommentToggle();
    handleCanClickOnCommentToggle();
  }

  return (
    <div className='comment-wrapper' onClick={canClickOnComment ? handleCommentClick : undefined}>
      <div className='comment-header'>
        <div className='comment-header-info'>
          <h4>{user}</h4>
          <span>{date}</span>
        </div>
        <div className='comment-delete-button'>
          <GrClose
            onClick={handleDeleteComment}
            className='delete-comment-icon'
          />
        </div>
      </div>
      <div className='comment-content-container'>
        <div className='comment-content'>
          {content}
        </div>
        {showEditComment &&
          <div className='comment-edit'>
            <div>
              <input
                type="text"
                name="edit-comment"
                id="comment-edit"
                value={newContent}
                onChange={handleContentChange}
                required
                autoFocus
              />
            </div>
            <div>
              <button className='comment-edit-button' onClick={handleEditComment}>
                Save
              </button>
              <button className='comment-edit-button' onClick={handleEditCommentExit}>
                Cancel
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}