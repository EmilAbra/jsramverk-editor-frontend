import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import EditorShiftBtn from './EditorShiftBtn';

test("should have a button element in codeMode", () => {

  render(
    <EditorShiftBtn
      codeMode={true}
    />
  );

  const shiftBtn = screen.getByRole('button', { name: /Text editor/i });
  expect(shiftBtn).toBeInTheDocument();
})

test("should have a button element not in codeMode", () => {

  render(
    <EditorShiftBtn
      codeMode={false}
    />
  );

  const shiftBtn = screen.getByRole('button', { name: /Code-mode/i });
  expect(shiftBtn).toBeInTheDocument();
})

test("should execute event handler function when clicked", async () => {
  const setCurrentDoc = jest.fn();
  const handleCodeModeToggle = jest.fn();

  render(
    <EditorShiftBtn
      codeMode={false}
      setCurrentDoc={setCurrentDoc}
      handleCodeModeToggle={handleCodeModeToggle}
    />
  );

  const shiftBtn = screen.getByRole('button', { name: /Code-mode/i });
  await userEvent.click(shiftBtn);
  expect(setCurrentDoc).toHaveBeenCalledTimes(1);
  expect(handleCodeModeToggle).toHaveBeenCalledTimes(1);
})
