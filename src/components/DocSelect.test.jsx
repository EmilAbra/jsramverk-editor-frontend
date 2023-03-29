import { render, screen } from "@testing-library/react";
import SelectAllDocs from "./DocSelect";

const allDocs = [
  {
    name: "doc1",
    content: "Lorem ipsum",
    codeMode: false
  },
  {
    name: "doc2",
    content: "Lorem ipsum dolor sit amet",
    codeMode: false
  },
];

test("renders all doc names in select element", () => {
  render(<SelectAllDocs docs={allDocs} />);
  const docElements = screen.getAllByRole("option", { value: /doc/ });
  expect(docElements).toHaveLength(3);
});
