import { render, fireEvent, screen } from "@testing-library/react";
import CommentAddBtn from "./CommentAddBtn";


test("renders comment button", () => {
  render(<CommentAddBtn />);
  const button = screen.getByText(/Comment/i);
  expect(button).toBeInTheDocument();
});

test("clicking button renders alert if no text has been selected", () => {
  const trixEditorSelectedRange = jest.fn(() => { return [1, 1]});
  const setTrixSelectedRange = jest.fn();
  const setTrixEditorTextBackground = jest.fn();
  const setTrixEditorSelectionToEnd = jest.fn();
  const unsetTrixEditorTextBackground = jest.fn();
  const handleShowCommentFormToggle  = jest.fn();
  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  render(
    <CommentAddBtn 
      trixEditorSelectedRange={trixEditorSelectedRange}
      setTrixSelectedRange={setTrixSelectedRange}
      setTrixEditorTextBackground={setTrixEditorTextBackground}
      setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
      unsetTrixEditorTextBackground={unsetTrixEditorTextBackground}
      handleShowCommentFormToggle={handleShowCommentFormToggle}
    />
  );
  fireEvent.click(screen.getByText('Comment'))
  expect(alertMock).toHaveBeenCalledTimes(1)
});

test("clicking button renders comment form", () => {
  const trixEditorSelectedRange = jest.fn(() => { return [1, 5]});
  const setTrixSelectedRange = jest.fn();
  const setTrixEditorTextBackground = jest.fn();
  const setTrixEditorSelectionToEnd = jest.fn();
  const unsetTrixEditorTextBackground = jest.fn();
  const handleShowCommentFormToggle  = jest.fn();
  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  render(
    <CommentAddBtn 
      trixEditorSelectedRange={trixEditorSelectedRange}
      setTrixSelectedRange={setTrixSelectedRange}
      setTrixEditorTextBackground={setTrixEditorTextBackground}
      setTrixEditorSelectionToEnd={setTrixEditorSelectionToEnd}
      unsetTrixEditorTextBackground={unsetTrixEditorTextBackground}
      handleShowCommentFormToggle={handleShowCommentFormToggle}
    />
  );
  fireEvent.click(screen.getByText('Comment'))

  expect(alertMock).toHaveBeenCalledTimes(0);
  expect(setTrixSelectedRange).toHaveBeenCalledTimes(1);
  expect(setTrixEditorTextBackground).toHaveBeenCalledTimes(1);
  expect(setTrixEditorSelectionToEnd).toHaveBeenCalledTimes(1);
  expect(unsetTrixEditorTextBackground).toHaveBeenCalledTimes(1);
  expect(handleShowCommentFormToggle).toHaveBeenCalledTimes(1);
});