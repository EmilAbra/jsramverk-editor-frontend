import { render, screen } from "@testing-library/react";
import CodeEditor from "./CodeEditor";

test("renders codemirror editor", () => {
  const currentDoc = {
    content: ""
  }
  render(<CodeEditor currentDoc={currentDoc} />);
  screen.logTestingPlaygroundURL();
  const editor = screen.getByText(/Happy coding!/i);
  expect(editor).toBeInTheDocument();
});

test("renders button to run the code", () => {
  const currentDoc = {
    content: ""
  };

  render(<CodeEditor currentDoc={currentDoc} />);

  const runCOdeBtn = screen.getByRole('button', { name: /run code/i });
  expect(runCOdeBtn).toBeInTheDocument();
});

test("renders textarea for code result", () => {
  const currentDoc = {
    content: ""
  };

  render(<CodeEditor currentDoc={currentDoc} />);

  const resultTextArea = screen.getByTestId('result');
  expect(resultTextArea).toBeInTheDocument();
});
