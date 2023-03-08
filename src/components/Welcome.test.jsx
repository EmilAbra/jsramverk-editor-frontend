import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";
// import '@testing-library/jest-dom/extend-expect';

it("renders welcome message", () => {
  render(<Welcome />);
  const divElement = screen.getByText(/Welcome/i);
  expect(divElement).toBeInTheDocument();
});
