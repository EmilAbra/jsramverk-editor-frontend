import { render, screen } from "@testing-library/react";
import NewDoc from "./DocNew";

// const faker = jest.fn();

test("renders new document button", () => {
  render(<NewDoc />);
  const button = screen.getByText(/new document/i);
  expect(button).toBeInTheDocument();
});
