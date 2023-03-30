import React from 'react';

export default function CommentAddBtn(props) {
  const {
    trixEditorSelectedRange,
    setTrixSelectedRange,
    setTrixEditorTextBackground,
    setTrixEditorSelectionToEnd,
    unsetTrixEditorTextBackground,
    handleShowCommentFormToggle
  } = props;

  function handleAddComment() {
    const range = trixEditorSelectedRange();

    if (range[0] === range[1]) {
      alert("You must select a line of text to comment on");
      return;
    }

    setTrixSelectedRange(range);
    setTrixEditorTextBackground("#FBCEB1");
    setTrixEditorSelectionToEnd();
    unsetTrixEditorTextBackground();
    handleShowCommentFormToggle();
  }

  return (
    <button onClick={handleAddComment}>
      Comment
    </button>
  );
}
