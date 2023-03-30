import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Comment from './Comment';


test("should render a comment", () => {
  const comment = {
    date: '09:00 08/25/2023',
    content: 'test comment',
    user: 'test@test.com',
  };
  render(
      <Comment 
          date={comment.date}
          content={comment.content}
          user={comment.user}
      />
  );

  const commentUser = screen.getByRole('heading', { name: /test@test\.com/i });
  const commentDate = screen.getByText(/09:00 08\/25\/2023/i);
  const commentContent = screen.getByText(/test comment/i);
  expect(commentUser).toBeInTheDocument();
  expect(commentDate).toBeInTheDocument();
  expect(commentContent).toBeInTheDocument();
})

test("should render edit input when clicked on", async () => {
  const range = [0, 5];
  const setTrixEditorTextBackground = jest.fn();
  const setTrixEditorSelection = jest.fn();
  const handleCanClickOnCommentToggle = jest.fn();
  const handleShowEditCommentToggle  = jest.fn();
  const comment = {
    date: '09:00 08/25/2023',
    content: 'test comment',
    user: 'test@test.com',
  };
  render(
      <Comment 
          date={comment.date}
          content={comment.content}
          user={comment.user}
          range={range}
          handleCanClickOnCommentToggle={handleCanClickOnCommentToggle}
          handleShowEditCommentToggle={handleShowEditCommentToggle}
          setTrixEditorSelection={setTrixEditorSelection}
          setTrixEditorTextBackground={setTrixEditorTextBackground}
      />
  );
  const commentDiv = screen.getByTestId('comment');
  await userEvent.click(commentDiv);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
})

test("should remove edit input when save button is clicked", async () => {
  const range = [0, 5];
  const setTrixEditorTextBackground = jest.fn();
  const setTrixEditorSelection = jest.fn();
  const setCurrentDoc  = jest.fn();
  const handleEditCommentExit  = jest.fn();
  const setTrixEditorSelectionToEnd  = jest.fn();
  const comment = {
    date: '09:00 08/25/2023',
    content: 'test comment',
    user: 'test@test.com',
  };

  render(
      <Comment 
          date={comment.date}
          content={comment.content}
          user={comment.user}
          range={range}
          setTrixEditorSelection={setTrixEditorSelection}
          setTrixEditorTextBackground={setTrixEditorTextBackground}
          setCurrentDoc={setCurrentDoc}
          handleEditCommentExit={handleEditCommentExit}
          setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
      />
  );

  const commentDiv = screen.getByTestId('comment');
  await userEvent.click(commentDiv);
  const saveBtn = screen.getByText('Save');
  await userEvent.click(saveBtn);

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(setTrixEditorSelection).toHaveBeenCalledTimes(3);
  expect(setTrixEditorTextBackground).toHaveBeenCalledTimes(2);
  expect(setTrixEditorSelectionToEnd).toHaveBeenCalledTimes(1);
  expect(setCurrentDoc).toHaveBeenCalledTimes(1);
})

test("should remove edit input when cancel button is clicked", async () => {
  const range = [0, 5];
  const setTrixEditorTextBackground = jest.fn();
  const setTrixEditorSelection = jest.fn();
  const setTrixEditorSelectionToEnd  = jest.fn();
  const comment = {
    date: '09:00 08/25/2023',
    content: 'test comment',
    user: 'test@test.com',
  };

  render(
      <Comment 
          date={comment.date}
          content={comment.content}
          user={comment.user}
          range={range}
          setTrixEditorSelection={setTrixEditorSelection}
          setTrixEditorTextBackground={setTrixEditorTextBackground}
          setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
      />
  );

  const commentDiv = screen.getByTestId('comment');
  await userEvent.click(commentDiv);
  const cancelBtn = screen.getByText('Cancel');
  await userEvent.click(cancelBtn);

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(setTrixEditorSelection).toHaveBeenCalledTimes(3);
  expect(setTrixEditorTextBackground).toHaveBeenCalledTimes(2);
  expect(setTrixEditorSelectionToEnd).toHaveBeenCalledTimes(1);
})

test("should render delete component icon", async () => {
  const range = [0, 5];
  const setTrixEditorTextBackground = jest.fn();
  const setTrixEditorSelection = jest.fn();
  const setTrixEditorSelectionToEnd  = jest.fn();
  const unsetTrixEditorTextBackground  = jest.fn();
  const setCurrentDoc  = jest.fn();
  const comment = {
    date: '09:00 08/25/2023',
    content: 'test comment',
    user: 'test@test.com',
  };

  render(
      <Comment 
          date={comment.date}
          content={comment.content}
          user={comment.user}
          range={range}
          setTrixEditorSelection={setTrixEditorSelection}
          setTrixEditorTextBackground={setTrixEditorTextBackground}
          setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
          unsetTrixEditorTextBackground={unsetTrixEditorTextBackground}
          setCurrentDoc={setCurrentDoc}
      />
  );

  const commentDiv = screen.getByTestId('comment');
  await userEvent.click(commentDiv);
  const deleteIcon = screen.getByTestId('delete-comment-icon');
  await userEvent.click(deleteIcon);

  expect(deleteIcon).toBeInTheDocument();
  expect(setTrixEditorSelection).toHaveBeenCalledTimes(3);
  expect(unsetTrixEditorTextBackground).toHaveBeenCalledTimes(1);
  expect(setTrixEditorSelectionToEnd).toHaveBeenCalledTimes(1);
  expect(setCurrentDoc).toHaveBeenCalledTimes(1);
})
