import { render, screen } from "@testing-library/react";
import DocToPdf from './DocToPdfBtn';

test("should have a button element", () => {

  render(
    <DocToPdf/>
  );

  const exportBtn = screen.getByRole('button', { name: /Export as PDF/i });
  expect(exportBtn).toBeInTheDocument();
})
