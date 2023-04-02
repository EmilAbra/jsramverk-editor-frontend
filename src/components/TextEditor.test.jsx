import { render, waitFor } from "@testing-library/react";
import TextEditor from './TextEditor';

test("should render Trix-editor", () => {

  render(
    <TextEditor/>
  );

  waitFor(() => expect(getByTestId("trix-editor")).toBeInTheDocument());
})
