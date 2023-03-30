import { render, screen } from "@testing-library/react";
import CodeEditor from "./CodeEditor";
// jest.mock("./map", () => {
//   return function DummyMap(props) {
//     return (
//       <div data-testid="map">
//         {props.center.lat}:{props.center.long}
//       </div>
//     );
//   };
// });

test("renders codemirror editor", () => {
  render(<CodeEditor />);
  const editor = screen.getByText(/Happy coding!/i);
  expect(editor).toBeInTheDocument();
});

