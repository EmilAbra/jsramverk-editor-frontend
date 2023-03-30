import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import CommentForm from './CommentForm';


test("should have a heading", () => {

  render(
      <CommentForm 
          user='test@test.com'
      />
  );

  const headingText = screen.getByRole('heading', { name: /test@test\.com/i });  expect(headingText).toBeInTheDocument();
})

test("should have a input element", () => {

  render(
      <CommentForm 
          user='test@test.com'
      />
  );
  const input = screen.getByRole('textbox', { name: /comment\-form\-input/i });
  expect(input).toBeInTheDocument();
})

test("should have an add button element", () => {

  render(
      <CommentForm 
          user='test@test.com'
      />
  );
  const addCommentBtn = screen.getByRole('button', { name: /add comment/i });

  expect(addCommentBtn).toBeInTheDocument();
})

test("should have a cancel button element", () => {

  render(
      <CommentForm 
          user='test@test.com'
      />
  );
  const cancelAddCommentBtn = screen.getByRole('button', { name: /cancel/i });

  expect(cancelAddCommentBtn).toBeInTheDocument();
})

test("should submit comment if typing and pressing submit button", async () => {
  const range = [0, 5];
  const handleShowCommentFormToggle = jest.fn();
  const setCurrentDoc = jest.fn();
  const currentDoc = {
    name: 'test',
    content: 'test content',
    user: 'test@test.com',
    comments: []
  };
  render(
      <CommentForm 
          user='test@test.com'
          trixSelectedRange={range}
          handleShowCommentFormToggle={handleShowCommentFormToggle}
          setCurrentDoc={setCurrentDoc}
          currentDoc={currentDoc}
      />
  );

  const addCommentBtn = screen.getByRole('button', { name: /add comment/i });
  const input = screen.getByRole('textbox', { name: /comment\-form\-input/i });
  const comment = 'hello world';
  await userEvent.type(input, comment);
  await userEvent.click(addCommentBtn);

  expect(handleShowCommentFormToggle).toHaveBeenCalledTimes(1);
  expect(setCurrentDoc).toHaveBeenCalledTimes(1);
})

test("should cancel submit comment if pressing cancel button", async () => {
  const range = [0, 5];
  const setTrixEditorSelection = jest.fn();
  const unsetTrixEditorTextBackground = jest.fn();
  const setTrixEditorSelectionToEnd = jest.fn();
  const handleShowCommentFormToggle = jest.fn();
  console.error = jest.fn();
  render(
      <CommentForm 
          user='test@test.com'
          trixSelectedRange={range}
          setTrixEditorSelection={setTrixEditorSelection}
          unsetTrixEditorTextBackground={unsetTrixEditorTextBackground}
          handleShowCommentFormToggle={handleShowCommentFormToggle}
          setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
      />
  );
  const cancelAddCommentBtn = screen.getByRole('button', { name: /cancel/i });
  await userEvent.click(cancelAddCommentBtn);
  
  expect(setTrixEditorSelection).toHaveBeenCalledTimes(1);
  expect(unsetTrixEditorTextBackground).toHaveBeenCalledTimes(1);
  expect(setTrixEditorSelectionToEnd).toHaveBeenCalledTimes(1);
  expect(handleShowCommentFormToggle).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledTimes(1);
})